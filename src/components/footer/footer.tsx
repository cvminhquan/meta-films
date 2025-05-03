import type { FC } from "react";
import Link from "next/link";
import { Github, Facebook } from "lucide-react";

const Footer: FC = () => {
  return (
    <div className="bg-dark-lighten text-white flex justify-between items-center py-3 px-4 shadow-md mt-3">
      <p className="flex gap-2">
        <span>Copyright cvminhquan</span>
        <span className="hidden md:block"> © 30/4/2025</span>
      </p>
      <div className="flex gap-3 items-center">
        <p className="hidden md:block">Contact me: </p>
        <div className="flex gap-2">
          <Link
            href="https://github.com/cvminhquan"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#6e5494] transition duration-300"
          >
            <Github size={24} />
          </Link>
          <Link
            href="https://www.facebook.com/cvminhquan"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition duration-300"
          >
            <Facebook size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
