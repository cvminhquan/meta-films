import { Movie } from "@/types/movie";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

interface FilmCardProps {
  movie: Movie;
  type?: "movie" | "tv" | "series";
  className?: string;
}

const FilmCard: FC<FilmCardProps> = ({
  movie,
  type = "movie",
  className = "",
}) => {
  const { id, name, original_title, poster_path, vote_average } = movie;
  return (
    <div className={`relative group ${className}`}>
      <Link href={`/${type}/${id}`}>
        <div className="relative aspect-[2/3] overflow-hidden rounded-md">
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={name || ""}
            title={name || ""}
            fill
            className="object-cover group-hover:brightness-75 transition duration-300"
          />

          <div className="absolute top-2 left-2 bg-gradient-to-tl from-indigo-500 to-fuchsia-500 text-white rounded-full flex items-center gap-1 px-2 py-1 text-sm">
            <span>
              {typeof vote_average === "number"
                ? vote_average.toFixed(1)
                : "N/A"}
            </span>
            <Star size={14} className="fill-white" />
          </div>
        </div>

        <h3 className="mt-2 text-white text-sm md:text-base font-medium truncate">
          {name || original_title}
        </h3>
      </Link>
    </div>
  );
};

export default FilmCard;
