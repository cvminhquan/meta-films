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
  fetchPopularSeries,
} from "@/libs/tmdb";
import { Movie } from "@/types/movie";
import { MovieSection } from "@/components/movie-section";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";
import { TrendingSlider } from "../trending-slider";
import { cn } from "@/libs/utils";
import { MOVIE_TYPE } from "@/constanst/movie";

export default function TabbedHomepage() {
  const [tab, setTab] = useState<MOVIE_TYPE.MOVIE | MOVIE_TYPE.TV | "series">(
    MOVIE_TYPE.MOVIE
  );

  const [loading, setLoading] = useState(true);

  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      if (tab === MOVIE_TYPE.MOVIE) {
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
      } else if (tab === "series") {
        const [seriesPopular, seriesTopRated, seriesTrend] = await Promise.all([
          fetchPopularSeries(),
          fetchTopRatedTV(),
          fetchTrendingTV(),
        ]);
        setPopular(seriesPopular);
        setTopRated(seriesTopRated);
        setUpcoming([]);
        setTrending(seriesTrend);
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
          variant={tab === MOVIE_TYPE.MOVIE ? "default" : "ghost"}
          onClick={() => setTab(MOVIE_TYPE.MOVIE)}
          className={cn(
            tab === MOVIE_TYPE.MOVIE &&
              "relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-1 after:bg-white"
          )}
        >
          Movies
        </Button>
        {/* <Button
          variant={tab === "series" ? "default" : "ghost"}
          onClick={() => setTab("series")}
          className={cn(
            tab === "series" &&
              "relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-1 after:bg-white"
          )}
        >
          Series
        </Button> */}

        <Button
          variant={tab === MOVIE_TYPE.TV ? "default" : "ghost"}
          onClick={() => setTab(MOVIE_TYPE.TV)}
          className={cn(
            tab === MOVIE_TYPE.TV &&
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
          {tab === MOVIE_TYPE.MOVIE && (
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
            type={
              tab === MOVIE_TYPE.MOVIE
                ? MOVIE_TYPE.MOVIE
                : tab === MOVIE_TYPE.TV
                ? MOVIE_TYPE.TV
                : "series"
            }
            title={
              tab === MOVIE_TYPE.MOVIE
                ? "Popular Movies"
                : tab === MOVIE_TYPE.TV
                ? "Popular TV Shows"
                : "Popular Series"
            }
            movies={popular}
            sortParam={
              tab === MOVIE_TYPE.MOVIE
                ? "popular"
                : tab === MOVIE_TYPE.TV
                ? "tv_popular"
                : "series_popular"
            }
          />
          <MovieSection
            type={
              tab === MOVIE_TYPE.MOVIE
                ? MOVIE_TYPE.MOVIE
                : tab === MOVIE_TYPE.TV
                ? MOVIE_TYPE.TV
                : "series"
            }
            title={
              tab === MOVIE_TYPE.MOVIE
                ? "Top Rated Movies"
                : tab === MOVIE_TYPE.TV
                ? "Top Rated TV Shows"
                : "Top Rated Series"
            }
            movies={topRated}
            sortParam={
              tab === MOVIE_TYPE.MOVIE
                ? "top_rated"
                : tab === MOVIE_TYPE.TV
                ? "tv_top_rated"
                : "series_top_rated"
            }
          />

          {tab === MOVIE_TYPE.MOVIE && (
            <>
              <MovieSection
                type={
                  tab === MOVIE_TYPE.MOVIE
                    ? MOVIE_TYPE.MOVIE
                    : tab === MOVIE_TYPE.TV
                    ? MOVIE_TYPE.TV
                    : "series"
                }
                title="Upcoming Movies"
                movies={upcoming}
                sortParam="upcoming"
              />
              <MovieSection
                type={
                  tab === MOVIE_TYPE.MOVIE
                    ? MOVIE_TYPE.MOVIE
                    : tab === MOVIE_TYPE.TV
                    ? MOVIE_TYPE.TV
                    : "series"
                }
                title="Trending Movies"
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
