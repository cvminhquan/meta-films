"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

type GenreMap = Map<number, string>;

const GenreContext = createContext<GenreMap | null>(null);

export const useGenres = () => {
  const context = useContext(GenreContext);
  if (!context) throw new Error("useGenres must be used inside GenreProvider");
  return context;
};

export const GenreProvider = ({ children }: { children: React.ReactNode }) => {
  const [genreMap, setGenreMap] = useState<GenreMap>(new Map());

  useEffect(() => {
    const fetchGenres = async () => {
      const [movieRes, tvRes] = await Promise.all([
        axios.get("https://api.themoviedb.org/3/genre/movie/list", {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            language: "en-US",
          },
        }),
        axios.get("https://api.themoviedb.org/3/genre/tv/list", {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            language: "en-US",
          },
        }),
      ]);

      const map = new Map<number, string>();
      movieRes.data.genres.forEach((g: any) => map.set(g.id, g.name));
      tvRes.data.genres.forEach((g: any) => {
        if (!map.has(g.id)) map.set(g.id, g.name); // avoid overwrite
      });

      setGenreMap(map);
    };

    fetchGenres();
  }, []);

  return (
    <GenreContext.Provider value={genreMap}>{children}</GenreContext.Provider>
  );
};
