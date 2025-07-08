import ClientWatchWrapper from "@/components/client-wrapper/client-wrapper";
import WatchLoading from "@/components/watch-loading/watch-loading";
import { getMovieDetail } from "@/libs/phimapi";
import { ParamsPageType } from "@/types/common";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";

// Cache the movie detail function to avoid duplicate API calls
const getCachedMovieDetail = cache(getMovieDetail);

export default async function WatchMoviePage({
  params,
}: {
  params: Promise<ParamsPageType>;
}) {
  const { id } = await params;
  const movieDetail = await getCachedMovieDetail(id);

  if (!movieDetail) {
    notFound();
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-white mb-4">
        {movieDetail?.movie?.name}
      </h1>

      <Suspense fallback={<WatchLoading />}>
        <ClientWatchWrapper movie={movieDetail} />
      </Suspense>
    </div>
  );
}
