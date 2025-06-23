"use client";

import { useMovieDetail } from "@/components/provider/movie-detail-context";
import { Heart, MoreVertical, Play, Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

export default function MovieDetailPage() {
  const { movieDetail } = useMovieDetail();
  const params = useParams();
  const id = params.id as string;

  if (!movieDetail || !movieDetail.movie) {
    return notFound();
  }

  const movie = movieDetail.movie;
  const episodes = movieDetail.episodes || [];

  return (
    <>
      <div
        className="bg-cover bg-center bg-no-repeat md:h-[600px] h-[600px] rounded-bl-2xl relative"
        style={{
          backgroundImage: `url(${movie.thumb_url})`,
        }}
      >
        <div className="bg-gradient-to-br from-transparent to-black/70 h-full rounded-bl-2xl">
          <div className="flex flex-col md:flex-row items-center left-[5%] tw-absolute-center-horizontal w-full h-full px-[5%]">
            <div className="flex gap-5 items-center">
              <div className="shrink-0 w-[185px] ml-3 md:ml-0">
                <div className="relative w-full aspect-[2/3]">
                  <Image
                    src={`${movie.poster_url}`}
                    alt={movie.name}
                    title={movie.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="flex-grow md:ml-14 ml-6 mt-6 md:mt-0">
              <div className="md:h-28 flex items-end">
                <h1 className="text-white text-[45px] font-bold leading-tight">
                  {movie.name}
                </h1>
              </div>

              <ul className="flex gap-3 flex-wrap md:mt-7 mt-3">
                {movie.category?.map((genre: any) => (
                  <Link
                    key={genre.id}
                    href={`/explore?genre=${encodeURIComponent(genre.id)}`}
                    className="md:px-5 px-3 md:py-2 py-1 rounded-full uppercase font-medium border border-gray-300 md:text-white hover:brightness-75 transition duration-300"
                  >
                    {genre.name}
                  </Link>
                ))}
              </ul>
              {movie.content && (
                <>
                  <h4>Nội dung phim</h4>
                  <p className="text-white/90 text-lg mt-5">
                    {movie.content.length > 200
                      ? `${movie.content.slice(0, 200)}...`
                      : movie.content}
                  </p>
                </>
              )}
            </div>

            <Link
              href={`/movie/${id}/watch?episode=${episodes[0]?.server_data[0]?.slug}`}
              className="flex gap-6 items-center pl-6 pr-12 py-3 rounded-full bg-primary text-white hover:bg-blue-600 transition duration-300 mt-24"
            >
              <Play className="h-6 w-6 fill-white" />
              <span className="text-lg font-medium">XEM PHIM</span>
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

      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-2">
          {episodes.length > 0 && (
            <section className="px-[5%] py-10">
              <h2 className="text-2xl font-bold text-white mb-5">Danh sách tập</h2>
              <div className="grid grid-cols-5 gap-2">
                {episodes[0]?.server_data?.map((episode: any, idx: number) => (
                  <div
                    key={episode.slug || idx}
                    className="p-4 bg-primary text-center hover:bg-purple-600 rounded-md"
                  >
                    <Link
                      href={`/movie/${id}/watch?episode=${episode.slug}`}
                      className=" text-white rounded text-center py-2 transition"
                    >
                      {episode.name}
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
