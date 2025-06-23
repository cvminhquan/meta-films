"use client";

import FilmCard from "@/components/film-cards/FilmCard";
import { useGenres } from "@/components/provider/genre-context/genre-context";
import { Skeleton } from "@/components/ui/skeleton";
import { movieClient } from "@/lib/api/client/movieClient.api";
import { fetchCountries, fetchGenresV0 } from "@/libs/phimapi";
import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

// Helper to map phimapi type to FilmCard type
const mapMovieTypeToFilmCardType = (type: string) => {
  switch (type) {
    case "series":
      return "phim-bo";
    case "single":
      return "phim-le";
    case "tv-shows":
      return "tv-shows";
    case "hoat-hinh":
      return "hoat-hinh";
    case "phim-vietsub":
      return "phim-vietsub";
    case "phim-thuyet-minh":
      return "phim-thuyet-minh";
    case "phim-long-tieng":
      return "phim-long-tieng";
    default:
      return "phim-le";
  }
};

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState<"movie">("movie");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [genres, setGenres] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [sortField, setSortField] = useState<string>("_id");
  const [sortType, setSortType] = useState<string>("desc");
  const [totalPages, setTotalPages] = useState(1);

  const genreMap = useGenres();

  // Fetch genres and countries on mount
  useEffect(() => {
    fetchGenresV0().then(setGenres);
    fetchCountries().then(setCountries);
  }, []);

  // Generate year options (1970 - current year)
  const years = Array.from({ length: new Date().getFullYear() - 1969 }, (_, i) => (1970 + i).toString()).reverse();

  const { data: results, isLoading } = useQuery({
    queryKey: ["search", query, page, selectedGenre, selectedCountry, selectedYear, sortField, sortType],
    queryFn: async () => {
      if (!query) return [];
      const res = await movieClient.searchMovies(query, {
        page,
        sort_field: sortField,
        sort_type: sortType,
        category: selectedGenre,
        country: selectedCountry,
        year: selectedYear ? Number(selectedYear) : undefined,
      });
      // If phimapi returns totalPages, set it
      if (Array.isArray(res)) {
        setTotalPages(1);
        return res;
      } else if (res && res.length === undefined && res.totalPages && res.items) {
        setTotalPages(res.totalPages);
        return res.items;
      } else {
        setTotalPages(1);
        return Array.isArray(res) ? res : [];
      }
    },
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  });

  const filteredResults = Array.isArray(results) ? results : [];
  console.log(filteredResults);

  return (
    <div className="flex min-h-screen">
      <div className="flex-grow">
        {/* Tabs */}
        <div className="shrink-0 w-full pt-4 px-3">
          <div className="bg-dark-lighten rounded-md shadow-md px-4 pt-3">
            <ul className="flex border-b border-dark-lighten mt-6 px-6 md:px-12 text-white text-sm sm:text-base font-medium">
              <li
                className={`relative px-4 py-2 cursor-pointer transition-all duration-200 text-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-[2px] after:bg-primary after:rounded-full`}
              >
                Movie
              </li>
            </ul>
          </div>
        </div>

        {/* No Query Placeholder */}
        {!query && (
          <div className="mt-10 flex justify-center">
            <Image
              src="https://ext.same-assets.com/1583116382.png"
              alt=""
              width={700}
              height={437}
              className="max-w-[700px] w-[80vw] object-cover rounded-xl"
            />
          </div>
        )}

        {/* Query Results */}
        {query && (
          <div className="mt-10 px-6 md:px-12">
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-3 items-center px-6 md:px-12 mt-6">
              <select
                className="bg-dark-lighten text-white rounded px-3 py-2"
                value={selectedGenre}
                onChange={e => setSelectedGenre(e.target.value)}
              >
                <option value="">Thể loại</option>
                {[...genreMap.entries()].map(([id, name]) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
              <select
                className="bg-dark-lighten text-white rounded px-3 py-2"
                value={selectedCountry}
                onChange={e => setSelectedCountry(e.target.value)}
              >
                <option value="">Quốc gia</option>
                {countries.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
              <select
                className="bg-dark-lighten text-white rounded px-3 py-2"
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
              >
                <option value="">Năm sản xuất</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <select
                className="bg-dark-lighten text-white rounded px-3 py-2"
                value={sortField}
                onChange={e => setSortField(e.target.value)}
              >
                <option value="_id">Mặc định</option>
                <option value="modified.time">Cập nhật</option>
                <option value="year">Năm phát hành</option>
              </select>
              <select
                className="bg-dark-lighten text-white rounded px-3 py-2"
                value={sortType}
                onChange={e => setSortType(e.target.value)}
              >
                <option value="desc">Giảm dần</option>
                <option value="asc">Tăng dần</option>
              </select>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <div key={idx} className="relative group">
                    <div className="relative aspect-[2/3] overflow-hidden rounded-md">
                      <Skeleton className="w-full h-full absolute top-0 left-0" />
                    </div>
                    <Skeleton className="mt-2 h-5 w-3/4" />
                  </div>
                ))}
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[300px]">
                <h3 className="text-white text-2xl font-medium mb-2">
                  No results found
                </h3>
                <p className="text-gray-400">
                  Try searching for something else
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {filteredResults.map((item: Movie) => (
                  <Fragment key={item._id}>
                    <FilmCard
                      movie={item}
                      type={mapMovieTypeToFilmCardType(item.type)}
                    />
                  </Fragment>
                ))}
              </div>
            )}

            {/* Pagination */}
            {query && totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  className="px-3 py-1 rounded bg-dark-lighten text-white disabled:opacity-50"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Trang trước
                </button>
                <span className="text-white">{page} / {totalPages}</span>
                <button
                  className="px-3 py-1 rounded bg-dark-lighten text-white disabled:opacity-50"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Trang sau
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
