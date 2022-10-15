import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { TbLoaderQuarter } from "react-icons/tb";
import Helmet from "../components/Helmet";
import Input from "../components/Input";
import Password from "../components/Password";
import debounce from "../hooks/useDebounce";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormValues>({ mode: "onChange" });
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  const email = register("email", {
    required: true,
    pattern: /^\S+@\S+$/i,
  });
  const password = register("password", {
    required: true,
  });

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
        <h1 className="text-4xl font-semibold">Sign In</h1>

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

          <Password
            {...password}
            placeholder="Password"
            className={`input ${errors.password ? "inputError" : ""}`}
            onChange={debounce(password.onChange)}
          />
          <span role="alert" className="alertError">
            {errors.password?.type === "required" && "Password is required"}
          </span>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          disabled={!isDirty || !isValid}
        >
          <div className="flex items-center justify-center space-x-2">
            <span>Sign In</span>
            {isSubmitting && (
              <TbLoaderQuarter className="animate-spin text-2xl" />
            )}
          </div>
        </button>

        <div>
          <span className="text-[#737373]">New to Netflix?</span>{" "}
          <Link href="/sign-up">
            <a className="text-white hover:underline transition-all">
              Sign up now.
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
