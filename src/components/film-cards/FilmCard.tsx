import { Skeleton } from "@/components/ui/skeleton";
import { Movie } from "@/types/movie";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { useState } from "react";

interface FilmCardProps {
  movie: Movie;
  type:
    | "phim-bo"
    | "phim-le"
    | "tv-shows"
    | "hoat-hinh"
    | "phim-vietsub"
    | "phim-thuyet-minh"
    | "phim-long-tieng";

  className?: string;
}

const FilmCard: FC<FilmCardProps> = ({
  movie,
  type = "movie",
  className = "",
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const {
    slug,
    name,
    origin_name,
    poster_url,
    thumb_url,
    tmdb: { vote_average },
  } = movie;
  return (
    <div className={`firstrelative group ${className}`}>
      <Link href={`/movie/${slug}`} title={name || ""}>
        <div className="relative aspect-[2/3] overflow-hidden rounded-md">
          {/* Loading skeleton */}
          {imageLoading && (
            <Skeleton className="w-full h-full absolute inset-0 z-10" />
          )}

          {/* Image */}
          {poster_url && poster_url.trim() !== "" && !imageError ? (
            <Image
              src={
                poster_url.startsWith("http")
                  ? poster_url
                  : `https://img.phimapi.com/${poster_url}`
              }
              alt={name || ""}
              title={name || ""}
              fill
              className={`object-cover group-hover:brightness-75 transition duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
          ) : (
            // Fallback when no image or error
            <div className="w-full h-full absolute inset-0 bg-gray-700 flex items-center justify-center">
              <div className="text-gray-400 text-center p-4">
                <div className="text-2xl mb-2">🎬</div>
                <div className="text-xs">No Image</div>
              </div>
            </div>
          )}
          <div className="flex justify-between absolute top-2 right-2 left-2">
            <div className="flex justify-between bg-gradient-to-tl from-indigo-500 to-fuchsia-500 text-white rounded-full items-center gap-1 px-2 py-1 text-sm">
              <span>
                {typeof vote_average === "number" && vote_average !== 0
                  ? vote_average.toFixed(1)
                  : "N/A"}
              </span>
              <Star size={14} className="fill-white" />
            </div>
            <div>
              {type === "phim-bo" &&
                (() => {
                  const status = (movie as any).status;
                  const episodeCurrent = movie.episode_current;
                  const episodeTotal = (movie as any).episode_total;
                  // Ongoing: show current/total or just current
                  if (status === "ongoing") {
                    // Try to extract current/total from episodeCurrent (e.g., "8/12")
                    const match =
                      episodeCurrent &&
                      episodeCurrent.match(/(\d+)(?:\/(\d+))?/);
                    if (match) {
                      if (match[2]) return `${match[1]}/${match[2]}`;
                      if (match[1]) return match[1];
                    }
                    // Fallback: just show episodeCurrent or episodeTotal
                    return (
                      episodeCurrent ||
                      (episodeTotal ? `${episodeTotal}` : null)
                    );
                  }
                  // Completed: show total/total or just total
                  if (status === "completed") {
                    // Try to extract total from episodeCurrent (e.g., "Hoàn Tất (12/12)")
                    const match =
                      episodeCurrent && episodeCurrent.match(/\((\d+\/\d+)\)/);
                    if (match) return match[1];
                    if (episodeTotal) return `${episodeTotal}/${episodeTotal}`;
                    // Fallback: just show episodeCurrent or episodeTotal
                    return (
                      episodeCurrent ||
                      (episodeTotal ? `${episodeTotal}` : null)
                    );
                  }
                  // Fallback for unknown status
                  if (episodeCurrent) return episodeCurrent;
                  if (episodeTotal) return `${episodeTotal}`;
                  return null;
                })()}
            </div>
          </div>
        </div>

        <h3 className="mt-2 text-white text-sm md:text-base font-medium truncate">
          {name || origin_name}
        </h3>
      </Link>
    </div>
  );
};

export default FilmCard;
