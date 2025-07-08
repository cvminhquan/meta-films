import { Heart, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const mockMovies = [
  { id: 1, title: "Arcane", meta: "S2 · E1", thumbnail: "/sample1.jpg" },
  {
    id: 2,
    title: "The Base Violence Necessary for Change",
    meta: "S1 · E3",
    thumbnail: "/sample2.jpg",
  },
  { id: 3, title: "The Witcher", meta: "S3 · E4", thumbnail: "/sample3.jpg" },
];

export function MovieListSection({ title }: { title: string }) {
  return (
    <>
      <div className="text-sm text-gray-300 line-clamp-1">{title}</div>
      <ul className="space-y-2">
        {/* {mockMovies.map((movie) => (
          <li
            key={movie.id}
            className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-white/10 transition"
          >
            <Link href={`/tv/${movie.id}`} className="flex items-center gap-3">
              <div className="w-[100px] shrink-0 bg-gray-600 rounded overflow-hidden">
                <Image
                  src="https://image.tmdb.org/t/p/w500/wQEW3xLrQAThu1GvqpsKQyejrYS.jpg"
                  // src={movie.thumbnail}
                  alt={movie.title}
                  width={100}
                  height={64}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-sm line-clamp-2">{movie.title}</p>
                <p className="text-xs text-gray-400 line-clamp-1">
                  {movie.meta}
                </p>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
              <MoreVertical className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </li>
        ))} */}
        Coming soon
      </ul>
    </>
  );
}
