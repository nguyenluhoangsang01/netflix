import { SubmitHandler, useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { loginState } from "../atoms/modalAtom";
import useAuth from "../hooks/useAuth";
import debounce from "../hooks/useDebounce";
import { FormValues } from "../types";
import Input from "./Input";

const Reset = () => {
  const { reset } = useAuth();
  const [_, setLogin] = useRecoilState(loginState);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormValues>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormValues> = async ({ email }) => {
    await reset(email);
  };

  const email = register("email", {
    required: true,
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  });

  return (
    <form
      className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 select-none"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-4xl font-semibold cursor-text">Reset</h1>

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
      </div>

      <button
        type="submit"
        className="w-full rounded bg-[#e50914] py-2 font-semibold"
        disabled={!isDirty || !isValid}
      >
        <div className="flex items-center justify-center space-x-2">
          Reset
          {isSubmitting && <FiLoader className="animate-spin text-2xl" />}
        </div>
      </button>

      <p>
        <span className="text-[#737373] cursor-text">
          Already have an account?
        </span>{" "}
        <span
          className="text-white cursor-pointer hover:underline transition-all"
          onClick={() => setLogin("signIn")}
        >
          Sign in now.
        </span>
      </p>
    </form>
  );
};

export default Reset;
