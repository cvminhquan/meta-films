import { getMovieDetail } from "@/libs/phimapi";
import { ParamsPageType } from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

// Cache the movie detail function to avoid duplicate API calls
const getCachedMovieDetail = cache(getMovieDetail);

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<ParamsPageType>;
}) {
  const { id } = await params;
  const movieDetail = await getCachedMovieDetail(id);

  if (!movieDetail) {
    return {
      title: "Phim không tồn tại",
    };
  }

  return {
    title: `${movieDetail.movie.name} (${movieDetail.movie.year}) - ${movieDetail.movie.origin_name}`,
    description: movieDetail.movie.content || `Xem phim ${movieDetail.movie.name} chất lượng ${movieDetail.movie.quality} vietsub`,
    openGraph: {
      title: movieDetail.movie.name,
      description: movieDetail.movie.content,
      images: [movieDetail.movie.poster_url],
    },
  };
}

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<ParamsPageType>;
}) {
  const { id } = await params;
  const movieDetail = await getCachedMovieDetail(id);
  if (!movieDetail) {
    notFound();
  }
  const episodes = movieDetail.episodes || [];
  const movieData = movieDetail.movie;
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div
        className="relative h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${movieData.thumb_url})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Poster */}
            <div className="shrink-0">
              <div className="relative w-[200px] h-[300px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={movieData.poster_url}
                  alt={movieData.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="flex-grow md:ml-14 ml-6 mt-6 md:mt-0">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {movieData.name}
                </h1>
                <p className="text-xl text-gray-300 mb-4">
                  {movieData.origin_name}
                </p>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <span>{movieData.year}</span>
                <span>•</span>
                <span>{movieData.quality}</span>
                <span>•</span>
                <span>{movieData.lang}</span>
                {movieData.time && (
                  <>
                    <span>•</span>
                    <span>{movieData.time}</span>
                  </>
                )}
              </div>
              {movieData.content && (
                <>
                  <h4>Nội dung phim</h4>
                  <p className="text-white/90 text-lg mt-5">
                    {movieData.content.length > 200
                      ? `${movieData.content.slice(0, 200)}...`
                      : movieData.content}
                  </p>
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Episodes List */}
            {episodes.length > 0 && episodes[0]?.server_data?.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Danh sách tập ({episodes[0].server_data.length} tập)
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {episodes[0].server_data.map((episode: any, index: number) => (
                    <Link
                      key={episode.slug || index}
                      href={`/movie/${id}/watch?episode=${episode.slug}`}
                      className="group relative bg-gray-700 hover:bg-blue-600 transition-all duration-200 rounded-lg p-3 text-center"
                    >
                      <div className="text-white font-medium text-sm">
                        {episode.name}
                      </div>
                      <div className="text-gray-400 text-xs mt-1 group-hover:text-white">
                        {episode.filename}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Movie Description */}
            {movieData.content && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Nội dung phim</h2>
                <p className="text-gray-300 leading-relaxed">
                  {movieData.content}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Movie Info */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Thông tin phim</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Tên gốc:</span>
                  <span className="text-white">{movieData.origin_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Năm:</span>
                  <span className="text-white">{movieData.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Thời lượng:</span>
                  <span className="text-white">{movieData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Chất lượng:</span>
                  <span className="text-white">{movieData.quality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ngôn ngữ:</span>
                  <span className="text-white">{movieData.lang}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Trạng thái:</span>
                  <span className="text-white">{movieData.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Loại phim:</span>
                  <span className="text-white">{movieData.type}</span>
                </div>
                {movieData.director && movieData.director.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Đạo diễn:</span>
                    <span className="text-white">{movieData.director.join(', ')}</span>
                  </div>
                )}
                {movieData.actor && movieData.actor.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Diễn viên:</span>
                    <span className="text-white">{movieData.actor.join(', ')}</span>
                  </div>
                )}
                {movieData.country && movieData.country.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Quốc gia:</span>
                    <span className="text-white">{movieData.country.map((c: any) => c.name).join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Genres */}
            {movieData.category && movieData.category.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Thể loại</h3>
                <div className="flex flex-wrap gap-2">
                  {movieData.category.map((genre: any) => (
                    <Link
                      key={genre.id}
                      href={`/explore?genre=${encodeURIComponent(genre.id)}`}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
}
