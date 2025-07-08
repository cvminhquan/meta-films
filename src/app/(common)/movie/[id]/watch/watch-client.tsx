"use client";

import OptimizedVideoPlayer from "@/components/optimized-video-player/optimized-video-player";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface WatchClientProps {
  movieDetail: any;
  allEpisodes: any[];
  movieSlug: string;
}

export default function WatchClient({ movieDetail, allEpisodes, movieSlug }: WatchClientProps) {
  const searchParams = useSearchParams();
  const episode = searchParams.get("episode");

  const [currentEpisode, setCurrentEpisode] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Memoize episode finding logic
  const foundEpisode = useMemo(() => {
    if (!allEpisodes || allEpisodes.length === 0) {
      return null;
    }

    let found = null;

    if (episode) {
      // Tìm episode theo slug
      found = allEpisodes.find((ep: any) => ep.slug === episode);

      if (!found) {
        // Thử tìm theo name hoặc filename
        found = allEpisodes.find((ep: any) =>
          ep.name?.toLowerCase().includes(episode.toLowerCase()) ||
          ep.filename?.toLowerCase().includes(episode.toLowerCase())
        );
      }
    }

    // Nếu không tìm thấy hoặc không có episode param, dùng tập đầu tiên
    if (!found) {
      found = allEpisodes[0];
    }

    return found;
  }, [episode, allEpisodes]);

  useEffect(() => {
    setError(null);
    setCurrentEpisode(null);

    if (!allEpisodes || allEpisodes.length === 0) {
      setError("Không có tập phim nào");
      return;
    }

    // Validate episode data
    if (!foundEpisode || !foundEpisode.link_m3u8) {
      setError("Tập phim không có link video");
      return;
    }

    setCurrentEpisode(foundEpisode);
  }, [foundEpisode, allEpisodes]);

  // Error state
  if (error || !currentEpisode) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center h-64 bg-gray-800 rounded-lg">
          <div className="text-white text-lg text-center mb-4">
            {error || "Không thể tải tập phim"}
          </div>
          
          {/* Show available episodes if any */}
          {allEpisodes.length > 0 && (
            <div className="text-center">
              <p className="text-gray-400 mb-4">Các tập có sẵn:</p>
              <div className="flex flex-wrap gap-2 justify-center max-w-md">
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
                  <span className="text-gray-400 text-sm">...</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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

      {/* Episode Info */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-white mb-2">
          Đang xem: {currentEpisode.name}
        </h2>
        <p className="text-gray-400 text-sm">
          {currentEpisode.filename}
        </p>
      </div>

      {/* Episode List */}
      {allEpisodes.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Danh sách tập ({allEpisodes.length} tập)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            {allEpisodes.map((ep: any, idx: number) => (
              <Link
                key={ep.slug || idx}
                href={`/movie/${movieSlug}/watch?episode=${ep.slug}`}
                className={`p-3 text-center rounded-lg transition-all duration-200 ${
                  episode === ep.slug
                    ? "bg-blue-600 text-white ring-2 ring-blue-400 shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
                title={ep.filename}
              >
                <div className="font-medium text-sm">
                  {ep.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Movie Info */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Thông tin phim</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Thể loại:</span>
            <span className="text-white ml-2">{movieDetail.movie.type}</span>
          </div>
          <div>
            <span className="text-gray-400">Trạng thái:</span>
            <span className="text-white ml-2">{movieDetail.movie.status}</span>
          </div>
          <div>
            <span className="text-gray-400">Chất lượng:</span>
            <span className="text-white ml-2">{movieDetail.movie.quality}</span>
          </div>
          <div>
            <span className="text-gray-400">Ngôn ngữ:</span>
            <span className="text-white ml-2">{movieDetail.movie.lang}</span>
          </div>
        </div>
        
        {movieDetail.movie.content && (
          <div className="mt-4">
            <h4 className="text-gray-400 mb-2">Nội dung:</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {movieDetail.movie.content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
