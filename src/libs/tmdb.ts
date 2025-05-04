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

// TV show fetchers (same interface)
export const fetchPopularTV = async (): Promise<Movie[]> => {
  const res = await api.get("/tv/popular");
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
