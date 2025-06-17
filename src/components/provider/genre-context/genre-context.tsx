"use client";

import { NEXT_PUBLIC_API_URL_2 } from "@/constanst/env";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

type GenreMap = Map<number, string>;

export const GenreContext = createContext<GenreMap | null>(null);

export const useGenres = () => {
  const context = useContext(GenreContext);
  if (!context) throw new Error("useGenres must be used inside GenreProvider");
  return context;
};

export const GenreProvider = ({ children }: { children: React.ReactNode }) => {
  const [genreMap, setGenreMap] = useState<GenreMap>(new Map());

  useEffect(() => {
    const fetchGenres = async () => {
      const [movieRes] = await Promise.all([
        axios.get(`${NEXT_PUBLIC_API_URL_2}/the-loai`, {}),
      ]);

      const map = new Map<number, string>();
      movieRes.data.forEach((g: any) => map.set(g.id, g.name));
      setGenreMap(map);
    };

    fetchGenres();
  }, []);
console.log("GenreProvider rendered with genres:", genreMap);
  return (
    <GenreContext.Provider value={genreMap}>{children}</GenreContext.Provider>
  );
};
