import api from "../../../libs/axios";

const SENSITIVE_KEYWORDS = [
  "sex",
  "lust",
  "nude",
  "porn",
  "erotic",
  "adult",
  "affair",
  "seduction",
  "orgy",
  "xxx",
  "strip",
  "intimate",
  "explicit",
  "incest",
  "fetish",
  "brothel",
  "playboy",
  "mistress",
];

const filterSensitiveContent = (results: any[]) => {
  return results.filter((item) => {
    const combinedText = `${item.title || item.name || ""} ${
      item.overview || ""
    }`.toLowerCase();
    return !SENSITIVE_KEYWORDS.some((kw) => combinedText.includes(kw));
  });
};

export const movieClient = {
  searchMovies: async (query: string) => {
    const res = await api.get("/search/movie", {
      params: { query, include_adult: false },
    });
    return filterSensitiveContent(res.data.results);
  },

  searchTVShows: async (query: string) => {
    const res = await api.get("/search/tv", {
      params: { query, include_adult: false },
    });
    return filterSensitiveContent(res.data.results);
  },

  searchPeople: async (query: string) => {
    const res = await api.get("/search/person", {
      params: { query },
    });
    return res.data.results;
  },

  searchMulti: async (query: string) => {
    const res = await api.get("/search/multi", {
      params: { query, include_adult: false },
    });
    return filterSensitiveContent(res.data.results);
  },
};
