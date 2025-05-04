"use client";

import { Movie } from "@/types/movie";
import FilmCard from "@/components/film-cards/FilmCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import { PlayCircle, Star } from "lucide-react";
import { useGenres } from "../provider/genre-context/genre-context";

export default function TrendingSlider({
  movies,
  tab,
}: {
  movies: Movie[];
  tab: string;
}) {
  const genreMap = useGenres();
  return (
    <div className="mt-6 relative h-0 md:pb-[45%] pb-[55%] tw-banner-slider">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        slidesPerView={1}
        className="!absolute !top-0 !left-0 !w-full !h-full  !rounded-lg"
      >
        {(movies as Movie[]).map((film, index) => (
          <SwiperSlide key={film.id}>
            <Link
              href={
                film.media_type === "movie"
                  ? `/movie/${film.id}`
                  : `/tv/${film.id}`
              }
              className="group"
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                alt="Backdrop image"
                title="Backdrop image"
                width={1280}
                height={600}
                quality={100}
                className="object-cover w-full h-full rounded-lg"
              />

              <div className="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none tw-black-backdrop group-hover:bg-[#00000026] transition duration-700"></div>

              <div className="hidden md:flex absolute top-[5%] right-[3%] bg-primary px-3 py-1 rounded-full text-white bg-[#a93df0] items-center gap-1">
                <span>{film.vote_average.toFixed(1)}</span>
                <Star size={14} className="fill-white" />
              </div>

              <div className="tw-absolute-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-[#c353b4] tw-flex-center z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-700">
                <PlayCircle size={35} className="text-white" />
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 left-[5%] md:max-w-md max-w-[200px]">
                <h2 className="md:text-5xl text-xl  text-primary font-black tracking-wide md:tw-multiline-ellipsis-2 tw-multiline-ellipsis-3">
                  {film.title || film.name}
                </h2>
                <div className="flex gap-2 flex-wrap mt-3 text-sm text-white/90">
                  {film.genre_ids?.map((id) => (
                    <span
                      key={id}
                      className="px-2 py-0.5 bg-white/10 border border-white/20 rounded-full"
                    >
                      {genreMap.get(id)}
                    </span>
                  ))}
                </div>
                <div>
                  <p className="mt-1">
                    {film.release_date && `Release date: ${film.release_date}`}
                  </p>
                  <>
                    <div className="flex gap-2 flex-wrap mt-5"></div>
                    <p className=" mt-3 text-base tw-multiline-ellipsis-3">
                      {film.overview}
                    </p>
                  </>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
        <div className="absolute top-0 left-0 w-[8%] h-[11%] z-10"></div>
      </Swiper>
    </div>
  );
}
