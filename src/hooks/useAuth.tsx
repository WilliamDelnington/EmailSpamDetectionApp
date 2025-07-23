import React, { useEffect, useState, useContext, createContext } from "react";
import { 
    type User, 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPhoneNumber,
    confirmPasswordReset,
    sendPasswordResetEmail,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    updateEmail,
    updatePassword,
    updateProfile,
    deleteUser
} from "firebase/auth";
import { auth } from "../SDKs/firebase"; // adjust the path as needed

function useAuthHook() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const emailAndPasswordSignIn = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        setError("")
    } catch (err) {
        setError(
            typeof err === "object" && err && "message" in err
            ? String ((err as any).message)
            : String(err)
        );
    }
  }

  const emailAndPasswordSignUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError("")
    } catch (err) {
      setError(
        typeof err === "object" && err && "message" in err
        ? String ((err as any).message)
        : String(err)
      );
    }
  }

  const phoneNumberSignIn = async (phoneNumber: string) => {
    try {
        await signInWithPhoneNumber(auth, phoneNumber);
        setError("")
    } catch (err) {
        setError(
            typeof err === "object" && err && "message" in err
            ? String ((err as any).message)
            : String(err)
        );
    }
  }

  const popupSignIn = async () => {
    try {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider);
        setError("")
    } catch (err) {
        setError(
            typeof err === "object" && err && "message" in err
            ? String ((err as any).message)
            : String(err)
        );
    }
  }

  const signOutAuth = async () => {
    try {
      await signOut(auth);
      setError("")
    } catch (err) {
        setError(
            typeof err === "object" && err && "message" in err
            ? String ((err as any).message)
            : String(err)
        );
    }
  }

  const sendPasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
      setError("")
    } catch (err) {
      setError(
          typeof err === "object" && err && "message" in err
          ? String ((err as any).message)
          : String(err)
      );
  }
  }

  const resetPasswordConfirm = async (oobcode: string, newPassword: string) => {
    try {
      await confirmPasswordReset(auth, oobcode, newPassword)
      setError("")
    } catch (err) {
      setError(
        typeof err === "object" && err && "message" in err
        ? String ((err as any).message)
        : String(err)
    );
    }
  }

  const userDeletion = async () => {
    try {
      if (user == null) {
        setError("No user found")
        return
      }
      await deleteUser(user)
      setError("")
    } catch (err) {
      setError(
        typeof err === "object" && err && "message" in err
        ? String ((err as any).message)
        : String(err)
    );
    }
  }

  const emailUpdate = async (newEmail: string) => {
    try {
        if (user == null) {
            setError("No user found")
            return
        }
        await updateEmail(user, newEmail)
    } catch (err) {
        setError(
          typeof err === "object" && err && "message" in err
          ? String ((err as any).message)
          : String(err)
      );
  }}

  const passwordUpdate = async (newPassword: string) => {
    try {
        if (user == null) {
            setError("No user found")
            return
        }
        await updatePassword(user, newPassword)
    } catch (err) {
        setError(
          typeof err === "object" && err && "message" in err
          ? String ((err as any).message)
          : String(err)
      );
  }
  }

  const profileUpdate = async (newDisplayName: string = "", newPhotoURL: string = "") => {
    try {
        if ((newDisplayName == "" && newPhotoURL == "") || user == null) {
            return
        }
        await updateProfile(user, {displayName: newDisplayName, photoURL: newPhotoURL})
    } catch (err) {
        setError(
          typeof err === "object" && err && "message" in err
          ? String ((err as any).message)
          : String(err)
      );
  }}

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { 
    user, 
    loading,
    emailAndPasswordSignIn,
    emailAndPasswordSignUp,
    phoneNumberSignIn,
    signOutAuth,
    sendPasswordReset,
    resetPasswordConfirm,
    popupSignIn,
    userDeletion,
    emailUpdate,
    passwordUpdate,
    profileUpdate,
    error
    }
}

const AuthContext = createContext<ReturnType<typeof useAuthHook> | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = useAuth();
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
}