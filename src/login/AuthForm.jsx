
"use client";

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  KeyRound,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../firebase/AuthContext";
import ScrollTop from "../components/ScrollTop";
import "./AuthForm.css";

const inputBaseClass =
  "h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 " +
  "outline-none transition-all duration-200 placeholder:text-slate-400 " +
  "hover:border-slate-400 focus:ring-4 disabled:cursor-not-allowed " +
  "disabled:bg-slate-100 disabled:text-slate-500";

const getInputClassName = (hasError, isValid) =>
  [
    inputBaseClass,
    hasError
      ? "border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-red-500/10"
      : isValid
        ? "border-[#00A651]/60 focus:border-[#00A651] focus:ring-[#00A651]/10"
        : "border-slate-200 focus:border-[#00AEEF] focus:ring-[#00AEEF]/10",
  ].join(" ");

const fieldLabelClassName =
  "mb-2 block text-sm font-semibold text-slate-700";

const fieldHintClassName =
  "mt-1.5 flex items-start gap-1.5 text-xs leading-5";

const FieldError = ({ error, id }) => {
  if (!error) return null;

  return (
    <p
      id={id}
      role="alert"
      className={`${fieldHintClassName} text-red-600`}
    >
      <CircleAlert
        size={14}
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      />
      <span>{error.message}</span>
    </p>
  );
};

const PasswordRequirements = ({ password = "" }) => {
  const requirements = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "At least one letter",
      valid: /[A-Za-z]/.test(password),
    },
    {
      label: "At least one number",
      valid: /\d/.test(password),
    },
  ];

  return (
    <div
      className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2"
      aria-label="Password requirements"
    >
      {requirements.map((requirement) => (
        <p
          key={requirement.label}
          className={`flex items-center gap-2 text-xs transition-colors ${
            requirement.valid ? "text-[#008A43]" : "text-slate-400"
          }`}
        >
          <CheckCircle2
            size={14}
            className="shrink-0"
            aria-hidden="true"
          />
          {requirement.label}
        </p>
      ))}
    </div>
  );
};

const AuthForm = ({ mode }) => {
  const isRegister = mode === "register";

  const {
    singInUser,
    singUpUser,
    signInWithGoogle,
    resendVerificationEmail,
    resetPassword,
  } = useContext(AuthContext);

  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    trigger,
    setFocus,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      shopName: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password", "");
  const confirmPasswordValue = watch("confirmPassword", "");

  // Revalidate confirmation when the original password changes.
  useEffect(() => {
    if (touchedFields.confirmPassword) {
      trigger("confirmPassword");
    }
  }, [passwordValue, touchedFields.confirmPassword, trigger]);

  const isFieldValid = (field) =>
    Boolean(touchedFields[field] && !errors[field]);

  const onSubmit = async (values) => {
    if (isRegister) {
      try {
        const result = await singUpUser({
          name: values.name.trim(),
          shopName: values.shopName.trim(),
          address: values.address.trim(),
          email: values.email.trim(),
          password: values.password,
        });

        const tokenExpired =
          result.profileError?.code === "auth/user-token-expired" ||
          result.verificationError?.code === "auth/user-token-expired";

        const retryMessage = tokenExpired
          ? "Retry with the same email and password to refresh the Firebase session and finish setup."
          : "You can retry registration with this email to finish setup.";

        const statusMessage =
          result.profileSaved && result.verificationSent
            ? `We sent a verification link to ${values.email.trim()}. Verify it before signing in.`
            : !result.profileSaved && result.verificationSent
              ? `A verification link was sent to ${values.email.trim()}, but your shop profile could not be saved (${
                  result.profileError?.code ||
                  result.profileError?.name ||
                  "unknown error"
                }). ${retryMessage}`
              : result.profileSaved
                ? `Your profile was saved, but the verification email could not be sent (${
                    result.verificationError?.code ||
                    result.verificationError?.name ||
                    "unknown error"
                  }). Sign in with your email and password to request another link.`
                : `Your account was created, but profile saving (${
                    result.profileError?.code ||
                    result.profileError?.name ||
                    "unknown error"
                  }) and verification email (${
                    result.verificationError?.code ||
                    result.verificationError?.name ||
                    "unknown error"
                  }) could not be completed. ${retryMessage}`;

        await Swal.fire({
          icon:
            result.profileSaved && result.verificationSent
              ? "success"
              : "warning",
          title: "Account created",
          text: statusMessage,
          confirmButtonColor: "#2E3192",
          customClass: {
            popup: "ipcl-swal-popup",
            confirmButton: "ipcl-swal-confirm",
          },
        });

        navigate("/login", { replace: true });
      } catch (registrationError) {
        const messages = {
          "auth/email-already-in-use":
            "An account already exists for this email. Sign in or reset its password.",
          "auth/email-already-verified":
            "This email already has a verified account. Sign in instead.",
          "auth/invalid-email": "Enter a valid email address.",
          "auth/weak-password": "Choose a stronger password.",
          "auth/too-many-requests":
            "Too many attempts. Please try again later.",
          "auth/network-request-failed":
            "Network connection failed. Check your internet and try again.",
        };

        await Swal.fire({
          icon: "error",
          title: "Registration failed",
          text:
            messages[registrationError.code] ||
            "We couldn't create the account. Please try again.",
          confirmButtonColor: "#2E3192",
        });
      }

      return;
    }

    try {
      await singInUser(values.email.trim(), values.password);

      await Swal.fire({
        icon: "success",
        title: "Welcome back",
        text: "You are now signed in.",
        confirmButtonColor: "#2E3192",
      });

      navigate("/", { replace: true });
    } catch (authError) {
      if (authError.code === "auth/email-not-verified") {
        const choice = await Swal.fire({
          icon: "warning",
          title: "Email not verified",
          text: "Verify your email address before signing in.",
          showCancelButton: true,
          confirmButtonText: "Resend verification email",
          cancelButtonText: "Not now",
          confirmButtonColor: "#2E3192",
        });

        if (choice.isConfirmed) {
          try {
            await resendVerificationEmail(
              values.email.trim(),
              values.password
            );

            await Swal.fire({
              icon: "success",
              title: "Verification email sent",
              text: `Check ${values.email.trim()} for the verification link.`,
              confirmButtonColor: "#2E3192",
            });
          } catch {
            await Swal.fire({
              icon: "error",
              title: "Could not resend email",
              text: "Check your email and password, then try again.",
              confirmButtonColor: "#2E3192",
            });
          }
        }

        return;
      }

      const messages = {
        "auth/email-already-in-use":
          "An account already exists for this email.",
        "auth/invalid-credential":
          "The email or password is incorrect.",
        "auth/invalid-email": "Enter a valid email address.",
        "auth/too-many-requests":
          "Too many attempts. Please try again later.",
        "auth/network-request-failed":
          "Network connection failed. Check your internet and try again.",
        "auth/user-disabled":
          "This account has been disabled. Please contact support.",
      };

      await Swal.fire({
        icon: "error",
        title: "Login failed",
        text:
          messages[authError.code] ||
          "We couldn't complete your request. Please try again.",
        confirmButtonColor: "#2E3192",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    if (isGoogleSubmitting || isSubmitting) return;

    setIsGoogleSubmitting(true);

    try {
      await signInWithGoogle();

      await Swal.fire({
        icon: "success",
        title: isRegister ? "Account connected" : "Welcome back",
        text: isRegister
          ? "Your Google account is ready."
          : "You are now signed in with Google.",
        confirmButtonColor: "#2E3192",
      });

      navigate("/", { replace: true });
    } catch (authError) {
      if (authError.code === "auth/popup-closed-by-user") return;

      const errorMessage =
        authError.code === "auth/unauthorized-domain"
          ? "This domain is not authorized for Google sign-in in Firebase."
          : authError.code === "auth/popup-blocked"
            ? "Your browser blocked the Google sign-in popup. Allow popups and try again."
            : authError.code === "auth/network-request-failed"
              ? "Network connection failed. Check your internet and try again."
              : "We couldn't continue with Google. Please try again.";

      await Swal.fire({
        icon: "error",
        title: isRegister
          ? "Google registration failed"
          : "Google sign-in failed",
        text: errorMessage,
        confirmButtonColor: "#2E3192",
      });
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = getValues("email")?.trim();

    if (!email) {
      await Swal.fire({
        icon: "info",
        title: "Enter your email",
        text: "Add your email address above to request a password reset.",
        confirmButtonColor: "#2E3192",
      });

      setFocus("email");
      return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validEmail) {
      await Swal.fire({
        icon: "info",
        title: "Check your email",
        text: "Enter a valid email address before requesting a reset.",
        confirmButtonColor: "#2E3192",
      });

      setFocus("email");
      return;
    }

    try {
      await resetPassword(email);

      await Swal.fire({
        icon: "success",
        title: "Reset email sent",
        text: `Check ${email} for a password reset link.`,
        confirmButtonColor: "#2E3192",
      });
    } catch (resetError) {
      await Swal.fire({
        icon: "error",
        title: "Could not send reset email",
        text:
          resetError.code === "auth/user-not-found"
            ? "No account was found for that email address."
            : resetError.code === "auth/too-many-requests"
              ? "Too many requests. Please try again later."
              : "Please check your email address and try again.",
        confirmButtonColor: "#2E3192",
      });
    }
  };

  const emailField = (
    <div className="min-w-0">
      <label
        htmlFor={`${mode}-email`}
        className={fieldLabelClassName}
      >
        Email address
      </label>

      <input
        id={`${mode}-email`}
        type="email"
        autoComplete="email"
        placeholder="name@example.com"
        aria-invalid={Boolean(errors.email)}
        aria-describedby={errors.email ? `${mode}-email-error` : undefined}
        {...register("email", {
          required: "Enter your email address.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address.",
          },
          setValueAs: (value) => value.trim(),
        })}
        autoCapitalize="none"
        spellCheck={false}
        className={getInputClassName(
          Boolean(errors.email),
          isFieldValid("email")
        )}
      />

      {errors.email && (
        <FieldError
          id={`${mode}-email-error`}
          error={errors.email}
        />
      )}
    </div>
  );

  const passwordField = (
    <div className="min-w-0">
      <label
        htmlFor={`${mode}-password`}
        className={fieldLabelClassName}
      >
        Password
      </label>

      <input
        id={`${mode}-password`}
        type="password"
        autoComplete={isRegister ? "new-password" : "current-password"}
        placeholder={
          isRegister ? "Create a strong password" : "Enter your password"
        }
        aria-invalid={Boolean(errors.password)}
        aria-describedby={
          errors.password
            ? `${mode}-password-error`
            : isRegister
              ? "password-requirements"
              : undefined
        }
        {...register("password", {
          required: "Enter your password.",
          ...(isRegister && {
            minLength: {
              value: 8,
              message: "Use at least 8 characters.",
            },
            validate: (value) =>
              (/[A-Za-z]/.test(value) && /\d/.test(value)) ||
              "Include at least one letter and one number.",
          }),
        })}
        className={getInputClassName(
          Boolean(errors.password),
          isFieldValid("password")
        )}
      />

      {errors.password && (
        <FieldError
          id={`${mode}-password-error`}
          error={errors.password}
        />
      )}

      {isRegister && (
        <div id="password-requirements">
          <PasswordRequirements password={passwordValue} />
        </div>
      )}
    </div>
  );

  return (
    <main className="auth-page relative  flex min-h-screen min-h-[100svh] items-center justify-center overflow-x-hidden px-4 pb-8 pt-44 sm:px-6 sm:pt-48">
      <ScrollTop />

      <div
        className={`auth-shell relative grid w-full max-w-[1180px] overflow-hidden rounded-[30px] ${
          isRegister
            ? "lg:grid-cols-[0.82fr_1.18fr]"
            : "lg:grid-cols-[0.9fr_1.1fr]"
        }`}
      >
        {/* BRAND PANEL */}
        <aside className="auth-brand-panel relative hidden min-h-[680px] flex-col justify-between overflow-hidden p-10 text-white lg:flex xl:p-12">
          <div className="auth-brand-orb auth-brand-orb-one" />
          <div className="auth-brand-orb auth-brand-orb-two" />

          <div className="relative z-10 flex items-center gap-4">
            <img
              src="/logo/IPCL_logo.png"
              alt="IPCL logo"
              className="h-[76px] w-[76px] shrink-0 object-contain drop-shadow-lg"
            />

            <img
              src="/logo/IPCL_name_logo.png"
              alt="Innovation Plastic Cans Ltd."
              className="h-auto max-h-[66px] w-[230px] object-contain object-left brightness-0 invert"
            />
          </div>

          <div className="relative z-10 max-w-[430px]">
            <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/75">
              <span className="h-2 w-2 rounded-full bg-[#00A651] shadow-[0_0_12px_rgba(0,166,81,0.8)]" />
              Innovation Plastic Cans Ltd.
            </p>

            <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight xl:text-5xl">
              {isRegister
                ? "Create your business account."
                : "Welcome back."}
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
              {isRegister
                ? "Connect with a reliable partner for quality plastic packaging."
                : "Access your account to manage your packaging needs."}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Quality", "Reliability", "Service"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 text-xs font-medium tracking-wide text-white/65">
            <span className="h-px w-10 bg-[#00A651]" />
            Trusted packaging solutions
          </div>
        </aside>

        {/* FORM PANEL */}
        <section className="auth-form-panel relative w-full px-5 py-7 sm:px-9 sm:py-9 lg:px-10 xl:px-12">
          <div className="auth-form-surface relative mx-auto w-full max-w-[620px] rounded-[24px] p-5 sm:p-8">
            {/* MOBILE BRAND */}
            <div className="auth-mobile-brand mb-7 flex min-w-0 items-center gap-3 lg:hidden">
              <img
                src="/logo/IPCL_logo.png"
                alt="IPCL logo"
                className="h-12 w-12 shrink-0 object-contain"
              />

              <img
                src="/logo/IPCL_name_logo.png"
                alt="Innovation Plastic Cans Ltd."
                className="h-auto max-h-12 w-56 max-w-[calc(100%-3.75rem)] object-contain object-left"
              />
            </div>

            {/* HEADING */}
            <div className="mb-7">
              <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#008A43]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00A651]" />
                {isRegister ? "Join our network" : "Account access"}
              </p>

              <h1 className="text-[28px] font-bold tracking-tight text-slate-900 sm:text-3xl">
                {isRegister ? "Create an account" : "Welcome back"}
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {isRegister
                  ? "Enter your business details to get started."
                  : "Sign in to continue to your account."}
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
            >
              <div
                className={
                  isRegister
                    ? "grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2"
                    : "space-y-5"
                }
              >
                {isRegister && (
                  <div className="min-w-0">
                    <label
                      htmlFor="full-name"
                      className={fieldLabelClassName}
                    >
                      Full name
                    </label>

                    <input
                      id="full-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      maxLength={80}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={
                        errors.name ? "name-error" : undefined
                      }
                      {...register("name", {
                        required: "Enter your full name.",
                        maxLength: {
                          value: 80,
                          message: "Name must be 80 characters or fewer.",
                        },
                        validate: (value) =>
                          Boolean(value.trim()) ||
                          "Enter your full name.",
                        setValueAs: (value) => value.trimStart(),
                      })}
                      className={getInputClassName(
                        Boolean(errors.name),
                        isFieldValid("name")
                      )}
                    />

                    <FieldError id="name-error" error={errors.name} />
                  </div>
                )}

                {isRegister && (
                  <div className="min-w-0">
                    <label
                      htmlFor="shop-name"
                      className={fieldLabelClassName}
                    >
                      Shop name
                    </label>

                    <input
                      id="shop-name"
                      type="text"
                      autoComplete="organization"
                      placeholder="Your business name"
                      maxLength={120}
                      aria-invalid={Boolean(errors.shopName)}
                      aria-describedby={
                        errors.shopName ? "shopName-error" : undefined
                      }
                      {...register("shopName", {
                        required: "Enter your shop name.",
                        maxLength: {
                          value: 120,
                          message:
                            "Shop name must be 120 characters or fewer.",
                        },
                        validate: (value) =>
                          Boolean(value.trim()) ||
                          "Enter your shop name.",
                        setValueAs: (value) => value.trimStart(),
                      })}
                      className={getInputClassName(
                        Boolean(errors.shopName),
                        isFieldValid("shopName")
                      )}
                    />

                    <FieldError
                      id="shopName-error"
                      error={errors.shopName}
                    />
                  </div>
                )}

                {isRegister && emailField}

                {isRegister && (
                  <div className="min-w-0 sm:col-span-2">
                    <label
                      htmlFor="shop-address"
                      className={fieldLabelClassName}
                    >
                      Shop address
                    </label>

                    <textarea
                      id="shop-address"
                      rows={3}
                      autoComplete="street-address"
                      placeholder="Street, area, city, postal code"
                      maxLength={300}
                      aria-invalid={Boolean(errors.address)}
                      aria-describedby={
                        errors.address ? "address-error" : undefined
                      }
                      {...register("address", {
                        required: "Enter your shop address.",
                        minLength: {
                          value: 5,
                          message: "Enter a complete shop address.",
                        },
                        maxLength: {
                          value: 300,
                          message:
                            "Address must be 300 characters or fewer.",
                        },
                        validate: (value) =>
                          Boolean(value.trim()) ||
                          "Enter your shop address.",
                        setValueAs: (value) => value.trimStart(),
                      })}
                      className={`${getInputClassName(
                        Boolean(errors.address),
                        isFieldValid("address")
                      )} min-h-[100px] resize-y py-3`}
                    />

                    <FieldError
                      id="address-error"
                      error={errors.address}
                    />
                  </div>
                )}

                {!isRegister && emailField}

                {passwordField}

                {isRegister && (
                  <div className="min-w-0">
                    <label
                      htmlFor="confirm-password"
                      className={fieldLabelClassName}
                    >
                      Confirm password
                    </label>

                    <input
                      id="confirm-password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Enter your password again"
                      aria-invalid={Boolean(errors.confirmPassword)}
                      aria-describedby={
                        errors.confirmPassword
                          ? "confirmPassword-error"
                          : undefined
                      }
                      {...register("confirmPassword", {
                        required: "Confirm your password.",
                        validate: (value) =>
                          value === getValues("password") ||
                          "Your passwords do not match.",
                      })}
                      className={getInputClassName(
                        Boolean(errors.confirmPassword),
                        Boolean(
                          touchedFields.confirmPassword &&
                            !errors.confirmPassword &&
                            confirmPasswordValue
                        )
                      )}
                    />

                    <FieldError
                      id="confirmPassword-error"
                      error={errors.confirmPassword}
                    />

                    {touchedFields.confirmPassword &&
                      !errors.confirmPassword &&
                      confirmPasswordValue && (
                        <p className={`${fieldHintClassName} text-[#008A43]`}>
                          <CheckCircle2
                            size={14}
                            className="mt-0.5 shrink-0"
                            aria-hidden="true"
                          />
                          Passwords match.
                        </p>
                      )}
                  </div>
                )}
              </div>

              {/* FORGOT PASSWORD */}
              {!isRegister && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isSubmitting || isGoogleSubmitting}
                    className="inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-[#2E3192] transition hover:text-[#008A43] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00AEEF] disabled:opacity-50"
                  >
                    <KeyRound size={14} aria-hidden="true" />
                    Forgot password?
                  </button>
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting || isGoogleSubmitting}
                className="auth-submit-button group flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#2E3192] via-[#292C87] to-[#1767A6] px-5 text-sm font-bold text-white shadow-lg shadow-[#2E3192]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#2E3192]/25 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#00A651] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                      aria-hidden="true"
                    />
                    {isRegister
                      ? "Creating your account..."
                      : "Signing you in..."}
                  </>
                ) : (
                  <>
                    {isRegister
                      ? "Create your account"
                      : "Sign in to your account"}

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="my-6 flex items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                or continue with
              </span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            {/* GOOGLE SIGN-IN */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleSubmitting || isSubmitting}
              className="auth-google-button flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AEEF] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGoogleSubmitting ? (
                <LoaderCircle
                  size={18}
                  className="animate-spin text-[#4285F4]"
                  aria-hidden="true"
                />
              ) : (
                <FaGoogle
                  aria-hidden="true"
                  className="text-base text-[#4285F4]"
                />
              )}

              {isGoogleSubmitting
                ? "Connecting to Google..."
                : "Continue with Google"}
            </button>

            {/* FOOTER */}
            <p className="mt-6 border-t border-slate-100 pt-5 text-center text-sm leading-6 text-slate-600">
              {isRegister
                ? "Already have an account?"
                : "New to Innovation Plastic Cans?"}{" "}
              <Link
                to={isRegister ? "/login" : "/register"}
                className="font-bold text-[#2E3192] underline-offset-4 transition hover:text-[#008A43] hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-[#00AEEF]"
              >
                {isRegister ? "Sign in" : "Create account"}
              </Link>
            </p>

            {/* SECURITY NOTE */}
            <div className="mt-5 flex items-center justify-center gap-2 text-center text-[11px] text-slate-400">
              <ShieldCheck
                size={14}
                className="shrink-0 text-[#00A651]"
                aria-hidden="true"
              />
              <span>Secure account access powered by Firebase.</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuthForm;
