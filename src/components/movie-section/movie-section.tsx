"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Movie } from "@/types/movie";
import FilmCard from "../film-cards/FilmCard";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import SectionHeader from "../ui/SectionHeader";

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
  isComponentsLoading,
}: MovieSectionProps) => {
  console.log(isComponentsLoading)
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-4">
        {isComponentsLoading
          ? new Array(6).fill("").map((_, index) => (
            <div key={index} className="">
                <Skeleton className="h-[280px] shadow-sm" />
              </div>
            ))
          : movies?.map((movie) => (
              <div key={movie._id} className="">
                <FilmCard movie={movie} type={type} />
              </div>
            ))}
      </div>
    </div>
  );
};
