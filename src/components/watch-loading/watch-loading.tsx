export default function WatchLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Video Player Skeleton */}
      <div className="relative w-full pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-lg bg-gray-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-lg">Đang tải video...</div>
        </div>
      </div>
      
      {/* Episode List Skeleton */}
      <section className="px-[5%] py-10">
        <div className="h-8 bg-gray-700 rounded w-48 mb-5"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-12 bg-gray-700 rounded"></div>
          ))}
        </div>
      </section>
    </div>
  );
}
