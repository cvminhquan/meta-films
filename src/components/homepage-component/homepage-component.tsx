"use client";

import "swiper/css";
import { MovieSection } from "../movie-section";

import {
  fetchPopularMovies,
  fetchPopularTV,
  fetchTopRatedMovies,
  fetchTopRatedTV,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "@/libs/tmdb";
import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

export const HomepageComponent = () => {
  const { data: movies, isLoading } = useQuery<Movie[]>({
    queryKey: ["popularMovies"],
    queryFn: fetchPopularMovies,
    staleTime: 1000 * 60 * 5,
  });

  const { data: tvShows, isLoading: isLoadingTV } = useQuery<Movie[]>({
    queryKey: ["popularTVShows"],
    queryFn: fetchPopularTV,
    staleTime: 1000 * 60 * 5,
  });

  const { data: topRatedMovies, isLoading: isLoadingTopRated } = useQuery<
    Movie[]
  >({
    queryKey: ["topRatedMovies"],
    queryFn: fetchTopRatedMovies,
    staleTime: 1000 * 60 * 5,
  });

  const { data: topRatedTV, isLoading: isLoadingTopRatedTV } = useQuery<
    Movie[]
  >({
    queryKey: ["topRatedTVShows"],
    queryFn: fetchTopRatedTV,
    staleTime: 1000 * 60 * 5,
  });

  const { data: trendingMovies, isLoading: isLoadingTrending } = useQuery<
    Movie[]
  >({
    queryKey: ["trendingMovies"],
    queryFn: fetchTrendingMovies,
    staleTime: 1000 * 60 * 5,
  });

  const { data: upcomingMovies, isLoading: isLoadingUpcoming } = useQuery<
    Movie[]
  >({
    queryKey: ["upcomingMovies"],
    queryFn: fetchUpcomingMovies,
    staleTime: 1000 * 60 * 5,
  });

  const isAllLoading =
    isLoading ||
    isLoadingTV ||
    isLoadingTopRated ||
    isLoadingTrending ||
    isLoadingUpcoming ||
    isLoadingTopRatedTV;

  if (isAllLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="container mx-auto">
        <MovieSection
          title="🔥 Popular Movies"
          movies={movies || []}
          sortParam="popular"
        />
        {/* <MovieSection
          title="⭐ Top Rated Movies"
          movies={topRatedMovies || []}
          sortParam="top_rated"
        />
        <MovieSection
          title="🎬 Upcoming Movies"
          movies={upcomingMovies || []}
          sortParam="upcoming"
        />
        <MovieSection
          title="📈 Trending Movies"
          movies={trendingMovies || []}
          sortParam="trending"
        />
        <MovieSection
          title="📺 Popular TV Shows"
          movies={tvShows || []}
          sortParam="tv_popular"
        />
        <MovieSection
          title="🏆 Top Rated TV Shows"
          movies={topRatedTV || []}
          sortParam="tv_top_rated"
        /> */}
      </div>
    </div>
  );
};
