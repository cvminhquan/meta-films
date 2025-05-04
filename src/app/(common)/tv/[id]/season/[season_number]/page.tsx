import { getSeasonDetail } from "@/libs/tmdb";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
    season_number: string;
  };
};

export default async function SeasonDetailPage({ params }: any) {
  const id = Number(params.id);
  const seasonNumber = Number(params.season_number);

  const season = await getSeasonDetail(id, seasonNumber);
  if (!season) return notFound();

  return (
    <div className="px-4 md:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-6">{season.name}</h1>
      <p className="text-gray-400 mb-10">{season.overview}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {season.episodes.map((episode: any) => (
          <Link
            href={`/tv/${id}/season/${seasonNumber}/episode/${episode.episode_number}`}
            key={episode.id}
            className="bg-dark-lighten rounded-lg overflow-hidden shadow-md hover:bg-dark-darken transition duration-300"
          >
            <div className="relative w-full h-[200px]">
              <Image
                src={
                  episode.still_path
                    ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                    : "/no-image.png"
                }
                alt={episode.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-white text-lg font-bold mb-1">
                {episode.episode_number}. {episode.name}
              </h2>
              <p className="text-sm text-gray-400">
                {episode.air_date} • {episode.runtime || 0} min
              </p>
              <p className="text-gray-300 mt-2 text-sm line-clamp-3">
                {episode.overview}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
