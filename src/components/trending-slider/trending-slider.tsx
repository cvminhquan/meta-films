"use client";

import { Movie } from "@/types/movie";
import { PlayCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGenres } from "../provider/genre-context/genre-context";

export default function TrendingSlider({
  movies,
  tab,
}: {
  movies: Movie[];
  tab: string;
}) {
  const genreMap = useGenres();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  if (!movies || movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  return (
    <div className="mt-6 relative h-0 md:pb-[45%] pb-[55%] tw-banner-slider">
      <div className="absolute top-0 left-0 w-full h-full rounded-lg">
        <Link
          href={
            currentMovie.media_type === "movie"
              ? `/movie/${currentMovie.id}`
              : `/tv/${currentMovie.id}`
          }
          className="group block w-full h-full"
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
            alt={currentMovie.title || currentMovie.name}
            title={currentMovie.title || currentMovie.name}
            width={1280}
            height={600}
            quality={100}
            className="object-cover w-full h-full rounded-lg"
          />

          <div className="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none tw-black-backdrop group-hover:bg-[#00000026] transition duration-700"></div>

          <div className="hidden md:flex absolute top-[5%] right-[3%] px-3 py-1 rounded-full text-white bg-gradient-to-tl from-indigo-500 to-fuchsia-500 items-center gap-1">
            <span>{currentMovie.vote_average.toFixed(1)}</span>
            <Star size={14} className="fill-white" />
          </div>

          <div className="tw-absolute-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-[#c353b4] tw-flex-center z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-700">
            <PlayCircle size={35} className="text-white" />
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-[5%] md:max-w-md max-w-[200px]">
            <h2 className="md:text-5xl text-xl text-white font-black tracking-wide md:tw-multiline-ellipsis-2 tw-multiline-ellipsis-3">
              {currentMovie.title || currentMovie.name}
            </h2>
            <div className="flex gap-2 flex-wrap mt-3 text-sm text-white/90">
              {currentMovie.genre_ids?.map((id) => (
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
                {currentMovie.release_date && `Release date: ${currentMovie.release_date}`}
              </p>
              <>
                <div className="flex gap-2 flex-wrap mt-5"></div>
                <p className=" mt-3 text-base tw-multiline-ellipsis-3">
                  {currentMovie.overview}
                </p>
              </>
            </div>
          </div>
        </Link>

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
