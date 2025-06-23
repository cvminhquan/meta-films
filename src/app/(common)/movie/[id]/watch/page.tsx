import ClientWatchWrapper from "@/components/client-wrapper/client-wrapper";
import { getMovieDetail } from "@/libs/phimapi";
import { ParamsPageType } from "@/types/common";
import { notFound } from "next/navigation";

export default async function WatchMoviePage({
  params,
}: {
  params: ParamsPageType;
}) {
  const id = params.id;
  const movieDetail = await getMovieDetail(id);

  if (!movieDetail) {
    notFound();
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-white mb-4">
        {movieDetail?.movie?.name}
      </h1>

      <ClientWatchWrapper movie={movieDetail} />
    </div>
  );
}
