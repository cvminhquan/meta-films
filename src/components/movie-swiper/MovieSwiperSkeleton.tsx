"use client";

import { Skeleton } from "../ui/skeleton";

interface MovieSwiperSkeletonProps {
  className?: string;
}

const MovieSwiperSkeleton: React.FC<MovieSwiperSkeletonProps> = ({ 
  className = "" 
}) => {
  return (
    <div className={`movie-swiper-skeleton ${className}`}>
      <style jsx>{`
        .skeleton-swiper-container {
          padding: 0 50px;
          position: relative;
        }
        
        .skeleton-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        
        .skeleton-nav-prev {
          left: 10px;
        }
        
        .skeleton-nav-next {
          right: 10px;
        }
        
        @media (max-width: 768px) {
          .skeleton-swiper-container {
            padding: 0 20px;
          }
          
          .skeleton-nav-btn {
            width: 35px;
            height: 35px;
          }
          
          .skeleton-nav-prev {
            left: 5px;
          }
          
          .skeleton-nav-next {
            right: 5px;
          }
        }
      `}</style>

      <div className="skeleton-swiper-container">
        {/* Navigation button skeletons */}
        <Skeleton className="skeleton-nav-btn skeleton-nav-prev" />
        <Skeleton className="skeleton-nav-btn skeleton-nav-next" />

        {/* Movie cards skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="space-y-3">
              {/* Movie poster skeleton */}
              <Skeleton className="w-full aspect-[2/3] rounded-md" />
              
              {/* Movie title skeleton */}
              <Skeleton className="h-4 w-3/4" />
              
              {/* Movie subtitle skeleton */}
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={`pagination-${index}`} className="w-3 h-3 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieSwiperSkeleton;
