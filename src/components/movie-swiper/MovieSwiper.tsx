"use client";

import { Movie } from "@/types/movie";
import { ChevronLeft, ChevronRight, PlayCircle, Star } from "lucide-react";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

import FilmCard from "../film-cards/FilmCard";
import Link from "next/link";
import Image from "next/image";

interface MovieSwiperProps {
  movies: Movie[];
  title: string;
  type: "phim-bo" | "phim-le" | "tv-shows" | "hoat-hinh" | "phim-vietsub" | "phim-thuyet-minh" | "phim-long-tieng";
  isLoading?: boolean;
  className?: string;
}

const MovieSwiper: React.FC<MovieSwiperProps> = ({
  movies,
  title,
  type,
  isLoading = false,
  className = "",
}) => {
  const swiperRef = useRef<SwiperType>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  // Take only first 5 movies for swiper
  const displayMovies = movies?.slice(0, 5) || [];

  // Show skeleton when loading
  if (isLoading) {
    return (
      <div className={`movie-swiper-loading ${className}`}>
        <div className="flex justify-center items-center h-64">
          <div className="text-white">Loading movies...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`movie-swiper-container ${className}`}>
      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .movie-swiper {
          padding: 0 50px;
          margin: 0 auto;
        }

        .movie-swiper .swiper-pagination {
          bottom: -40px;
          position: relative;
          margin-top: 20px;
        }

        .movie-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .movie-swiper .swiper-pagination-bullet-active {
          background: #a855f7;
          transform: scale(1.2);
        }

        .movie-swiper-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .movie-swiper-nav-btn:hover {
          background: rgba(168, 85, 247, 0.8);
          border-color: #a855f7;
          transform: translateY(-50%) scale(1.1);
        }

        .movie-swiper-nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: translateY(-50%) scale(0.9);
        }

        .movie-swiper-nav-prev {
          left: 10px;
        }

        .movie-swiper-nav-next {
          right: 10px;
        }

        @media (max-width: 768px) {
          .movie-swiper {
            padding: 0 20px;
          }

          .movie-swiper-nav-btn {
            width: 35px;
            height: 35px;
          }

          .movie-swiper-nav-prev {
            left: 5px;
          }

          .movie-swiper-nav-next {
            right: 5px;
          }
        }
      `}</style>

      <div className="relative">
        {/* Navigation Buttons */}
        <button
          ref={navigationPrevRef}
          className="movie-swiper-nav-btn movie-swiper-nav-prev"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          ref={navigationNextRef}
          className="movie-swiper-nav-btn movie-swiper-nav-next"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Swiper */}
        <Swiper
          className="movie-swiper"
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          loop={displayMovies.length > 1}
          centeredSlides={true}
          effect="slide"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;

            // Update navigation buttons after swiper initialization
            setTimeout(() => {
              if (
                navigationPrevRef.current &&
                navigationNextRef.current &&
                swiper.navigation
              ) {
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }, 100);
          }}
        >
          {displayMovies.map((movie, index) => (
            <SwiperSlide key={movie._id || index}>
              <Link href={`/movie/${movie._id}`} className="group">
                <Image
                  src={`https://img.phimapi.com/${movie.thumb_url}`}
                  alt={movie.name}
                  title={movie.name}
                  width={1280}
                  height={600}
                  quality={100}
                  className="object-cover w-full h-full rounded-lg"
                />

                <div className="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none tw-black-backdrop group-hover:bg-[#00000026] transition duration-700"></div>

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
                    {movie.category?.map((movieCate, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-white/10 border border-white/20 rounded-full"
                      >
                        {movieCate.name}
                      </span>
                    ))}
                  </div>
                  {/* <div>
                    <p className="mt-1">
                      {movie.release_date &&
                        `Release date: ${movie.release_date}`}
                    </p>
                    <>
                      <div className="flex gap-2 flex-wrap mt-5"></div>
                      <p className=" mt-3 text-base tw-multiline-ellipsis-3">
                        {movie.overview}
                      </p>
                    </>
                  </div> */}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieSwiper;
