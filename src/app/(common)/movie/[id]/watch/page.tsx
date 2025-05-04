import { WatchPlayer } from "@/components/watch-player";

type Props = {
  params: {
    id: string;
    season?: string;
    episode?: string;
  };
};

export default function WatchTVPage({ params}: Props) {
  const id = Number(params.id);
  const season = params.season ? Number(params.season) : 1;
  const episode = params.episode ? Number(params.episode) : 1;
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-white mb-4">Now Watching</h1>
      <WatchPlayer id={id} type="movie" season={season} episode={episode} />
    </div>
  );
}
