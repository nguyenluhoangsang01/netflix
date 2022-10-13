import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import Helmet from "../components/Helmet";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const email = register("email", { required: true, pattern: /^\S+@\S+$/i });
  const password = register("password", {
    required: true,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
          <label className="inline-block w-full">
            <input
              className={`input ${errors.email && "inputError"}`}
              type="email"
              placeholder="Email*"
              {...email}
            />

            <span role="alert" className="alertError">
              {errors.email?.type === "required"
                ? "Email is required"
                : errors.email?.type === "pattern" && "Email is invalid"}
            </span>
          </label>

          <label className="inline-block w-full">
            <input
              className={`input ${errors.password && "inputError"}`}
              type="password"
              placeholder="Password*"
              {...password}
            />

            {errors.password?.type === "required" && (
              <span role="alert" className="alertError">
                Password is required
              </span>
            )}
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
        >
          Sign In
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
