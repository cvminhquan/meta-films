"use client";
import { useEffect, useRef, useState } from "react";

interface HLSVideoPlayerProps {
  m3u8Url: string;
  title?: string;
  poster?: string;
}

export default function HLSVideoPlayer({ m3u8Url, title = "Video Player", poster }: HLSVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const hlsRef = useRef<any>(null);

  console.log("HLSVideoPlayer m3u8Url:", m3u8Url);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !m3u8Url) return;

    const loadVideo = async () => {
      try {
        // Kiểm tra xem trình duyệt có hỗ trợ HLS native không
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          console.log("Browser supports HLS natively");
          video.src = m3u8Url;
          setIsLoading(false);
        } else {
          // Sử dụng HLS.js cho các trình duyệt khác
          const Hls = (await import('hls.js')).default;
          
          if (Hls.isSupported()) {
            console.log("Using HLS.js");
            const hls = new Hls({
              enableWorker: true,
              lowLatencyMode: true,
              backBufferLength: 90
            });
            
            hlsRef.current = hls;
            
            hls.loadSource(m3u8Url);
            hls.attachMedia(video);
            
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              console.log("HLS manifest parsed successfully");
              setIsLoading(false);
            });
            
            hls.on(Hls.Events.ERROR, (event, data) => {
              console.error("HLS error:", data);
              if (data.fatal) {
                setHasError(true);
                setErrorMessage(`HLS Error: ${data.type} - ${data.details}`);
                setIsLoading(false);

                // Try to recover from some errors
                switch (data.type) {
                  case Hls.ErrorTypes.NETWORK_ERROR:
                    console.log("Trying to recover from network error");
                    hls.startLoad();
                    break;
                  case Hls.ErrorTypes.MEDIA_ERROR:
                    console.log("Trying to recover from media error");
                    hls.recoverMediaError();
                    break;
                  default:
                    console.log("Cannot recover from this error");
                    break;
                }
              }
            });
          } else {
            console.error("HLS is not supported");
            setHasError(true);
            setErrorMessage("Trình duyệt không hỗ trợ phát video HLS");
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error("Error loading video:", error);
        setHasError(true);
        setErrorMessage("Không thể tải video");
        setIsLoading(false);
      }
    };

    loadVideo();

    // Cleanup
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [m3u8Url]);

  const handleVideoLoad = () => {
    console.log("Video loaded successfully");
    setIsLoading(false);
  };

  const handleVideoError = (e: any) => {
    console.error("Video error:", e);
    setHasError(true);
    setErrorMessage("Lỗi phát video");
    setIsLoading(false);
  };

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
            <div className="text-white text-sm text-center px-4">{errorMessage}</div>
          </div>
        )}

        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full"
          controls
          preload="metadata"
          poster={poster}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onLoadStart={() => setIsLoading(true)}
          onCanPlay={() => setIsLoading(false)}
          style={{ backgroundColor: "#000" }}
        >
          <source src={m3u8Url} type="application/x-mpegURL" />
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
          {errorMessage && <p><strong>Error Message:</strong> {errorMessage}</p>}
        </div>
      </div>

      {/* Direct link to test */}
      <div className="flex gap-2">
        <a 
          href={m3u8Url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Mở M3U8 trực tiếp
        </a>
      </div>
    </div>
  );
}
