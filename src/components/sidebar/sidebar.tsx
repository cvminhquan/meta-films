"use client";

import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Search,
  Bookmark,
  History,
  User,
  LogIn,
  Rocket,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const Sidebar: FC<SidebarProps> = ({ className = "" }) => {
  const pathname = usePathname();

  const isActiveLink = (path: string) => {
    return pathname === path;
  };

  return (
    <div
      className={`shrink-0 md:max-w-[260px] px-8 top-0 pt-10 md:sticky md:translate-x-0 md:bg-[hsla(0,0%,100%,0.05)] md:shadow-none fixed h-screen shadow-md transition duration-300 bg-dark-lighten z-50 ${className}`}
    >
      <Link href="/" className="flex items-center gap-3 group">
        {/* <Rocket /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="transition-transform duration-[0.5s] ease-[cubic-bezier(0.76,0,0.24,1)] mr-[3px] group-hover:translate-x-[5px] group-hover:rotate-45"
        >
          <path
            d="M5.83087 18.1693L3.00261 20.9979M7.95219 20.2906L7.24508 20.9977M3.70955 16.0479L3.00244 16.755M11.3588 6.14844L6.98115 6.14844C6.65417 6.14844 6.43834 6.20823 6.15796 6.37645L4.34408 7.46478C3.91094 7.72466 3.69438 7.8546 3.63232 8.01389C3.5783 8.15256 3.58885 8.30808 3.66112 8.43818C3.74412 8.58763 3.97626 8.68711 4.44054 8.88609L7.91447 10.3749M11.3588 6.14844C10.7176 6.79012 10.1116 7.56433 9.18973 8.74215L8.32567 9.84608C8.16879 10.0465 8.0327 10.2204 7.91447 10.3749M11.3588 6.14844C11.6532 5.85384 11.955 5.58717 12.2982 5.32221C13.0456 4.7452 14.6119 3.90719 15.5067 3.6056C16.8125 3.16545 17.3933 3.12131 18.5548 3.03303C19.5534 2.95712 20.3717 3.01164 20.6801 3.32001C20.9885 3.62839 21.043 4.44669 20.9671 5.44536C20.8788 6.60685 20.8347 7.18759 20.3945 8.49341C20.0929 9.38818 19.2549 10.9545 18.6779 11.7019C18.413 12.0451 18.1463 12.3469 17.8517 12.6413M7.91447 10.3749C7.58676 10.8033 7.39618 11.0832 7.27999 11.3693C6.93821 12.2106 6.99595 13.1615 7.43702 13.9554C7.64105 14.3226 7.98047 14.662 8.6593 15.3408C9.33813 16.0197 9.67754 16.3591 10.0448 16.5631C10.8386 17.0042 11.7895 17.0619 12.6309 16.7201C12.9169 16.6039 13.1968 16.4134 13.6252 16.0857M13.6252 16.0857L15.114 19.5596C15.313 20.0239 15.4125 20.256 15.5619 20.339C15.692 20.4113 15.8476 20.4218 15.9862 20.3678C16.1455 20.3057 16.2755 20.0892 16.5353 19.656L17.6237 17.8422C17.7919 17.5618 17.8517 17.346 17.8517 17.019L17.8517 12.6413M13.6252 16.0857C13.7798 15.9674 13.9536 15.8313 14.154 15.6745L15.258 14.8104C16.4358 13.8885 17.21 13.2825 17.8517 12.6413"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <h1 className="text-xl text-white tracking-widest font-semibold uppercase">
          <span className="bg-gradient-to-tl from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
            Meta
          </span>
          Films
          <span className="text-primary"></span>
        </h1>
      </Link>

      <div className="text-white text-lg font-medium mt-12">MENU</div>
      <div className="mt-8 ml-4 flex flex-col gap-6">
        <Link
          href="/"
          className={`flex gap-6 items-center ${
            isActiveLink("/")
              ? "!text-white border-r-4 border-white font-medium"
              : "hover:text-white transition duration-300"
          }`}
        >
          <Home size={25} />
          <p>Home</p>
        </Link>
        <Link
          href="/explore"
          className={`flex gap-6 items-center ${
            isActiveLink("/explore")
              ? "!text-white border-r-4 border-white font-medium"
              : "hover:text-white transition duration-300"
          }`}
        >
          <Compass size={25} />
          <p>Explore</p>
        </Link>
        {/* <Link
          href="/search"
          className={`flex gap-6 items-center ${
            isActiveLink("/search")
              ? "!text-white border-r-4 border-white font-medium"
              : "hover:text-white transition duration-300"
          }`}
        >
          <Search size={25} />
          <p>Search</p>
        </Link> */}
      </div>

      <div className="text-white text-lg font-medium mt-12">PERSONAL</div>
      <div className="mt-8 ml-4 flex flex-col gap-6">
        <button className="flex gap-6 items-center hover:text-white transition duration-300">
          <Bookmark size={25} />
          <p>Bookmarked</p>
        </button>
        <button className="flex gap-6 items-center hover:text-white transition duration-300">
          <History size={25} />
          <p>History</p>
        </button>
      </div>

      <div className="text-white text-lg font-medium mt-12">GENERAL</div>
      <div className="mt-8 ml-4 flex flex-col gap-6">
        <button className="flex gap-6 items-center hover:text-white transition duration-300">
          <User size={25} />
          <p>Profile</p>
        </button>
        <Link href="/login" className="flex gap-5 items-center">
          <LogIn size={30} />
          <p>Login</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
