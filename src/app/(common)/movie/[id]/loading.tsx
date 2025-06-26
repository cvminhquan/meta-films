export default function MovieDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section Skeleton */}
      <div className="relative h-[70vh] bg-gray-800 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Poster Skeleton */}
              <div className="w-48 h-72 bg-gray-700 rounded-lg animate-pulse flex-shrink-0" />
              
              {/* Movie Info Skeleton */}
              <div className="flex-grow space-y-4">
                {/* Title */}
                <div className="h-12 bg-gray-700 rounded animate-pulse w-3/4" />
                {/* Subtitle */}
                <div className="h-6 bg-gray-700 rounded animate-pulse w-1/2" />
                {/* Quick Info */}
                <div className="flex gap-4">
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-16" />
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-16" />
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-16" />
                </div>
                {/* Description */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Episodes Section */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-6 bg-gray-700 rounded animate-pulse w-48 mb-4" />
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-10 bg-gray-700 rounded animate-pulse" />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-6 bg-gray-700 rounded animate-pulse w-32 mb-4" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-4 bg-gray-700 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Movie Info */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-6 bg-gray-700 rounded animate-pulse w-32 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-20" />
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-24" />
                  </div>
                ))}
              </div>
            </div>

            {/* Genres */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-6 bg-gray-700 rounded animate-pulse w-20 mb-4" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-8 bg-gray-700 rounded-full animate-pulse w-20" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
