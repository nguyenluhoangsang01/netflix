import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import Helmet from "../components/Helmet";
import Input from "../components/Input";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import debounce from "../hooks/useDebounce";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { loading, signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState<Boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormValues>({ mode: "onChange" });
  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    if (isLogin) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
      setIsLogin(true);
    }
  };

  const email = register("email", {
    required: true,
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  });
  const password = register("password", {
    required: true,
    minLength: 6,
  });

  if (loading) return <Loading />;

  return (
    <div className="relative flex w-screen h-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Helmet />

      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
        alt="Netflix"
        unoptimized
      />

      <Link href="/">
        <a className="absolute flex top-0 left-4 md:left-10">
          <Image
            src="https://rb.gy/ulxxee"
            alt="Logo"
            width={150}
            height={150}
            unoptimized
            className="cursor-pointer object-contain"
          />
        </a>
      </Link>

      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 select-none"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold cursor-text">
          {isLogin ? "Sign In" : "Sign Up"}
        </h1>

        <div className="space-y-4">
          <Input
            type="email"
            {...email}
            placeholder="Email"
            className={`input ${errors.email ? "inputError" : ""}`}
            onChange={debounce(email.onChange)}
          />
          <span role="alert" className="alertError">
            {errors.email?.type === "required"
              ? "Email is required"
              : errors.email?.type === "pattern" && "Email is invalid"}
          </span>

          <Input
            type="password"
            {...password}
            placeholder="Password"
            className={`input ${errors.password ? "inputError" : ""}`}
            onChange={debounce(password.onChange)}
          />
          <span role="alert" className="alertError">
            {errors.password?.type === "required"
              ? "Password is required"
              : errors.password?.type === "minLength" &&
                "Password must be at least 6 characters"}
          </span>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          disabled={!isDirty || !isValid}
        >
          <div className="flex items-center justify-center space-x-2">
            <span>{isLogin ? "Sign In" : "Sign Up"}</span>
            {isSubmitting && <FiLoader className="animate-spin text-2xl" />}
          </div>
        </button>

        {isLogin ? (
          <div>
            <span className="text-[#737373] cursor-text">New to Netflix?</span>{" "}
            <span
              className="text-white cursor-pointer hover:underline transition-all"
              onClick={() => setIsLogin(false)}
            >
              Sign up now.
            </span>
          </div>
        ) : (
          <div>
            <span className="text-[#737373] cursor-text">
              Already have an account?
            </span>{" "}
            <span
              className="text-white cursor-pointer hover:underline transition-all"
              onClick={() => setIsLogin(true)}
            >
              Sign in now.
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
