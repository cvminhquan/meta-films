"use client";

import type { FC } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

interface MobileHeaderProps {
  onToggleSidebar?: () => void;
}

const MobileHeader: FC<MobileHeaderProps> = ({ onToggleSidebar }) => {
  return (
    <div className="flex md:hidden justify-between items-center px-5 my-5">
      <Link className="flex gap-2 items-center" href="/">
        <p className="text-xl text-white font-medium tracking-wider uppercase">
          Moon<span className="text-primary">light</span>
        </p>
      </Link>
      <button onClick={onToggleSidebar}>
        <Menu className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default MobileHeader;
