"use client";
import { useEffect, useRef, useState } from "react";

interface WatchPlayerProps {
  src: {
    link_embed: string;
    slug?: string;
    link_m3u8?: string;
    filename: string;
    name?: string;
  };
}

export default function WatchPlayerWithServers({ src }: WatchPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isM3U8 = !!src.link_m3u8;

  useEffect(() => {
    if (isM3U8 && videoRef.current) {
      videoRef.current.src = src.link_m3u8!;
    }
  }, [src.link_m3u8]);

  const handleIframeLoad = () => setIsLoading(false);
  const handleIframeError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (isM3U8) {
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
            style={{ backgroundColor: "#000" }}
            onLoadStart={() => setIsLoading(true)}
            onCanPlay={() => setIsLoading(false)}
            onError={() => setHasError(true)}
          >
            <source src={src.link_m3u8} type="application/x-mpegURL" />
            Trình duyệt của bạn không hỗ trợ thẻ video.
          </video>
        </div>
      </div>
    );
  }

  // fallback: dùng iframe nếu KHÔNG có link_m3u8
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
        {src.link_embed && (
          <iframe
            src={src.link_embed}
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
}
