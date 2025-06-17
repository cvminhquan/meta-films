"use client";
import { useGenres } from "@/components/provider/genre-context/genre-context";
import { getMovieDetail } from "@/libs/phimapi";
import { MovieItem } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import { Heart, MoreVertical, Play, Share } from "lucide-react";
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
  
  const { data, isLoading } = useQuery({
    queryKey: ["movieDetail", id],
    queryFn: () => getMovieDetail(id),
    staleTime: 1000 * 60 * 10, // cache 10 minutes
  });

  // data might include a nested movie object and episodes.
  const movieDetail = (data?.movie || data) as unknown as MovieItem;
  console.log(movieDetail);
  const episodes = data?.episodes || [];
  const genreMap = useGenres();
  
  if (isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <p className="text-white text-xl">Loading movie details...</p>
      </div>
    );
  }
  
  if (!movieDetail) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold mb-4">Movie not found</h1>
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
          backgroundImage: `url(${(movieDetail as any).thumb_url})`,
        }}
      >
        <div className="bg-gradient-to-br from-transparent to-black/70 h-full rounded-bl-2xl">
          <div className="flex flex-col md:flex-row items-center left-[5%] tw-absolute-center-horizontal w-full h-full px-[5%]">
            <div className="flex gap-5 items-center">
              <div className="shrink-0 w-[185px] ml-3 md:ml-0">
                <div className="relative w-full aspect-[2/3]">
                  <Image
                    src={`${movieDetail.poster_url}`}
                    alt={movieDetail.name}
                    title={movieDetail.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="flex-grow md:ml-14 ml-6 mt-6 md:mt-0">
              <div className="md:h-28 flex items-end">
                <h1 className="text-white text-[45px] font-bold leading-tight">
                  {movieDetail.name}
                </h1>
              </div>

              <ul className="flex gap-3 flex-wrap md:mt-7 mt-3">
                {movieDetail.category?.map((genre: any) => (
                  <Link
                    key={genre.id}
                    href={`/explore?genre=${encodeURIComponent(genre.id)}`}
                    className="md:px-5 px-3 md:py-2 py-1 rounded-full uppercase font-medium border border-gray-300 md:text-white hover:brightness-75 transition duration-300"
                  >
                    {genre.name}
                  </Link>
                ))}
              </ul>
              {movieDetail.content && (
                <>
                  <h4>Description</h4>
                  <p className="text-white/90 text-lg mt-5">
                    {movieDetail.content.length > 200
                      ? `${movieDetail.content.slice(0, 200)}...`
                      : movieDetail.content}
                  </p>
                </>
              )}
            </div>

            <Link
              href={`/movie/${id}/watch`}
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

      {/* Render episodes if the movie type is series */}
      {movieDetail.type === "series" && episodes.length > 0 && (
        <section className="px-[5%] py-10">
          <h2 className="text-2xl font-bold text-white mb-5">Episodes</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {episodes.map((episode: any) => (
              <li key={episode.slug} className="p-4 bg-gray-800 rounded-md">
                <h3 className="text-white text-lg mb-2">{episode.name}</h3>
                <p className="text-gray-300 text-sm">{episode.filename}</p>
                <Link
                  href={`/movie/${id}/watch/${episode.slug}`}
                  className="inline-block mt-2 bg-primary text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300"
                >
                  Watch Episode
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
