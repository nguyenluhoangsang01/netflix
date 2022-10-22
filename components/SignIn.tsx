import { SubmitHandler, useForm } from "react-hook-form";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { useRecoilState } from "recoil";
import Google from "../assets/icons/Google";
import { loginState } from "../atoms/loginAtom";
import useAuth from "../hooks/useAuth";
import debounce from "../hooks/useDebounce";
import { FormValues } from "../types";
import Input from "./Input";

const SignIn = () => {
  const { signIn } = useAuth();
  const [_, setLogin] = useRecoilState(loginState);
  const { signInWithGoogle, signInWithFacebook, signInWithGithub } = useAuth();

  const signInMethods = [
    {
      id: 1,
      icon: <Google />,
      name: "Google",
      func: signInWithGoogle,
    },
    {
      id: 2,
      icon: <FaGithub className="text-[#fff]" />,
      name: "Github",
      func: signInWithGithub,
    },
    {
      id: 3,
      icon: <FaFacebookF className="text-[#3578E5]" />,
      name: "Facebook",
      func: signInWithFacebook,
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormValues>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    await signIn(email, password);
  };

  const email = register("email", {
    required: true,
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  });
  const password = register("password", {
    required: true,
  });

  return (
    <form
      className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 select-none"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-4xl font-semibold cursor-text">Sign In</h1>

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
          {errors.password?.type === "required" && "Password is required"}
        </span>
      </div>

      <button
        type="submit"
        className="w-full rounded bg-[#e50914] py-2 font-semibold"
        disabled={!isDirty || !isValid}
      >
        <div className="flex items-center justify-center space-x-2">
          Sign In
          {isSubmitting && <FiLoader className="animate-spin text-2xl" />}
        </div>
      </button>

      <div className="flex flex-col gap-4 sm:flex-row">
        {signInMethods.map((signInMethod) => (
          <div
            key={signInMethod.id}
            className={`cursor-pointer flex items-center justify-center space-x-2 py-2 rounded-sm hover:opacity-80 transition w-full`}
            onClick={signInMethod.func}
          >
            <span className="w-5 h-5">{signInMethod.icon}</span>
            <span className="font-semibold text-white">
              {signInMethod.name}
            </span>
          </div>
        ))}
      </div>

      <p>
        <span className="text-[#737373] cursor-text">New to Netflix?</span>{" "}
        <span
          className="text-white cursor-pointer hover:underline transition-all"
          onClick={() => setLogin("signUp")}
        >
          Sign up now.
        </span>
      </p>

      <p className="!mt-3">
        <span className="text-[#737373] cursor-text">Forgot password?</span>{" "}
        <span
          className="text-white cursor-pointer hover:underline transition-all"
          onClick={() => setLogin("reset")}
        >
          Reset password now.
        </span>
      </p>
    </form>
  );
};

export default SignIn;
