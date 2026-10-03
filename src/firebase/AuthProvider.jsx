
import { AuthContext } from "./AuthContext";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "./firebase.init";
import { useEffect, useState } from "react";

/* -------------------------------------------------------
   Generic timeout helper
------------------------------------------------------- */
const waitForOperation = (operation, label, timeoutMs) =>
  new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      const error = new Error(
        `${label} did not finish within ${timeoutMs} ms.`
      );

      error.code = "operation-timeout";
      reject(error);
    }, timeoutMs);

    Promise.resolve(operation).then(
      (value) => {
        clearTimeout(timeoutId);
        resolve(value);
      },
      (error) => {
        clearTimeout(timeoutId);
        reject(error);
      }
    );
  });

/* -------------------------------------------------------
   Get a normal Firebase ID token

   IMPORTANT:
   We intentionally DO NOT use getIdToken(true)
   during registration.

   The newly created Firebase user already has a valid
   authentication session.
------------------------------------------------------- */
const getRegistrationToken = async (user) => {
  if (!user) {
    const error = new Error("Firebase user is missing.");
    error.code = "auth/user-missing";
    throw error;
  }

  return user.getIdToken();
};

/* -------------------------------------------------------
   Save shop profile to Firestore REST API
------------------------------------------------------- */
const saveShopProfile = async (user, profile) => {
  const projectId = import.meta.env.VITE_projectId;

  if (!projectId) {
    const error = new Error("VITE_projectId is not configured.");
    error.code = "firestore/missing-project-id";
    throw error;
  }

  const token = await getRegistrationToken(user);

  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 5500);

  try {
    const firestoreUrl =
      `https://firestore.googleapis.com/v1/projects/` +
      `${encodeURIComponent(projectId)}` +
      `/databases/(default)/documents/users/` +
      `${encodeURIComponent(user.uid)}`;

    const response = await fetch(firestoreUrl, {
      method: "PATCH",

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        fields: {
          uid: {
            stringValue: user.uid,
          },

          name: {
            stringValue: profile.name,
          },

          shopName: {
            stringValue: profile.shopName,
          },

          address: {
            stringValue: profile.address,
          },

          email: {
            stringValue: profile.email,
          },

          createdAt: {
            timestampValue: new Date().toISOString(),
          },
        },
      }),

      signal: controller.signal,
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);

      const error = new Error(
        result?.error?.message ||
          `Firestore profile write failed (${response.status}).`
      );

      error.code =
        result?.error?.status === "PERMISSION_DENIED"
          ? "permission-denied"
          : `firestore/${
              result?.error?.status?.toLowerCase() || response.status
            }`;

      throw error;
    }

    return true;
  } finally {
    clearTimeout(timeoutId);
  }
};

/* -------------------------------------------------------
   Auth Provider
------------------------------------------------------- */
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /* -----------------------------------------------------
     Firebase auth listener
  ----------------------------------------------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      /*
        Only expose verified users to the rest of the app.
      */
      setUser(
        currentUser?.emailVerified
          ? currentUser
          : null
      );
    });

    return unsubscribe;
  }, []);

  /* -----------------------------------------------------
     EMAIL LOGIN
  ----------------------------------------------------- */
  const singInUser = async (email, password) => {
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    await credential.user.reload();

    if (!credential.user.emailVerified) {
      const error = new Error(
        "Verify your email before signing in."
      );

      error.code = "auth/email-not-verified";

      /*
        Keep the user signed in temporarily so that
        resendVerificationEmail() can use the same user.
      */
      throw error;
    }

    return credential;
  };

  /* -----------------------------------------------------
     GOOGLE LOGIN
  ----------------------------------------------------- */
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: "select_account",
    });

    return signInWithPopup(auth, provider);
  };

  /* -----------------------------------------------------
     REGISTRATION
  ----------------------------------------------------- */
const singUpUser = async ({
    name,
    shopName,
    address,
    email,
    password,
}) => {
    let user = auth.currentUser?.email === email && !auth.currentUser.emailVerified
        ? auth.currentUser
        : null;

    // Create account
    if (!user) {
        try {
            const credential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            user = credential.user;
        } catch (error) {
            // Account already exists
            if (error.code !== "auth/email-already-in-use") {
                throw error;
            }

            try {
                const credential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                user = credential.user;
                await user.reload();
            } catch (loginError) {
                throw error;
            }

            // Already verified
            if (user.emailVerified) {
                const verifiedError = new Error(
                    "This email is already registered and verified."
                );

                verifiedError.code = "auth/email-already-verified";

                throw verifiedError;
            }
        }
    }

    // Make sure Firebase has the latest user state
    await user.reload();

    user = auth.currentUser;

    let profileSaved = false;
    let profileError = null;

    let verificationSent = false;
    let verificationError = null;

    /*
     * ---------------------------------------------------------
     * 1. Update Firebase Auth profile
     * ---------------------------------------------------------
     */
    try {
        await updateProfile(user, {
            displayName: name,
        });
    } catch (error) {
        console.error("Firebase profile update failed:", error);
    }

    /*
     * ---------------------------------------------------------
     * 2. Save shop profile to Firestore
     * ---------------------------------------------------------
     */
    try {
        await saveShopProfile(user, {
            name,
            shopName,
            address,
            email,
        });

        profileSaved = true;
    } catch (error) {
        profileError = error;

        console.error(
            "Registration profile save failed:",
            error
        );
    }

    /*
     * ---------------------------------------------------------
     * 3. Send verification email
     * ---------------------------------------------------------
     */
    try {
        /*
         * Do NOT use getIdToken(true)
         * Do NOT use reauthenticateWithCredential()
         */

        await sendEmailVerification(user);

        verificationSent = true;
    } catch (error) {
        verificationError = error;

        console.error(
            "Registration verification email failed:",
            error
        );
    }

    return {
        user,
        profileSaved,
        profileError,
        verificationSent,
        verificationError,
    };
};

  /* -----------------------------------------------------
     RESEND VERIFICATION EMAIL
  ----------------------------------------------------- */
const resendVerificationEmail = async (email, password) => {
    let user = auth.currentUser?.email === email
        ? auth.currentUser
        : null;

    if (!user) {
        const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        user = credential.user;
    }

    await user.reload();

    if (user.emailVerified) {
        const error = new Error(
            "This email is already verified."
        );

        error.code = "auth/email-already-verified";

        throw error;
    }

    await sendEmailVerification(user);
};

  /* -----------------------------------------------------
     PASSWORD RESET
  ----------------------------------------------------- */
  const resetPassword = (email) =>
    sendPasswordResetEmail(auth, email);

  /* -----------------------------------------------------
     LOGOUT
  ----------------------------------------------------- */
  const singOutUser = () => signOut(auth);

  /* -----------------------------------------------------
     CONTEXT VALUE
  ----------------------------------------------------- */
  const userInfo = {
    user,

    singInUser,
    signInWithGoogle,

    singUpUser,
    resendVerificationEmail,

    resetPassword,
    singOutUser,
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;