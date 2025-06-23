// src/libs/phimapi.ts
import { Movie, MovieDetail } from "@/types/movie";
import axios from "axios";
import api from "./axios";

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
    console.log("Fetching movie detail for slug:", slug);
    const response = await axios.get(`https://phimapi.com/phim/${slug}`);
    // The API response structure is: { status, msg, movie, episodes }
    // So we should return response.data.movie (not response.movie)
    return response.data;
  } catch (error) {
    console.error("Error fetching movie detail:", error);
    return null;
  }
};

// Search movies using phimapi.com search API
export const searchPhimApiMovies = async ({
  keyword,
  page = 1,
  sort_field = "_id",
  sort_type = "desc",
  sort_lang,
  category,
  country,
  year,
  limit = 20,
}: {
  keyword: string;
  page?: number;
  sort_field?: string;
  sort_type?: "asc" | "desc";
  sort_lang?: string;
  category?: string;
  country?: string;
  year?: number;
  limit?: number;
}) => {
  try {
    const params: any = {
      keyword,
      page,
      sort_field,
      sort_type,
      limit,
    };
    if (sort_lang) params.sort_lang = sort_lang;
    if (category) params.category = category;
    if (country) params.country = country;
    if (year) params.year = year;

    const response = await axios.get("https://phimapi.com/v1/api/tim-kiem", {
      params,
    });
    return response.data.data?.items || [];
  } catch (error) {
    console.error("Error searching movies from phimapi.com:", error);
    return [];
  }
};

// Fetch list of countries from phimapi.com
export const fetchCountries = async () => {
  try {
    const response = await axios.get("https://phimapi.com/v1/api/quoc-gia");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching countries from phimapi.com:", error);
    return [];
  }
};

// Fetch genres from phimapi.com (non-v1 endpoint)
export const fetchGenresV0 = async () => {
  try {
    const response = await axios.get("https://phimapi.com/the-loai");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching genres from phimapi.com (v0):", error);
    return [];
  }
};

// Fetch newly updated movies
export const fetchNewlyUpdatedMovies = async (page: number = 1) => {
  try {
    const response = await axios.get(`https://phimapi.com/danh-sach/phim-moi-cap-nhat`, {
      params: { page }
    });
    return response.data.items || [];
  } catch (error) {
    console.error("Error fetching newly updated movies from phimapi.com:", error);
    return [];
  }
};
