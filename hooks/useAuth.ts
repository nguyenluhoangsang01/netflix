import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../firebase";

const useAuth = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);

        router.push("/login");

        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);

        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);

        router.push("/");

        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);

        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  const reset = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");

        router.push("/login");

        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);

        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);

        router.push("/login");

        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);

        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  return { loading, user, signUp, signIn, reset, logout };
};

export default useAuth;
