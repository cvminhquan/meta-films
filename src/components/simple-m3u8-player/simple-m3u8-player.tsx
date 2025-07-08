"use client";
import { useState } from "react";

interface SimpleM3U8PlayerProps {
  m3u8Url: string;
  title?: string;
}

export default function SimpleM3U8Player({ m3u8Url, title = "Video Player" }: SimpleM3U8PlayerProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log("SimpleM3U8Player m3u8Url:", m3u8Url);

  return (
    <div className="w-full space-y-4">
      <div className="relative w-full pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-lg bg-black">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
            <div className="text-white text-lg">Đang tải video...</div>
          </div>
        )}
        
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900 z-20">
            <div className="text-white text-lg mb-2">Lỗi phát video</div>
            <div className="text-white text-sm text-center px-4">
              Không thể phát video M3U8. Thử mở link trực tiếp bên dưới.
            </div>
          </div>
        )}

        {/* Video element đơn giản */}
        <video
          className="absolute top-0 left-0 w-full h-full"
          controls
          preload="metadata"
          onLoadedData={() => {
            console.log("Video loaded successfully");
            setIsLoading(false);
          }}
          onError={(e) => {
            console.error("Video error:", e);
            setHasError(true);
            setIsLoading(false);
          }}
          onLoadStart={() => setIsLoading(true)}
          onCanPlay={() => setIsLoading(false)}
          style={{ backgroundColor: "#000" }}
        >
          <source src={m3u8Url} type="application/x-mpegURL" />
          <source src={m3u8Url} type="application/vnd.apple.mpegurl" />
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
      </div>

      {/* Debug Info */}
      <div className="bg-gray-800 p-4 rounded text-white text-sm">
        <h3 className="font-bold mb-2">Thông tin video:</h3>
        <div className="space-y-1">
          <p><strong>M3U8 URL:</strong> {m3u8Url}</p>
          <p><strong>Loading:</strong> {isLoading.toString()}</p>
          <p><strong>Error:</strong> {hasError.toString()}</p>
        </div>
      </div>

      {/* Direct links */}
      <div className="flex gap-2 flex-wrap">
        <a 
          href={m3u8Url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Mở M3U8 trực tiếp
        </a>
        <button
          onClick={() => {
            navigator.clipboard.writeText(m3u8Url);
            alert("Đã copy URL vào clipboard!");
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Copy URL
        </button>
      </div>
    </div>
  );
}
