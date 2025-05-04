"use client";
import { useGenres } from "@/components/provider/genre-context/genre-context";
import { SeasonBrowser } from "@/components/season-browser";
import { getSeasonDetail, getSimilarTV, getTVDetail } from "@/libs/tmdb";
import { useQuery } from "@tanstack/react-query";
import { Heart, MoreVertical, Play, Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";

type Props = {
  params: {
    id: string;
  };
};
type Params = {
  id: string;
};
export default function TVDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = use(params);
  const parsedId = Number(id);
  const { data: movie, isLoading } = useQuery({
    queryKey: ["movieDetail", id],
    queryFn: () => getTVDetail(id),
    staleTime: 1000 * 60 * 10, // cache 10 phút
  });

  console.log("movie", movie);
  const { data: similarMovies = [] } = useQuery({
    queryKey: ["similarMovies", id],
    queryFn: () => getSimilarTV(id),
    staleTime: 1000 * 60 * 10,
  });

  const [activeSeason, setActiveSeason] = useState(1);
  const { data: seasonDetail } = useQuery({
    queryKey: ["seasonDetail", parsedId, activeSeason],
    queryFn: () => getSeasonDetail(parsedId, activeSeason),
    enabled: !isLoading,
    staleTime: 1000 * 60 * 10,
  });

  
  if (isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <p className="text-white text-xl">Loading movie details...</p>
      </div>
    );
  }
  // If movie not found, show error
  if (!movie) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold mb-4">
            Movie not found
          </h1>
          <p className="text-gray-400 mb-6">
            The movie you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-white py-2 px-6 rounded-full"
          >
            Go back to home
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      <div
        className="bg-cover bg-center bg-no-repeat md:h-[600px] h-[600px] rounded-bl-2xl relative"
        style={{
          backgroundImage: `url(${`https://image.tmdb.org/t/p/original${movie.backdrop_path}`})`,
        }}
      >
        <div className="bg-gradient-to-br from-transparent to-black/70 h-full rounded-bl-2xl">
          <div className="flex flex-col md:flex-row items-center left-[5%] tw-absolute-center-horizontal w-full h-full px-[5%]">
            <div className="flex gap-5 items-center">
              <div className="shrink-0 w-[185px] ml-3 md:ml-0">
                <div className="relative w-full aspect-[2/3]">
                  <Image
                    // src={movie.posterPath}
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    title={movie.title || movie.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="flex-grow md:ml-14 ml-6 mt-6 md:mt-0">
              <div className="md:h-28 flex items-end">
                <h1 className="text-white text-[45px] font-bold leading-tight">
                  {movie.title || movie.name}
                </h1>
              </div>

              <ul className="flex gap-3 flex-wrap md:mt-7 mt-3">
                {movie.genres?.map((genre: any) => {
                  return (
                    <Link
                      key={genre.id}
                      href={`/explore?genre=${encodeURIComponent(genre.id)}`}
                      className="md:px-5 px-3 md:py-2 py-1 rounded-full uppercase font-medium border border-gray-300 md:text-white hover:brightness-75 transition duration-300"
                    >
                      {genre.name}
                    </Link>
                  );
                })}
              </ul>
              {movie.overview && (
                <>
                  <h4>Overview</h4>
                  <p className="text-white/90 text-lg mt-5">
                    {movie.overview.length > 200
                      ? `${movie.overview.slice(0, 200)}...`
                      : movie.overview}
                  </p>
                </>
              )}
            </div>

            <Link
              href={`/tv/${id}/watch?season=1&episode=1`}
              className="flex gap-6 items-center pl-6 pr-12 py-3 rounded-full bg-primary text-white hover:bg-blue-600 transition duration-300 mt-24"
            >
              <Play className="h-6 w-6 fill-white" />
              <span className="text-lg font-medium">WATCH</span>
            </Link>
          </div>

          <div className="flex gap-3 absolute top-[5%] right-[3%]">
            <button className="tw-flex-center h-12 w-12 rounded-full border-[3px] border-white shadow-lg hover:border-primary transition duration-300 group">
              <Heart className="h-5 w-5 text-white" />
            </button>
            <button className="tw-flex-center h-12 w-12 rounded-full border-[3px] border-white shadow-lg hover:border-primary transition duration-300 group">
              <Share className="h-5 w-5 text-white" />
            </button>
            <button className="tw-flex-center h-12 w-12 rounded-full border-[3px] border-white shadow-lg hover:border-primary transition duration-300 group">
              <MoreVertical className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
      {movie.seasons && movie.seasons.length > 0 && (
        <SeasonBrowser tvId={movie.id} seasons={movie.seasons} />
      )}
    </>
  );
}
