"use client";
import OptimizedVideoPlayer from "@/components/optimized-video-player/optimized-video-player";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface WatchComponentProps {
  movie: any;
}

export default function WatchComponent ({ movie }: WatchComponentProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const episode = searchParams.get("episode");
  const movieSlug = pathname.split("/")[2];

  // Memoize data để tránh re-calculation
  const episodes = movie?.episodes || [];
  const allEpisodes = episodes[0]?.server_data || [];

  const [currentEpisode, setCurrentEpisode] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset states
    setIsLoading(true);
    setError(null);
    setCurrentEpisode(null);

    // Validate movie data
    if (!movie || !movie.episodes || !Array.isArray(movie.episodes)) {
      setError("Dữ liệu phim không hợp lệ");
      setIsLoading(false);
      return;
    }

    // Get episodes data
    const serverData = movie.episodes[0]?.server_data;
    if (!serverData || !Array.isArray(serverData) || serverData.length === 0) {
      setError("Không có tập phim nào");
      setIsLoading(false);
      return;
    }

    let foundEpisode = null;

    if (episode) {
      // Tìm episode theo slug (exact match)
      foundEpisode = serverData.find((ep: any) => ep.slug === episode);

      if (!foundEpisode) {
        // Thử tìm theo name hoặc filename
        foundEpisode = serverData.find((ep: any) =>
          ep.name?.toLowerCase().includes(episode.toLowerCase()) ||
          ep.filename?.toLowerCase().includes(episode.toLowerCase())
        );
      }
    }

    // Nếu không tìm thấy hoặc không có episode param, dùng tập đầu tiên
    if (!foundEpisode) {
      foundEpisode = serverData[0];
    }

    // Validate episode data
    if (!foundEpisode || !foundEpisode.link_m3u8) {
      setError("Tập phim không có link video");
      setIsLoading(false);
      return;
    }

    setCurrentEpisode(foundEpisode);
    setIsLoading(false);
  }, [movie, episode]);

  // Loading state
  if (isLoading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-lg">Đang tải video...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !currentEpisode) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="text-white text-lg text-center">
            {error || "Không thể tải tập phim"}
          </div>

          {/* Show available episodes if any */}
          {allEpisodes.length > 0 && (
            <div className="text-center">
              <p className="text-white/70 mb-4">Các tập có sẵn:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {allEpisodes.slice(0, 5).map((ep: any, idx: number) => (
                  <Link
                    key={ep.slug || idx}
                    href={`/movie/${movieSlug}/watch?episode=${ep.slug}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                  >
                    {ep.name}
                  </Link>
                ))}
                {allEpisodes.length > 5 && (
                  <span className="text-white/70 text-sm">...</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Video Player */}
      <div className="relative">
        {currentEpisode.link_m3u8 ? (
          <OptimizedVideoPlayer
            m3u8Url={currentEpisode.link_m3u8}
            title={currentEpisode.name || currentEpisode.filename}
          />
        ) : (
          <div className="w-full pb-[56.25%] h-0 bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white">Không có link video cho tập này</p>
            </div>
          </div>
        )}
      </div>

      {/* Episode List */}
      {allEpisodes.length > 0 && (
        <section className="px-[5%] py-10">
          <h2 className="text-2xl font-bold text-white mb-5">
            Danh sách tập ({allEpisodes.length} tập)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {allEpisodes.map((ep: any, idx: number) => (
              <div
                key={ep.slug || idx}
                className={`p-3 text-center rounded-md transition ${
                  episode === ep.slug
                    ? "bg-purple-800 ring-2 ring-purple-400"
                    : "bg-gray-700 hover:bg-purple-600"
                }`}
              >
                <Link
                  href={`/movie/${movieSlug}/watch?episode=${ep.slug}`}
                  className="text-white block py-2 text-sm font-medium"
                  title={ep.filename}
                >
                  {ep.name}
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Debug info - chỉ hiện trong development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="px-[5%] py-4">
          <details className="bg-gray-800 p-4 rounded">
            <summary className="text-white cursor-pointer">Debug Info</summary>
            <pre className="text-white text-xs mt-2 overflow-auto">
              {JSON.stringify({
                currentEpisode: currentEpisode ? {
                  name: currentEpisode.name,
                  slug: currentEpisode.slug,
                  hasM3u8: !!currentEpisode.link_m3u8
                } : null,
                episodeParam: episode,
                totalEpisodes: allEpisodes.length
              }, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};
