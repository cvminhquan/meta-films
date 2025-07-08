"use client";
import { useEffect, useRef, useState } from "react";

interface SimpleVideoPlayerProps {
  embedUrl: string;
  m3u8Url?: string;
  title?: string;
}

export default function SimpleVideoPlayer({ embedUrl, m3u8Url, title = "Video Player" }: SimpleVideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  console.log("SimpleVideoPlayer embedUrl:", embedUrl);
  console.log("SimpleVideoPlayer m3u8Url:", m3u8Url);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        console.log("Iframe load timeout, assuming it loaded");
        setIsLoading(false);
      }
    }, 5000); // 5 giây timeout

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="w-full space-y-4">
      {/* Iframe Player */}
      <div className="relative w-full pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-lg bg-black">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
            <div className="text-white text-lg">Đang tải trình phát...</div>
          </div>
        )}
        
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-900 z-20">
            <div className="text-white text-lg">Lỗi tải trình phát</div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={embedUrl}
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
          title={title}
          onLoad={() => {
            console.log("Iframe loaded successfully");
            setIsLoading(false);
          }}
          onError={() => {
            console.log("Iframe failed to load");
            setHasError(true);
            setIsLoading(false);
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation allow-top-navigation"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Debug Info */}
      <div className="bg-gray-800 p-4 rounded text-white text-sm">
        <h3 className="font-bold mb-2">Thông tin debug:</h3>
        <div className="space-y-1">
          <p><strong>Embed URL:</strong> {embedUrl}</p>
          {m3u8Url && <p><strong>M3U8 URL:</strong> {m3u8Url}</p>}
          <p><strong>Loading:</strong> {isLoading.toString()}</p>
          <p><strong>Error:</strong> {hasError.toString()}</p>
        </div>
      </div>

      {/* Direct link to test */}
      <div className="flex gap-2">
        <a 
          href={embedUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Mở trong tab mới
        </a>
        {m3u8Url && (
          <a 
            href={m3u8Url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Mở M3U8 trực tiếp
          </a>
        )}
      </div>
    </div>
  );
}
