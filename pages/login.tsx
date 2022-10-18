import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { loginState } from "../atoms/modalAtom";
import Helmet from "../components/Helmet";
import Reset from "../components/Reset";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Login = () => {
  const login = useRecoilValue(loginState);

  return (
    <div className="relative flex w-screen h-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Helmet />
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
        alt="Netflix"
      />
      <Link href="/">
        <a className="absolute flex top-0 left-4 md:left-10">
          <Image
            src="https://rb.gy/ulxxee"
            alt="Logo"
            width={150}
            height={150}
            className="cursor-pointer object-contain"
          />
        </a>
      </Link>

      {login === "signIn" ? (
        <SignIn />
      ) : login === "signUp" ? (
        <SignUp />
      ) : (
        login === "reset" && <Reset />
      )}
    </div>
  );
};

export default Login;
