import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	User
} from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { loginState } from "../atoms/modalAtom";
import Loading from "../components/Loading";
import { auth } from "../firebase";

interface IAuth {
  user: User | null;
  loading: Boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  reset: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuth>({
  user: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  reset: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();

  const [_, setLogin] = useRecoilState(loginState);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [initialLoading, setInitialLoading] = useState<Boolean>(true);

  // Persist user session
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);

          setLoading(false);
        } else {
          setUser(null);

          router.push("/login");

          setLoading(false);
        }

        setInitialLoading(false);
      }),
    [auth]
  );

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);

        setLogin("signIn");

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

        setLogin("signIn");

        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);

        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    await signOut(auth)
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

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      signUp,
      signIn,
      reset,
      logout,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {initialLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
