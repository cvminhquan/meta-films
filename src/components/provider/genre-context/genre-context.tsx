"use client";

import { NEXT_PUBLIC_API_URL_2 } from "@/constanst/env";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext } from "react";

type GenreMap = Map<number, string>;

export const GenreContext = createContext<GenreMap | null>(null);

export const useGenres = () => {
  const context = useContext(GenreContext);
  if (!context) throw new Error("useGenres must be used inside GenreProvider");
  return context;
};

export const GenreProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: genres = [] } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const res = await axios.get(`${NEXT_PUBLIC_API_URL_2}/the-loai`, {});
      return res.data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const genreMap = new Map<number, string>();
  genres.forEach((g: any) => genreMap.set(g.id, g.name));

  return (
    <GenreContext.Provider value={genreMap}>{children}</GenreContext.Provider>
  );
};
