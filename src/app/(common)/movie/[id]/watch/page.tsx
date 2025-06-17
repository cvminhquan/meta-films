import { WatchPlayerWithServers } from "@/components/watch-player-with-servers/watch-player-with-servers";
import { getMovieDetail } from "@/libs/phimapi";

type Props = {
  params: {
    id: string;
  };
};

export default async function WatchTVPage({ params }: any) {
  const parsedId = params.id;
  
  const tvDetail = await getMovieDetail(parsedId);
  console.log("TV Detail:", tvDetail);
  return (
    <div className="p-4 md:p-8">
      {/* <h1 className="text-2xl font-bold text-white mb-4">
        {tvDetail.name || tvDetail.original_title}
      </h1> */}

      <WatchPlayerWithServers id={parsedId} type="movie" />
    </div>
  );
}
