import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut
} from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { loginState } from "../atoms/loginAtom";
import Loading from "../components/Loading";
import { auth, facebook, github, google } from "../firebase";

interface IAuth {
  loading: Boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  reset: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuth>({
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signInWithGoogle: async () => {},
  signInWithFacebook: async () => {},
  signInWithGithub: async () => {},
  reset: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();

  const [_, setLogin] = useRecoilState(loginState);

  const [loading, setLoading] = useState<Boolean>(true);
  const [initialLoading, setInitialLoading] = useState<Boolean>(true);

  // Persist user session
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoading(false);
        } else {
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

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, google)
      .then((result) => {
        const user = result.user;

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

  const signInWithFacebook = async () => {
    await signInWithPopup(auth, facebook)
      .then((result) => {
        const user = result.user;

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

  const signInWithGithub = async () => {
    await signInWithPopup(auth, github)
      .then((result) => {
        const user = result.user;

        router.push("/");

        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      })
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      loading,
      signUp,
      signIn,
      signInWithGoogle,
      signInWithFacebook,
      signInWithGithub,
      reset,
      logout,
    }),
    [loading]
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
