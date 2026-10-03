import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../firebase/AuthContext";
import ScrollTop from "../components/ScrollTop";
import logo from "../../public/logo/IPCL_logo.png";
import logoName from "../../public/logo/IPCL_name_logo.png";

const inputClassName =
  "h-11 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/15";

const AuthForm = ({ mode }) => {
  const isRegister = mode === "register";
  const { singInUser, singUpUser, signInWithGoogle, resendVerificationEmail, resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

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

        const tokenExpired = result.profileError?.code === "auth/user-token-expired"
          || result.verificationError?.code === "auth/user-token-expired";
        const retryMessage = tokenExpired
          ? "Retry with the same email and password to refresh the Firebase session and finish setup."
          : "You can retry registration with this email to finish setup.";

        const statusMessage = result.profileSaved && result.verificationSent
          ? `We sent a verification link to ${values.email.trim()}. Verify it before signing in.`
          : !result.profileSaved && result.verificationSent
            ? `A verification link was sent to ${values.email.trim()}, but your shop profile could not be saved (${result.profileError?.code || result.profileError?.name || "unknown error"}). ${retryMessage}`
            : result.profileSaved
              ? `Your profile was saved, but the verification email could not be sent (${result.verificationError?.code || result.verificationError?.name || "unknown error"}). Sign in with your email and password to request another link.`
              : `Your account was created, but profile saving (${result.profileError?.code || result.profileError?.name || "unknown error"}) and verification email (${result.verificationError?.code || result.verificationError?.name || "unknown error"}) could not be completed. ${retryMessage}`;

        await Swal.fire({
          icon: result.profileSaved && result.verificationSent ? "success" : "warning",
          title: "Account created",
          text: statusMessage,
          confirmButtonColor: "#2E3192",
        });
        navigate("/login", { replace: true });
      } catch (registrationError) {
        const messages = {
          "auth/email-already-in-use": "An account already exists for this email. Sign in or reset its password.",
          "auth/invalid-email": "Enter a valid email address.",
          "auth/weak-password": "Choose a stronger password.",
          "auth/too-many-requests": "Too many attempts. Please try again later.",
        };

        await Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: messages[registrationError.code] || "We couldn't create the account. Please try again.",
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
            await resendVerificationEmail(values.email.trim(), values.password);
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
        "auth/email-already-in-use": "An account already exists for this email.",
        "auth/invalid-credential": "The email or password is incorrect.",
        "auth/invalid-email": "Enter a valid email address.",
        "auth/weak-password": "Choose a stronger password.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
      };

      await Swal.fire({
        icon: "error",
        title: "Login failed",
        text: messages[authError.code] || "We couldn't complete your request. Please try again.",
        confirmButtonColor: "#2E3192",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      await Swal.fire({
        icon: "success",
        title: isRegister ? "Account connected" : "Welcome back",
        text: isRegister ? "Your Google account is ready." : "You are now signed in with Google.",
        confirmButtonColor: "#2E3192",
      });
      navigate("/", { replace: true });
    } catch (authError) {
      if (authError.code === "auth/popup-closed-by-user") return;

      await Swal.fire({
        icon: "error",
        title: isRegister ? "Google registration failed" : "Google sign-in failed",
        text: authError.code === "auth/unauthorized-domain"
          ? "This domain is not authorized for Google sign-in in Firebase."
          : "We couldn't continue with Google. Please try again.",
        confirmButtonColor: "#2E3192",
      });
    }
  };

  const handleForgotPassword = async () => {
    const email = getValues("email")?.trim();
    const emailInput = document.getElementById("login-email");

    if (!email || !emailInput?.checkValidity()) {
      await Swal.fire({
        icon: "info",
        title: "Enter your email",
        text: "Add a valid email address above, then request a password reset.",
        confirmButtonColor: "#2E3192",
      });
      emailInput?.focus();
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
        text: resetError.code === "auth/user-not-found"
          ? "No account was found for that email address."
          : "Please check your email address and try again.",
        confirmButtonColor: "#2E3192",
      });
    }
  };

  const fieldError = (field) =>
    errors[field] && <p className="mt-1 text-xs text-red-600">{errors[field].message}</p>;

  const emailField = (
    <div>
      <label htmlFor={`${mode}-email`} className="mb-1.5 block text-sm font-medium text-slate-700">
        Email address
      </label>
      <input
        id={isRegister ? "register-email" : "login-email"}
        type="email"
        autoComplete="email"
        placeholder="name@example.com"
        aria-invalid={Boolean(errors.email)}
        {...register("email", {
          required: "Enter your email address.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address.",
          },
        })}
        className={inputClassName}
      />
      {fieldError("email")}
    </div>
  );

  const passwordField = (
    <div>
      <label htmlFor={`${mode}-password`} className="mb-1.5 block text-sm font-medium text-slate-700">
        Password
      </label>
      <input
        id={`${mode}-password`}
        type="password"
        autoComplete={isRegister ? "new-password" : "current-password"}
        placeholder={isRegister ? "At least 8 characters" : "Enter your password"}
        aria-invalid={Boolean(errors.password)}
        {...register("password", {
          required: "Enter your password.",
          ...(isRegister && {
            minLength: { value: 8, message: "Use at least 8 characters." },
            validate: (value) =>
              (/[A-Za-z]/.test(value) && /\d/.test(value)) ||
              "Include at least one letter and one number.",
          }),
        })}
        className={inputClassName}
      />
      {fieldError("password")}
    </div>
  );

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[linear-gradient(145deg,#ffffff_0%,#ffffff_64%,rgba(46,49,146,0.12)_100%)] px-4 pb-12 pt-36 sm:pb-14 sm:pt-40">
      <ScrollTop />
      <section
        className={`relative w-full ${isRegister ? "max-w-[820px]" : "max-w-[480px]"} rounded-xl border border-white/70 bg-white/95 px-6 py-7 shadow-[0_18px_54px_rgba(7,17,31,0.2)] backdrop-blur-sm sm:px-9 sm:py-9`}
      >
        <div className="mb-7 flex min-w-0 items-center gap-4">
          <img src={logo} alt="" className="h-16 w-16 shrink-0 object-contain sm:h-[76px] sm:w-[76px]" />
          <img
            src={logoName}
            alt="Innovation Plastic Cans Ltd."
            className="h-auto max-h-[68px] w-64 max-w-[calc(100%-5rem)] object-contain object-left sm:max-h-[76px]"
          />
        </div>

        <h1 className="text-2xl font-semibold text-slate-900">
          {isRegister ? "Create an account" : "Welcome back"}
        </h1>
        <p className="mt-1.5 text-sm leading-5 text-slate-500">
          {isRegister
            ? "Register with email or continue with Google."
            : "Sign in with email or continue with Google."}
        </p>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="mt-6 flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 shadow-[0_2px_6px_rgba(15,23,42,0.06)] transition hover:border-[#2E3192]/40 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AEEF]"
        >
          <span aria-hidden="true" className="text-base font-bold text-[#4285F4]">G</span>
          {isRegister ? "Continue with Google" : "Sign in with Google"}
        </button>

        <div className="mt-5 flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">or email</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <div className={isRegister ? "grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2" : "space-y-4"}>
            {isRegister && (
              <div>
                <label htmlFor="full-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input
                  id="full-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name)}
                  {...register("name", {
                    required: "Enter your full name.",
                    maxLength: { value: 80, message: "Name must be 80 characters or fewer." },
                    validate: (value) => Boolean(value.trim()) || "Enter your full name.",
                  })}
                  className={inputClassName}
                />
                {fieldError("name")}
              </div>
            )}

            {isRegister && (
              <div>
                <label htmlFor="shop-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Shop name
                </label>
                <input
                  id="shop-name"
                  type="text"
                  autoComplete="organization"
                  placeholder="Your business name"
                  aria-invalid={Boolean(errors.shopName)}
                  {...register("shopName", {
                    required: "Enter your shop name.",
                    maxLength: { value: 120, message: "Shop name must be 120 characters or fewer." },
                    validate: (value) => Boolean(value.trim()) || "Enter your shop name.",
                  })}
                  className={inputClassName}
                />
                {fieldError("shopName")}
              </div>
            )}

            {isRegister && emailField}

            {isRegister && (
              <div className="sm:col-span-2">
                <label htmlFor="shop-address" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Shop address
                </label>
                <textarea
                  id="shop-address"
                  rows={4}
                  autoComplete="street-address"
                  placeholder="Street, area, city, postal code"
                  aria-invalid={Boolean(errors.address)}
                  {...register("address", {
                    required: "Enter your shop address.",
                    minLength: { value: 5, message: "Enter a complete shop address." },
                    maxLength: { value: 300, message: "Address must be 300 characters or fewer." },
                    validate: (value) => Boolean(value.trim()) || "Enter your shop address.",
                  })}
                  className="min-h-28 w-full resize-y rounded-lg border-2 border-[#2E3192]/35 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#00A651] focus:ring-2 focus:ring-[#00A651]/15"
                />
                {fieldError("address")}
              </div>
            )}

            {!isRegister && emailField}
            {passwordField}

            {isRegister && (
              <div>
                <label htmlFor="confirm-password" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter your password again"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  {...register("confirmPassword", {
                    required: "Confirm your password.",
                    validate: (value, formValues) =>
                      value === formValues.password || "Your passwords do not match.",
                  })}
                  className={inputClassName}
                />
                {fieldError("confirmPassword")}
              </div>
            )}
          </div>

          {!isRegister && (
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2E3192] transition hover:text-[#00A651] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-[#00AEEF]"
              >
                <KeyRound size={14} aria-hidden="true" />
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#2E3192] px-4 text-sm font-semibold text-white transition hover:bg-[#25277F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A651] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? isRegister ? "Creating account..." : "Signing in..."
              : isRegister ? "Create account" : "Sign in"}
            {!isSubmitting && <ArrowRight size={16} aria-hidden="true" />}
          </button>
        </form>

        <p className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-600">
          {isRegister ? "Already have an account?" : "New to Innovation Plastic Cans?"}{" "}
          <Link
            to={isRegister ? "/login" : "/register"}
            className="font-semibold text-[#1767a6] hover:text-[#07111f] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-[#00AEEF]"
          >
            {isRegister ? "Sign in" : "Create account"}
          </Link>
        </p>
      </section>
    </main>
  );
};

export default AuthForm;
