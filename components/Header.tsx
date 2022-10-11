import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineSearch, AiFillBell } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <AiOutlineSearch className="icon hidden sm:inline" title="Search" />
        <AiFillBell className="icon" title="Notifications" />
        <Link href="/account">
          <a title="Account">
            <RiAccountCircleFill className="icon" />
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
