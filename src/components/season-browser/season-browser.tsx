import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SeasonBrowserProps {
  tvId: number;
  seasons: any[];
}

const SEASONS_PER_PAGE = 9;

export default function SeasonBrowser({ tvId, seasons }: SeasonBrowserProps) {
  const filteredSeasons = seasons.filter((s) => s.season_number !== 0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSeason, setActiveSeason] = useState<number>(
    seasons[0]?.season_number || 1
  );

  const startIndex = (currentPage - 1) * SEASONS_PER_PAGE;
  const endIndex = startIndex + SEASONS_PER_PAGE;
  const paginatedSeasons = seasons.slice(startIndex, endIndex);

  const totalPages = Math.ceil(seasons.length / SEASONS_PER_PAGE);

  // const { data: seasonDetail } = useQuery({
  //   queryKey: ["seasonDetail", tvId, activeSeason],
  //   queryFn: () => getSeasonDetail(tvId),
  //   enabled: !!tvId,
  //   staleTime: 1000 * 60 * 10,
  // });

  return (
    <>
      <div className="mt-10">
        <h2 className="text-white font-bold text-xl mb-4">Seasons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedSeasons.map((season: any) => (
            <Link
              key={season.id}
              href={`/tv/${tvId}/season/${season.season_number}`}
              className="bg-dark-lighten rounded-lg p-4 shadow-lg hover:bg-dark-darken transition duration-300 hover:bg-[hsla(0,0%,100%,0.1)]"
            >
              <div className="flex gap-4">
                <div className="relative w-[100px] h-[150px] shrink-0">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                    alt={season.name}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-white text-lg font-semibold">
                      {season.season_number === 0
                        ? "Specials"
                        : season.name || `Season ${season.season_number}`}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Air Date: {season.air_date || "N/A"}
                    </p>
                    <div className="text-sm text-gray-300">
                      Tập phim: {season.episode_count}
                    </div>
                  </div>
                  {season.overview && (
                    <p className="text-sm text-white/80 mt-3">
                      {season.overview.length > 100
                        ? season.overview.slice(0, 100) + "..."
                        : season.overview}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 rounded bg-dark-darken text-white disabled:opacity-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <p className="text-white">
              Page {currentPage} of {totalPages}
            </p>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 rounded bg-dark-darken text-white disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-12 bg-dark-lighten p-6 rounded-lg">
        <h2 className="text-white font-bold text-xl mb-4">Related Movies</h2>

        <div className="flex flex-wrap gap-3 mb-6">
          {seasons.map((season: any) => (
            <button
              key={season.id}
              className={`w-32 text-center px-4 py-2 rounded cursor-pointer ${
                activeSeason === season.season_number
                  ? "bg-primary text-white"
                  : "bg-dark-darken text-gray-300"
              }`}
              onClick={() => setActiveSeason(season.season_number)}
            >
              {season.season_number === 0
                ? "Specials"
                : `Season ${season.season_number}`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* <div
            className={cn(
              "col-span-12",
              seasonDetail?.overview ? "md:col-span-5" : ""
            )}
          >
            <div className="bg-dark-darken rounded-lg p-4">
              <h3 className="text-white font-bold mb-4">Danh sách tập phim</h3>
              <div className="grid grid-cols-5 gap-2">
                {seasonDetail?.episodes?.map((ep: any) => (
                  <Link
                    key={ep.id}
                    href={`/tv/${tvId}/watch?season=${activeSeason}&episode=${ep.episode_number}`}
                    className="bg-primary text-white rounded text-center py-2 hover:bg-purple-600 transition"
                  >
                    {ep.episode_number}
                  </Link>
                ))}
              </div>
            </div>
          </div> */}

          {/* {seasonDetail?.overview && (
            <div className="col-span-12 md:col-span-7">
              <div className="bg-dark-darken rounded-lg p-4">
                <h3 className="text-white font-bold mb-4">Content</h3>
                <p className="text-white/80 text-base leading-relaxed">
                  {seasonDetail?.overview || "Không có mô tả cho phần này."}
                </p>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}
