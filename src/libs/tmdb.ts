// src/lib/tmdb.ts
import { Movie } from "@/types/movie";
import api from "./axios";

export const fetchMovieById = async (id: string | number) => {
  const res = await api.get(`/movie/${id}`);
  return res.data;
};
// Movie fetchers
export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const res = await api.get("/movie/popular");
  return res.data.results;
};

export const fetchTopRatedMovies = async (): Promise<Movie[]> => {
  const res = await api.get("/movie/top_rated");
  return res.data.results;
};

export const fetchUpcomingMovies = async (): Promise<Movie[]> => {
  const res = await api.get("/movie/upcoming");
  return res.data.results;
};

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  const res = await api.get("/trending/movie/day");
  return res.data.results;
};

export const getMovieDetail = async (id: number | string) => {
  const res = await api.get(`/movie/${id}`);
  return res.data;
};

export const getSimilarMovies = async (id: number | string) => {
  const res = await api.get(`/movie/${id}/similar`);
  return res.data.results;
};
// TV show fetchers (same interface)
export const fetchPopularTV = async (): Promise<Movie[]> => {
  const res = await api.get("/tv/popular");
  return res.data.results;
};
export const getTVDetail = async (id: number | string) => {
  const res = await api.get(`/tv/${id}`);
  return res.data;
};

export const getSimilarTV = async (id: number | string) => {
  const res = await api.get(`/tv/${id}/similar`);
  return res.data.results;
};


export const fetchTopRatedTV = async (): Promise<Movie[]> => {
  const res = await api.get("/tv/top_rated");
  return res.data.results;
};
export const fetchTrendingTV = async (): Promise<Movie[]> => {
  const res = await api.get("/trending/tv/day");
  return res.data.results;
};

// series fetchers (same interface)
export const fetchPopularSeries = async (): Promise<Movie[]> => {
  const res = await api.get("/series/popular");
  return res.data.results;
};

export const fetchExploreList = async ({
  type,
  sort,
  genre,
  minRuntime,
  maxRuntime,
  dateFrom,
  dateTo,
}: {
  type: "movie" | "tv";
  sort: string;
  genre?: string;
  minRuntime?: number;
  maxRuntime?: number;
  dateFrom?: string;
  dateTo?: string;
}): Promise<Movie[]> => {
  const base =
    sort === "hot"
      ? `/trending/${type}/day`
      : sort === "on_the_air" && type === "tv"
      ? `/tv/on_the_air`
      : `/discover/${type}`;

  const res = await api.get(base, {
    params: {
      sort_by:
        sort === "top_rated"
          ? "vote_average.desc"
          : sort === "newest"
          ? "release_date.desc"
          : sort === "oldest"
          ? "release_date.asc"
          : sort === "rating"
          ? "vote_count.desc"
          : "popularity.desc",
      with_genres: genre,
      with_runtime_gte: minRuntime,
      with_runtime_lte: maxRuntime,
      "primary_release_date.gte": dateFrom,
      "primary_release_date.lte": dateTo,
    },
  });

  return res.data.results;
};
export const getSeasonDetail = async (tvId: number, seasonNumber: number) => {
  const res = await api.get(`/tv/${tvId}/season/${seasonNumber}`);
  return res.data;
};
export const getEpisodeDetail = async (
  tvId: number,
  seasonNumber: number,
  episodeNumber: number
) => {
  const res = await api.get(
    `/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`
  );
  return res.data;
};
