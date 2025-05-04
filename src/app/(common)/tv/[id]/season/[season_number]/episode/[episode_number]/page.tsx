import { getEpisodeDetail } from "@/libs/tmdb";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
    season_number: string;
    episode_number: string;
  };
};

export default async function EpisodeDetailPage({ params }: Props) {
  const tvId = Number(params.id);
  const seasonNumber = Number(params.season_number);
  const episodeNumber = Number(params.episode_number);

  const episode = await getEpisodeDetail(tvId, seasonNumber, episodeNumber);
  if (!episode) return notFound();

  return (
    <div className="px-4 md:px-8 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-4">
        {episode.episode_number}. {episode.name}
      </h1>
      <p className="text-gray-400 mb-4 text-sm">
        {episode.air_date} • {episode.runtime} min
      </p>

      <div className="relative w-full h-[300px] rounded-lg overflow-hidden mb-6">
        <Image
          src={
            episode.still_path
              ? `https://image.tmdb.org/t/p/w780${episode.still_path}`
              : "/no-image.png"
          }
          alt={episode.name}
          fill
          className="object-cover"
        />
      </div>

      <p className="text-white text-lg">{episode.overview}</p>
    </div>
  );
}
