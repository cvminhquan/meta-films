"use client";

import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import MovieSwiper from "../movie-swiper/MovieSwiper";
import { Button } from "../ui/button";
import { searchPhimApiMovies } from "@/libs/phimapi";

interface GenreSwiperProps {
  genre: {
    _id: string;
    name: string;
  };
  className?: string;
}

const GenreSwiper: React.FC<GenreSwiperProps> = ({ genre, className = "" }) => {
  // Fetch movies for this specific genre
  const { data: movies = [], isLoading } = useQuery<Movie[]>({
    queryKey: ['genre-movies', genre._id],
    queryFn: async () => {
      try {
        const response = await searchPhimApiMovies({
          keyword: "",
          category: genre._id,
          country: "",
          year: undefined,
          sort_field: "modified.time",
          sort_type: "desc",
          page: 1,
          limit: 10,
        });
        return response || [];
      } catch (error) {
        console.error(`Error fetching movies for genre ${genre.name}:`, error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  return (
    <div className={`genre-swiper-section ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          🎭 {genre.name}
        </h2>
        <Link href={`/explore?genre=${encodeURIComponent(genre._id)}`}>
          <Button
            variant="link"
            className="text-white hover:no-underline hover:text-purple-400 flex items-center gap-1 text-sm"
          >
            Xem tất cả <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Movie Swiper */}
      <MovieSwiper
        movies={movies}
        title=""
        type="phim-le" // Default type, could be dynamic based on genre
        isLoading={isLoading}
        className="genre-movies-swiper"
      />
    </div>
  );
};

export default GenreSwiper;
