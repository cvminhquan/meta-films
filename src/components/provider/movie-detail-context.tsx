"use client";

import { MovieDetail } from "@/types/movie";
import { createContext, ReactNode, useContext } from "react";

interface MovieDetailContextType {
  movieDetail: MovieDetail | null;
}

const MovieDetailContext = createContext<MovieDetailContextType | undefined>(
  undefined
);

export const MovieDetailProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: MovieDetail | null;
}) => {
  return (
    <MovieDetailContext.Provider value={{ movieDetail: value }}>
      {children}
    </MovieDetailContext.Provider>
  );
};

export const useMovieDetail = () => {
  const context = useContext(MovieDetailContext);
  if (context === undefined) {
    throw new Error("useMovieDetail must be used within a MovieDetailProvider");
  }
  return context;
}; 
