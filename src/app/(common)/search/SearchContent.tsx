"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { movieClient } from "@/lib/api/client/movieClient.api";
import FilmCard from "@/components/film-cards/FilmCard";
import { Movie } from "@/types/movie";
import Link from "next/link";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState<"all" | "movie" | "tv" | "people">(
    "all"
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);


  const { data: results, isLoading } = useQuery({
    queryKey: ["search", query, activeTab],
    queryFn: async () => {
      if (!query) return [];

      try {
        switch (activeTab) {
          case "movie":
            return await movieClient.searchMovies(query);
          case "tv":
            return await movieClient.searchTVShows(query);
          case "people":
            return await movieClient.searchPeople(query);
          case "all":
          default:
            return await movieClient.searchMulti(query);
        }
      } catch (error) {
        console.error("Search error:", error);
        return [];
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
              {[
                { label: "All", value: "all" },
                { label: "Movie", value: "movie" },
                { label: "TV Show", value: "tv" },
                { label: "Actor", value: "people" },
              ].map((tab) => (
                <li
                  key={tab.value}
                  className={`relative px-4 py-2 cursor-pointer transition-all duration-200
                    ${
                      activeTab === tab.value
                        ? "text-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-[2px] after:bg-primary after:rounded-full"
                        : "hover:text-primary text-gray-400"
                    }`}
                  onClick={() =>
                    setActiveTab(tab.value as "all" | "movie" | "tv" | "people")
                  }
                >
                  {tab.label}
                </li>
              ))}
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
            {isLoading ? (
              <p className="text-white text-center">Loading...</p>
            ) : filteredResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[300px]">
                <h3 className="text-white text-2xl font-medium mb-2">
                  No results found
                </h3>
                <p className="text-gray-400">
                  Try searching for something else
                </p>
              </div>
            ) : activeTab === "people" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {filteredResults.map((person: any) => (
                  <div key={person.id} className="text-white">
                    <div className="relative aspect-[2/3] overflow-hidden rounded-md">
                      <Image
                        src={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                            : "/no-image.png"
                        }
                        alt={person.name}
                        fill
                      className="object-cover rounded-md"
                      />
                    </div>
                    <h3 className="mt-2 text-sm font-medium truncate">
                      {person.name}
                    </h3>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {filteredResults.map((item: Movie) => (
                  <Fragment key={item.id}>
                    <FilmCard
                      movie={item}
                      type={activeTab === "all" ? item.media_type as "movie" | "tv" | "series" : activeTab}
                    />
                  </Fragment>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
