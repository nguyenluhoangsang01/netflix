import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillBell, AiOutlineSearch } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { isPlanState } from "../atoms/planAtom";
import { LOCAL_STORAGE_PLAN_KEY } from "../constants";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const isPlan = useRecoilValue(isPlanState);
  const check = !isPlan && !localStorage.getItem(LOCAL_STORAGE_PLAN_KEY);

  const { pathname } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={isScrolled ? "bg-[#141414]" : ""}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link href="/">
          <a className="flex">
            <Image
              src="https://rb.gy/ulxxee"
              alt="Logo"
              width={80}
              height={80}
              unoptimized
            />
          </a>
        </Link>

        {!check && pathname !== "/account" && (
          <nav>
            <ul className="hidden space-x-4 md:flex">
              <li className="headerLink">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="headerLink">
                <Link href="/tv-shows">
                  <a>TV Shows</a>
                </Link>
              </li>
              <li className="headerLink">
                <Link href="/movies">
                  <a>Movies</a>
                </Link>
              </li>
              <li className="headerLink">
                <Link href="/new-and-popular">
                  <a>New & Popular</a>
                </Link>
              </li>
              <li className="headerLink">
                <Link href="/my-list">
                  <a>My List</a>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        {!check && pathname !== "/account" && (
          <>
            <AiOutlineSearch className="icon hidden sm:inline" title="Search" />
            <AiFillBell className="icon" title="Notifications" />
            <Link href="/account">
              <a title="Account">
                <RiAccountCircleFill className="icon" />
              </a>
            </Link>
          </>
        )}

        {check && (
          <Link href="/account">
            <a title="Account">
              <RiAccountCircleFill className="icon" />
            </a>
          </Link>
        )}

        {(check || pathname === "/account") && (
          <button
            className="text-white font-medium text-lg hover:underline transition"
            onClick={logout}
          >
            Sign out
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
