"use client"
import { useMovieDetail } from "@/components/provider/movie-detail-context";
import { WatchPlayerWithServers } from "@/components/watch-player-with-servers/watch-player-with-servers";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function WatchTVPage() {
  const { movieDetail } = useMovieDetail();
  const [currentEpisode, setCurrentEpisode] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const episode = searchParams.get("episode");
  const pathname = usePathname();

  const pathSegments = pathname.split('/');
  const movieSlug = pathSegments[2];

  const episodes = movieDetail?.episodes || [];

  console.log('currentEpisode', currentEpisode)
  useEffect(() => {
    if (!movieDetail) return;

    if (movieDetail.episodes && episode) {
      const allEpisodes = movieDetail.episodes[0]?.server_data || [];
      const foundEpisode = allEpisodes.find((ep: any) => ep.slug === episode);
      setCurrentEpisode(foundEpisode);
    }
    setIsLoading(false);
  }, [movieDetail, episode]);

  if (isLoading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-lg">Đang tải...</div>
        </div>
      </div>
    );
  }

  if (!currentEpisode) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-lg">Không tìm thấy tập phim</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-white mb-4">
        {movieDetail?.movie?.name} - {currentEpisode.name}
      </h1>

      <WatchPlayerWithServers src={currentEpisode.link_embed} />
      <section className="px-[5%] py-10">
        <h2 className="text-2xl font-bold text-white mb-5">Danh sách tập</h2>
        <div className="grid grid-cols-5 gap-2">
          {episodes[0]?.server_data?.map((ep: any, idx: number) => (
            <div
              key={ep.slug || idx}
              className={`p-4 text-center rounded-md transition ${
                episode === ep.slug
                  ? 'bg-purple-800'
                  : 'bg-primary hover:bg-purple-600'
              }`}
            >
              <Link
                href={`/movie/${movieSlug}/watch?episode=${ep.slug}`}
                className=" text-white rounded text-center py-2"
              >
                {ep.name}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
