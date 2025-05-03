"use client";

import { type FC, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/libs/utils";

interface SearchBarProps {
  className?: string;
  classInput?: string;
  placeholder?: string;
  initialValue?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({
  className = "",
  classInput = "",
  placeholder = "Search...",
  initialValue = "",
  onSearch,
}) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(initialValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      if (onSearch) {
        onSearch(searchValue);
      } else {
        router.push(`/search?q=${encodeURIComponent(searchValue)}`);
      }
    }
  };

  return (
    <div
      className={`w-full outline-none py-3 placeholder-gray-500 text-white  ${className}`}
    >
      <form className="relative" onSubmit={handleSubmit}>
        <button
          type="submit"
          className="absolute top-1/2 -translate-y-1/2 left-5"
        >
          <Search className="w-6 h-6 text-gray-400" />
        </button>
        <input
          className={cn(
            "w-[440px] max-w-[440px] pl-14 pr-7 outline-none rounded-3xl bg-[rgb(51_51_53_/_1)] py-3 placeholder-gray-500 text-white",
            classInput
          )}
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
