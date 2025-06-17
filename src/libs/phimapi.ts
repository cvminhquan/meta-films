// src/libs/phimapi.ts
import axios from "axios";
import api from "./axios";
import { Movie, MovieDetail } from "@/types/movie";

const BASE_URL = "/v1/api/danh-sach";

export const fetchMoviesByType = async (
  typeList: string,
  options: {
    page?: number;
    sort_field?: string;
    sort_type?: "asc" | "desc";
    sort_lang?: string;
    category?: string;
    country?: string;
    year?: number;
    limit?: number;
  } = {}
): Promise<Movie[]> => {
  const res = await api.get(`${BASE_URL}/${typeList}`, {
    params: {
      page: 1,
      sort_field: "_id",
      sort_type: "desc",
      limit: 20,
      ...options,
    },
  });

  return res.data.data.items || [];
};

// Shortcut fetchers
export const fetchPhimBo = () => fetchMoviesByType("phim-bo");
export const fetchPhimLe = () => fetchMoviesByType("phim-le");
export const fetchTVShow = () => fetchMoviesByType("tv-shows");
export const fetchHoatHinh = () => fetchMoviesByType("hoat-hinh");
export const fetchPhimVietsub = () =>
  fetchMoviesByType("phim-vietsub", { sort_lang: "vietsub" });
export const fetchThuyetMinh = () =>
  fetchMoviesByType("phim-thuyet-minh", { sort_lang: "thuyet-minh" });
export const fetchLongTieng = () =>
  fetchMoviesByType("phim-long-tieng", { sort_lang: "long-tieng" });
export const getMovieDetail = async (
  slug: string
): Promise<MovieDetail | null> => {
  try {
    const response = await axios.get(`https://phimapi.com/phim/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie detail:", error);
    return null;
  }
};
