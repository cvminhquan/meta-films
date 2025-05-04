"use client";

import { useState, useEffect } from "react";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchTrendingMovies,
  fetchPopularTV,
  fetchTopRatedTV,
  fetchTrendingTV,
} from "@/libs/tmdb";
import { Movie } from "@/types/movie";
import { MovieSection } from "@/components/movie-section";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";
import { TrendingSlider } from "../trending-slider";
import { cn } from "@/libs/utils";

export default function TabbedHomepage() {
  const [tab, setTab] = useState<"movie" | "tv">("movie");
  const [loading, setLoading] = useState(true);

  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      if (tab === "movie") {
        const [pop, top, upc, trend] = await Promise.all([
          fetchPopularMovies(),
          fetchTopRatedMovies(),
          fetchUpcomingMovies(),
          fetchTrendingMovies(),
        ]);
        setPopular(pop);
        setTopRated(top);
        setUpcoming(upc);
        setTrending(trend);
      } else {
        const [tvPopular, tvTopRated, trend] = await Promise.all([
          fetchPopularTV(),
          fetchTopRatedTV(),
          fetchTrendingTV(),
        ]);
        setPopular(tvPopular);
        setTopRated(tvTopRated);
        setUpcoming([]);
        setTrending(trend);
      }
      setLoading(false);
    };

    fetchData();
  }, [tab]);

  return (
    <div className="p-4 md:p-8">
      <div className="flex gap-4 mb-6">
        <Button
          variant={tab === "movie" ? "default" : "ghost"}
          onClick={() => setTab("movie")}
          className={cn(
            tab === "movie" &&
              "relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-1 after:bg-white"
          )}
        >
          Movies
        </Button>
        <Button
          variant={tab === "tv" ? "default" : "ghost"}
          onClick={() => setTab("tv")}
          className={cn(
            tab === "tv" &&
              "relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-1 after:bg-white"
          )}
        >
          TV Shows
        </Button>
      </div>

      {loading ? (
        <div className="container mx-auto">
          <Skeleton title="Popular" />
          <Skeleton title="Top Rated" />
          {tab === "movie" && (
            <>
              <Skeleton title="Upcoming" />
              <Skeleton title="Trending" />
            </>
          )}
        </div>
      ) : (
        <div className="container mx-auto">
          {trending.length > 0 && (
            <TrendingSlider tab={tab} movies={trending} />
          )}

          <MovieSection
            title={
              tab === "movie" ? "🔥 Popular Movies" : "📺 Popular TV Shows"
            }
            movies={popular}
            sortParam={tab === "movie" ? "popular" : "tv_popular"}
          />
          <MovieSection
            title={
              tab === "movie" ? "⭐ Top Rated Movies" : "🏆 Top Rated TV Shows"
            }
            movies={topRated}
            sortParam={tab === "movie" ? "top_rated" : "tv_top_rated"}
          />
          {tab === "movie" && (
            <>
              <MovieSection
                title="🎬 Upcoming Movies"
                movies={upcoming}
                sortParam="upcoming"
              />
              <MovieSection
                title="📈 Trending Movies"
                movies={trending}
                sortParam="trending"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
