"use client";

import { useGenres } from "../provider/genre-context/genre-context";
import GenreSwiper from "../genre-swiper/GenreSwiper";
import { Skeleton } from "../ui/skeleton";

interface GenreSectionsProps {
  className?: string;
  maxGenres?: number;
}

const GenreSections: React.FC<GenreSectionsProps> = ({ 
  className = "", 
  maxGenres = 6 
}) => {
  const genreMap = useGenres();
  
  // Convert genre map to array and limit the number
  const genres = Array.from(genreMap.values()).slice(0, maxGenres);
  
  // Fallback genres if genreMap is empty
  const fallbackGenres = [
    { _id: "hanh-dong", name: "Hành Động" },
    { _id: "vien-tuong", name: "Viễn Tưởng" },
    { _id: "kinh-di", name: "Kinh Dị" },
    { _id: "hai-huoc", name: "Hài Hước" },
    { _id: "tinh-cam", name: "Tình Cảm" },
    { _id: "phieu-luu", name: "Phiêu Lưu" },
  ];
  
  const displayGenres = genres.length > 0 ? genres : fallbackGenres;

  return (
    <div className={`genre-sections space-y-12 ${className}`}>
      {displayGenres.length === 0 ? (
        // Loading skeletons
        Array.from({ length: 3 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex gap-4">
              {Array.from({ length: 5 }).map((_, movieIndex) => (
                <div key={`movie-skeleton-${movieIndex}`} className="flex-shrink-0 w-48">
                  <Skeleton className="w-full aspect-[2/3] rounded-md mb-3" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        // Actual genre sections
        displayGenres.map((genre) => (
          <GenreSwiper
            key={genre._id}
            genre={genre}
            className="genre-section"
          />
        ))
      )}
    </div>
  );
};

export default GenreSections;
