import { WatchPlayerWithServers } from "@/components/watch-player-with-servers/watch-player-with-servers";
import { getTVDetail } from "@/libs/phimapi";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    season?: string;
    episode?: string;
  };
};

export default async function WatchTVPage({ params, searchParams }: any) {
  const parsedId = Number(params.id);
  const season = searchParams.season ? Number(searchParams.season) : 1;
  const episode = searchParams.episode ? Number(searchParams.episode) : 1;

  const tvDetail = await getTVDetail(parsedId);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-white mb-4">
        {tvDetail.name}
        {searchParams.season &&
          ` - Season: ${season == 0 ? "Specials" : season}`}
        {searchParams.episode && ` - Episode: ${episode}`}
      </h1>

      <WatchPlayerWithServers
        id={parsedId}
        type="tv"
        season={season}
        episode={episode}
      />
    </div>
  );
}
