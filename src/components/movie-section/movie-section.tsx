"use client";

import { Movie } from "@/types/movie";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import FilmCard from "../film-cards/FilmCard";
import { Button } from "../ui/button";
import SectionHeader from "../ui/SectionHeader";
import { Skeleton } from "../ui/skeleton";

type MovieSectionProps = {
  type: "phim-bo" | "phim-le" | "tv-shows" | "hoat-hinh" | "phim-vietsub" | "phim-thuyet-minh" | "phim-long-tieng";
  title: string;
  movies: Movie[];
  sortParam: string;
  isComponentsLoading?: boolean;
};

export const MovieSection = ({
  type,
  title,
  movies,
  sortParam,
  isComponentsLoading = false,
}: MovieSectionProps) => {
  return (
    <div className="mt-12">
      <SectionHeader
        title={title}
        rightContent={
          <Link href={`/explore?sort=${sortParam}`}>
            <Button
              variant="link"
              className="text-white hover:no-underline hover:text-[#a93df0] flex items-center gap-1"
            >
              See more <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        }
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isComponentsLoading
          ? new Array(10).fill("").map((_, index) => (
              <div key={index}>
                <Skeleton className="w-full aspect-[3/4] shadow-sm" />
              </div>
            ))
          : movies?.slice(0, 10).map((movie) => (
              <div key={movie._id}>
                <FilmCard movie={movie} type={type} />
              </div>
            ))}
      </div>
    </div>
  );
};
