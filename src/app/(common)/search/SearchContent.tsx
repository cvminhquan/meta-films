"use client";

import FilmCard from "@/components/film-cards/FilmCard";
import { Skeleton } from "@/components/ui/skeleton";
import { movieClient } from "@/lib/api/client/movieClient.api";
import { fetchCountries } from "@/libs/phimapi";
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
  const [countries, setCountries] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([
    { _id: "hanh-dong", name: "Hành Động" },
    { _id: "vien-tuong", name: "Viễn Tưởng" },
    { _id: "kinh-di", name: "Kinh Dị" },
    { _id: "hai-huoc", name: "Hài Hước" },
    { _id: "tinh-cam", name: "Tình Cảm" },
    { _id: "phieu-luu", name: "Phiêu Lưu" },
    { _id: "chien-tranh", name: "Chiến Tranh" },
    { _id: "co-trang", name: "Cổ Trang" },
    { _id: "gia-dinh", name: "Gia Đình" },
    { _id: "hoat-hinh", name: "Hoạt Hình" }
  ]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [sortField, setSortField] = useState<string>("_id");
  const [sortType, setSortType] = useState<string>("desc");
  const [totalPages, setTotalPages] = useState(1);

  // Fetch genres and countries on mount
  useEffect(() => {
    fetchCountries().then(setCountries);
    // Use hardcoded genres for now
    const hardcodedGenres = [
      { _id: "hanh-dong", name: "Hành Động" },
      { _id: "vien-tuong", name: "Viễn Tưởng" },
      { _id: "kinh-di", name: "Kinh Dị" },
      { _id: "hai-huoc", name: "Hài Hước" },
      { _id: "tinh-cam", name: "Tình Cảm" },
      { _id: "phieu-luu", name: "Phiêu Lưu" },
      { _id: "chien-tranh", name: "Chiến Tranh" },
      { _id: "co-trang", name: "Cổ Trang" },
      { _id: "gia-dinh", name: "Gia Đình" },
      { _id: "hoat-hinh", name: "Hoạt Hình" }
    ];
    setGenres(hardcodedGenres);
    console.log("Hardcoded genres loaded:", hardcodedGenres);
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
  console.log("Search results:", filteredResults);
  console.log("Genres:", genres);
  console.log("Genres length:", genres.length);

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
            <div className="flex flex-wrap gap-4 items-center px-6 md:px-12 mt-6">
              <style jsx>{`
                .custom-select {
                  position: relative;
                  display: inline-block;
                }
                .custom-select select {
                  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
                  color: white;
                  border: 2px solid #374151;
                  border-radius: 12px;
                  padding: 12px 40px 12px 16px;
                  font-size: 14px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                  appearance: none;
                  min-width: 140px;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
                  backdrop-filter: blur(10px);
                }
                .custom-select select:hover {
                  border-color: #60a5fa;
                  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(96, 165, 250, 0.2);
                  transform: translateY(-2px);
                  background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
                }
                .custom-select select:focus {
                  outline: none;
                  border-color: #3b82f6;
                  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15), 0 10px 25px -3px rgba(0, 0, 0, 0.3);
                  transform: translateY(-2px);
                }
                .custom-select::after {
                  content: '▼';
                  position: absolute;
                  top: 50%;
                  right: 12px;
                  transform: translateY(-50%);
                  color: #9ca3af;
                  font-size: 12px;
                  pointer-events: none;
                  transition: all 0.3s ease;
                }
                .custom-select:hover::after {
                  color: #60a5fa;
                  transform: translateY(-50%) scale(1.1);
                }
                .custom-select select option {
                  background-color: #1f2937;
                  color: white;
                  padding: 12px 16px;
                  border: none;
                  font-weight: 500;
                }
                .custom-select.genre select:hover {
                  border-color: #60a5fa;
                  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(96, 165, 250, 0.3);
                }
                .custom-select.country select:hover {
                  border-color: #34d399;
                  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(52, 211, 153, 0.3);
                }
                .custom-select.year select:hover {
                  border-color: #a78bfa;
                  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(167, 139, 250, 0.3);
                }
                .custom-select.sort-field select:hover {
                  border-color: #fb923c;
                  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(251, 146, 60, 0.3);
                }
                .custom-select.sort-type select:hover {
                  border-color: #f87171;
                  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(248, 113, 113, 0.3);
                }
                .custom-select.genre select:focus {
                  border-color: #3b82f6;
                  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
                }
                .custom-select.country select:focus {
                  border-color: #10b981;
                  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
                }
                .custom-select.year select:focus {
                  border-color: #8b5cf6;
                  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15);
                }
                .custom-select.sort-field select:focus {
                  border-color: #f97316;
                  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.15);
                }
                .custom-select.sort-type select:focus {
                  border-color: #ef4444;
                  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.15);
                }
                @media (max-width: 768px) {
                  .custom-select select {
                    min-width: 120px;
                    padding: 10px 32px 10px 12px;
                    font-size: 13px;
                  }
                }
              `}</style>
              <div className="custom-select genre">
                <select
                  value={selectedGenre}
                  onChange={e => setSelectedGenre(e.target.value)}
                >
                  <option value="">🎭 Thể loại</option>
                  {genres.map((genre: any) => (
                    <option key={`genre-${genre._id}`} value={genre._id}>{genre.name}</option>
                  ))}
                </select>
              </div>

              <div className="custom-select country">
                <select
                  value={selectedCountry}
                  onChange={e => setSelectedCountry(e.target.value)}
                >
                  <option value="">🌍 Quốc gia</option>
                  {countries.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="custom-select year">
                <select
                  value={selectedYear}
                  onChange={e => setSelectedYear(e.target.value)}
                >
                  <option value="">📅 Năm sản xuất</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div className="custom-select sort-field">
                <select
                  value={sortField}
                  onChange={e => setSortField(e.target.value)}
                >
                  <option value="_id">🔄 Mặc định</option>
                  <option value="modified.time">🆕 Cập nhật</option>
                  <option value="year">📆 Năm phát hành</option>
                </select>
              </div>

              <div className="custom-select sort-type">
                <select
                  value={sortType}
                  onChange={e => setSortType(e.target.value)}
                >
                  <option value="desc">⬇️ Giảm dần</option>
                  <option value="asc">⬆️ Tăng dần</option>
                </select>
              </div>
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
