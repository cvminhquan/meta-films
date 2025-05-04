"use client";
import { useGenres } from "@/components/provider/genre-context/genre-context";
import { Button } from "@/components/ui/button";
import { getMovieDetail, getSimilarMovies, getSimilarTV, getTVDetail } from "@/libs/tmdb";
import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import { Heart, MoreVertical, Play, Share, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

type Props = {
  params: {
    id: string;
  };
};
type Params = {
  id: string;
};
export default function MovieDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = use(params);
  const parsedId = Number(id);
  const { data: movie, isLoading } = useQuery({
    queryKey: ["movieDetail", id],
    queryFn: () => getMovieDetail(id),
    staleTime: 1000 * 60 * 10, // cache 10 phút
  });

  console.log("movie", movie);
  const { data: similarMovies = [] } = useQuery({
    queryKey: ["similarMovies", id],
    queryFn: () => getSimilarMovies(id),
    staleTime: 1000 * 60 * 10,
  });

  const genreMap = useGenres();
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
              href={`/movie/${id}/watch?season=1&episode=1`}
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
        <div className="mt-10">
          <h2 className="text-white font-bold text-xl mb-4">Seasons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movie.seasons
              .filter((season: any) => season.season_number !== 0) // Bỏ season specials
              .map((season: any) => (
                <Link
                  key={season.id}
                  href={`/tv/${movie.id}/season/${season.season_number}`}
                  className="bg-dark-lighten rounded-lg p-4 shadow-lg hover:bg-dark-darken transition duration-300"
                >
                  <div className="flex gap-4">
                    <div className="relative w-[100px] h-[150px] shrink-0">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                        alt={season.name}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-white text-lg font-semibold">
                          {season.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Air Date: {season.air_date || "N/A"}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Episodes: {season.episode_count}
                        </p>
                      </div>
                      {season.overview && (
                        <p className="text-sm text-white/80 mt-3">
                          {season.overview.length > 100
                            ? season.overview.slice(0, 100) + "..."
                            : season.overview}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}

      {/* <div className="flex z-20 relative flex-col md:flex-row mt-32 md:mt-0">
       
        <div className="shrink-0 md:max-w-[150px] w-full flex items-center md:flex-col justify-center flex-row gap-20 mt-20 md:border-r border-dark-lighten pt-16">
          <div className="flex flex-col gap-6 items-center">
            <p className="text-white font-medium text-lg">RATING</p>
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl font-bold text-white">
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  strokeWidth="4"
                  fill="none"
                  stroke="#1f2937"
                  className="opacity-25"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  strokeWidth="4"
                  fill="none"
                  stroke="#4d6ec1"
                  strokeLinecap="round"
                  strokeDasharray={`${175 * (movie.rating / 10)} 175`}
                  className="opacity-75"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-center">
            <p className="text-white font-medium text-lg">EP LENGTH</p>
            <div className="flex gap-2 items-center">
              <p className="text-2xl">{movie.runtime || "60"}</p>
              <span>min</span>
            </div>
          </div>
        </div>

        <div className="flex-grow min-h-[500px] md:border-r border-dark-lighten md:px-16 px-5 md:py-7 pt-40">
          <ul className="flex gap-10 text-gray-400 text-lg justify-center">
            <li>
              <button className="hover:text-white transition duration-300 pb-1 font-medium -translate-y-2 border-b-2 border-primary text-white">
                Overall
              </button>
            </li>
            <li>
              <button className="hover:text-white transition duration-300 pb-1">
                Cast
              </button>
            </li>
            <li>
              <button className="hover:text-white transition duration-300 pb-1">
                Reviews
              </button>
            </li>
            <li>
              <button className="hover:text-white transition duration-300 pb-1">
                Seasons
              </button>
            </li>
          </ul>

          <div className="mt-10 text-lg">
            <p className="text-xl italic mb-8 text-white text-center">
              Every path has a price.
            </p>

            <p className="text-white font-medium mb-3">STORY</p>
            <p className="text-gray-400">{movie.overview}</p>

            <p className="text-white font-medium mt-8 mb-3">DETAILS</p>
            <p className="text-gray-400">Status: Returning Series</p>
            <p className="text-gray-400">Last air date: {movie.releaseDate}</p>
            <p className="text-gray-400">Spoken language: English</p>
          </div>
        </div>

        <div className="shrink-0 md:max-w-[300px] w-full px-6 pt-6">
          <p className="text-white font-medium text-lg mb-5">Similar</p>
          <ul className="flex flex-col gap-5">
            {similarMovies.map((similarMovie: Movie) => (
              <li key={similarMovie.id}>
                <Link
                  href={`/tv/${similarMovie.id}`}
                  className="hover:brightness-75 transiton duration-300 flex gap-5 items-center"
                >
                  <div className="shrink-0 max-w-[100px] w-full">
                    <div className="relative w-full aspect-[2/3]">
                      <Image
                        src={`https://image.tmdb.org/t/p/original${similarMovie.poster_path}`}
                        alt={similarMovies.title || similarMovies.name}
                        title={similarMovies.title || similarMovies.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <p className="text-white mb-3 text-lg">
                      {similarMovies.title || movie.name}
                    </p>
                    <p className="mb-8 text-gray-400">
                      {similarMovies.release_date}
                    </p>
                    <div className="inline-flex gap-2 items-center px-3 py-[2px] rounded-full text-primary border border-primary text-sm">
                      <span>
                        {similarMovie?.vote_average?.toFixed(1) || "0.0"}
                      </span>
                      <Star className="h-4 w-4 fill-primary" />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <Button
            variant="outline"
            className="w-full mt-7 text-white hover:bg-dark-lighten-2 transition duration-300 rounded-full"
          >
            See more
          </Button>
        </div>
      </div> */}
    </>
  );
}
