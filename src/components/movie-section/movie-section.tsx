"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Movie } from "@/types/movie";
import FilmCard from "../film-cards/FilmCard";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import SectionHeader from "../ui/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

type MovieSectionProps = {
  type: "movie" | "tv" | "series";
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
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView="auto"
        slidesPerGroupAuto
        spaceBetween={30}
        loop
        className="tw-section-slider !py-2"
      >
        {isComponentsLoading
          ? new Array(6).fill("").map((_, index) => (
              <SwiperSlide key={index} className="!w-[220px]">
                <Skeleton className="!w-[220px] !h-[280px] shadow-sm" />
              </SwiperSlide>
            ))
          : movies?.map((movie) => (
              <SwiperSlide key={movie.id} className="!w-[220px]">
                <FilmCard movie={movie} type={type} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};
