"use client";

import { Movie } from "@/types/movie";
import { PlayCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useGenres } from "../provider/genre-context/genre-context";

export default function TrendingSlider({
  movies,
  tab,
}: {
  movies: Movie[];
  tab: string;
}) {
  const genreMap = useGenres();
  const swiperRef = useRef<SwiperType>(null);

  if (!movies || movies.length === 0) return null;

  return (
    <div className="mt-6 relative">
      <style jsx>{`
        .trending-swiper {
          height: 45vh;
          min-height: 300px;
        }

        .trending-swiper .swiper-pagination {
          bottom: 20px;
        }

        .trending-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .trending-swiper .swiper-pagination-bullet-active {
          background: #a855f7;
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .trending-swiper {
            height: 55vh;
            min-height: 250px;
          }
        }
      `}</style>

      <Swiper
        className="trending-swiper rounded-lg"
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={movies.length > 1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie._id || index}>
            <div className="relative w-full h-full">
              <Link
                href={`/movie/${movie.slug}`}
                className="group block w-full h-full"
              >
                <Image
                  src={`https://img.phimapi.com/${movie.thumb_url}`}
                  alt={movie.name}
                  title={movie.name}
                  width={1280}
                  height={600}
                  quality={100}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-0 left-0 w-full h-full pointer-events-none tw-black-backdrop group-hover:bg-[#00000026] transition duration-700"></div>

                <div className="hidden md:flex absolute top-[5%] right-[3%] px-3 py-1 rounded-full text-white bg-gradient-to-tl from-indigo-500 to-fuchsia-500 items-center gap-1">
                  <span>{movie.tmdb.vote_average.toFixed(1)}</span>
                  <Star size={14} className="fill-white" />
                </div>

                <div className="tw-absolute-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-[#c353b4] tw-flex-center z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-700">
                  <PlayCircle size={35} className="text-white" />
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 left-[5%] md:max-w-md max-w-[200px]">
                  <h2 className="md:text-5xl text-xl text-white font-black tracking-wide md:tw-multiline-ellipsis-2 tw-multiline-ellipsis-3">
                    {movie.name}
                  </h2>
                  <div className="flex gap-2 flex-wrap mt-3 text-sm text-white/90">
                    {movie.category?.map((category, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-white/10 border border-white/20 rounded-full"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
