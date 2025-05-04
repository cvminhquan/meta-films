"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import FilmCard from "@/components/film-cards/FilmCard";
import SearchBar from "@/components/searchbar/searchbar";
import { Movie } from "@/types/movie";
import { ChevronDown } from "lucide-react";
import { fetchExploreList } from "@/libs/tmdb";
import { useGenres } from "@/components/provider/genre-context/genre-context";

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Documentary",
  "Animation",
];

export default function ExploreContent() {
  const searchParams = useSearchParams();
  const sortParam = searchParams.get("sort") || "popular";

  const [activeType, setActiveType] = useState<"tv" | "movie">("tv");
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>();
  const [minRuntime, setMinRuntime] = useState(0);
  const [maxRuntime, setMaxRuntime] = useState(200);
  const [dateFrom, setDateFrom] = useState("2000-01-01");
  const [dateTo, setDateTo] = useState("2025-01-01");

  // const genreMap = useGenres();
  // console.log("genreMap", genreMap);

  const { data: movies = [], isLoading } = useQuery<Movie[]>({
    queryKey: [
      "explore",
      activeType,
      sortParam,
      selectedGenre,
      minRuntime,
      maxRuntime,
      dateFrom,
      dateTo,
    ],
    queryFn: () =>
      fetchExploreList({
        type: activeType,
        sort: sortParam,
        genre: selectedGenre,
        minRuntime,
        maxRuntime,
        dateFrom,
        dateTo,
      }),
  });

  return (
    <div className="px-4 md:px-8 py-4">
      <h1 className="text-white text-2xl md:text-3xl font-bold mb-6">
        FIND FILMS THAT BEST FIT YOU
      </h1>

      <div className="flex mb-6 border-b border-gray-700 pb-1">
        {["tv", "movie"].map((type) => (
          <button
            key={type}
            className={`mr-4 py-2 px-1 ${
              activeType === type
                ? "border-b-2 border-primary text-white"
                : "text-gray-400"
            }`}
            onClick={() => setActiveType(type as "tv" | "movie")}
          >
            {type === "tv" ? "TV Show" : "Movie"}
          </button>
        ))}
      </div>

      {/* <div className="relative">
        <div className="md:w-[300px] mb-6">
          <SearchBar placeholder="Search..." className="relative shadow-none" />
        </div>
      </div> */}

      <div className="flex flex-col md:flex-row">
        <div className="md:flex-grow">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {isLoading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full aspect-[2/3] bg-gray-700 animate-pulse rounded"
                  />
                ))
              : movies.map((movie) => (
                  <FilmCard key={movie.id} movie={movie} />
                ))}
          </div>
        </div>

        <div className="md:w-[300px] shrink-0 mt-8 md:mt-0 md:ml-8">
          <div className="bg-dark-lighten rounded-md shadow-md px-4 pt-3 mb-6">
            <div className="text-white pb-3 flex justify-between">
              <p className="text-lg">Filter</p>
              <ChevronDown className="w-5 h-5" />
            </div>

            <div className="py-4 border-t border-dark-darken">
              <p className="text-white mb-2">Genres</p>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() =>
                      setSelectedGenre((prev) =>
                        prev === genre ? undefined : genre
                      )
                    }
                    className={`py-1 px-3 rounded-full text-sm ${
                      selectedGenre === genre
                        ? "bg-primary text-white"
                        : "bg-dark-lighten-2 text-white hover:bg-dark-darken"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>

              <p className="text-white mt-6 mb-2">Runtime</p>
              <div className="flex justify-between items-center gap-4">
                <input
                  type="number"
                  value={minRuntime}
                  min={0}
                  onChange={(e) => setMinRuntime(+e.target.value)}
                  className="w-20 px-2 py-1 rounded bg-dark-lighten-2 text-white"
                />
                <span className="text-white">to</span>
                <input
                  type="number"
                  value={maxRuntime}
                  min={0}
                  onChange={(e) => setMaxRuntime(+e.target.value)}
                  className="w-20 px-2 py-1 rounded bg-dark-lighten-2 text-white"
                />
              </div>

              <p className="text-white mt-6 mb-2">Release Date</p>
              <div className="flex justify-between items-center gap-4">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-2 py-1 rounded bg-dark-lighten-2 text-white"
                />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-2 py-1 rounded bg-dark-lighten-2 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
