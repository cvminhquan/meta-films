"use client";

import { NEXT_PUBLIC_API_URL } from "@/constanst/env";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useContext, useEffect } from "react";

type GenreMap = Map<string, string>;

export const GenreContext = createContext<GenreMap | null>(null);

export const useGenres = () => {
  const context = useContext(GenreContext);
  if (!context) throw new Error("useGenres must be used inside GenreProvider");
  return context;
};

export const GenreProvider = ({ children }: { children: React.ReactNode }) => {
  console.log("GenreProvider rendered, NEXT_PUBLIC_API_URL:", NEXT_PUBLIC_API_URL);

  // Test API directly
  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log("Testing API directly...");
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/the-loai`);
        console.log("Direct API test success:", response.data);
      } catch (error) {
        console.error("Direct API test failed:", error);
      }
    };
    testAPI();
  }, []);

  const { data: genres = [], error, isLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      console.log("Fetching genres from:", `${NEXT_PUBLIC_API_URL}/the-loai`);
      const res = await axios.get(`${NEXT_PUBLIC_API_URL}/the-loai`, {});
      console.log("Genres response:", res.data);
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
    retryDelay: 1000,
    enabled: true,
    refetchOnMount: true,
  });

  console.log("Genres data:", genres);
  console.log("Genres error:", error);
  console.log("Genres loading:", isLoading);

  const genreMap = new Map<string, string>();
  genres.forEach((g: any) => genreMap.set(g._id, g.name));

  console.log("Genre map created:", genreMap);

  return (
    <GenreContext.Provider value={genreMap}>{children}</GenreContext.Provider>
  );
};
