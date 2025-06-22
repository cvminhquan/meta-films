"use client";
import { useEffect, useRef, useState } from "react";

interface WatchPlayerProps {
  src: string;
}

export const WatchPlayerWithServers = ({ src }: WatchPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  console.log("src", src);

  // Check if the URL is from the embed player
  const isEmbedUrl = src.startsWith('https://player.phimapi.com');

  useEffect(() => {
    // For non-embed URLs that are m3u8 streams
    if (videoRef.current && !isEmbedUrl && src.endsWith('.m3u8')) {
      videoRef.current.src = src;
    }
  }, [src, isEmbedUrl]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (!isEmbedUrl && src.endsWith('.m3u8')) {
    // Use video player for direct m3u8 streams
    return (
      <div className="mt-6 space-y-4">
        <div className="relative w-full pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-lg">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-white text-lg">Đang tải video...</div>
            </div>
          )}
          <video
            ref={videoRef}
            controls
            className="absolute top-0 left-0 w-full h-full border-0"
            style={{ backgroundColor: '#000' }}
            onLoadStart={() => setIsLoading(true)}
            onCanPlay={() => setIsLoading(false)}
            onError={() => setHasError(true)}
          >
            <source src={src} type="application/x-mpegURL" />
            Trình duyệt của bạn không hỗ trợ thẻ video.
          </video>
        </div>
      </div>
    );
  }

  // Use iframe for embed URLs
  return (
    <div className="mt-6 space-y-4">
      <div className="relative w-full pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-lg">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="text-white text-lg">Đang tải trình phát...</div>
          </div>
        )}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="text-white text-lg">Không thể tải trình phát</div>
          </div>
        )}
        {src && (
          <iframe
            ref={iframeRef}
            src={src}
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
            title="Trình phát video"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            referrerPolicy="no-referrer"
          />
        )}
      </div>
    </div>
  );
};
