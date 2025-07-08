export default function VideoPlayerLoading() {
  return (
    <div className="relative w-full pb-[56.25%] h-0 rounded-lg bg-gray-800 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Loading spinner */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="text-gray-400 text-sm">Đang tải video...</div>
        </div>
      </div>
      
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse"></div>
    </div>
  );
}
