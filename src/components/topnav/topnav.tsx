"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "../searchbar/searchbar";
import Image from "next/image";

export const TopNav = () => {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center px-4 md:px-8 pt-10 pb-4 lg:pb-0 lg:pt-0">
      <div className="flex items-center gap-8">
        <button onClick={() => router.back()} title="Go back">
          <ChevronLeft size={24} className="hover:text-white transition" />
        </button>
        <button onClick={() => router.forward()} title="Go forward">
          <ChevronRight size={24} className="hover:text-white transition" />
        </button>
        <SearchBar className="hidden lg:block" />
      </div>
      <div className="flex items-center gap-4">
        <p>Hi, Quan Chau</p>
        <Image
          src="/assets/images/defaultAvatar.jpg"
          alt="Logo"
          title="Logo"
          width={50}
          height={50}
          className="w-7 h-7 rounded-full object-cover"
        />
      </div>
    </div>
  );
};
