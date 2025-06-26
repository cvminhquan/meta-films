"use client";
import { useCallback, useEffect, useRef, useState } from "react";

interface OptimizedVideoPlayerProps {
  m3u8Url: string;
  title?: string;
}

export default function OptimizedVideoPlayer({ m3u8Url, title = "Video Player" }: OptimizedVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isReady, setIsReady] = useState(false);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (hlsRef.current) {
      try {
        hlsRef.current.destroy();
      } catch (e) {
        // Silent cleanup
      }
      hlsRef.current = null;
    }
  }, []);

  // Initialize video player
  const initializePlayer = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !m3u8Url) {
      setHasError(true);
      setErrorMessage("Video element hoặc URL không hợp lệ");
      setIsLoading(false);
      return;
    }

    // Reset states
    setIsLoading(true);
    setHasError(false);
    setErrorMessage("");
    setIsReady(false);

    try {
      // Cleanup previous instance
      cleanup();

      // Check for native HLS support (Safari)
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = m3u8Url;
        setIsReady(true);
        return;
      }

      // Use HLS.js for other browsers
      const Hls = (await import('hls.js')).default;

      if (!Hls.isSupported()) {
        throw new Error("HLS không được hỗ trợ trên trình duyệt này");
      }
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 30,
        maxBufferLength: 20,
        maxMaxBufferLength: 300,
        startLevel: -1,
        capLevelToPlayerSize: true,
        maxLoadingDelay: 4,
        maxBufferHole: 0.5
      });

      hlsRef.current = hls;

      // Event listeners
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsReady(true);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              setHasError(true);
              setErrorMessage(`HLS Error: ${data.details}`);
              break;
          }
        }
      });

      // Load and attach
      hls.loadSource(m3u8Url);
      hls.attachMedia(video);

    } catch (error) {
      setHasError(true);
      setErrorMessage(error instanceof Error ? error.message : "Lỗi không xác định");
    } finally {
      setIsLoading(false);
    }
  }, [m3u8Url, cleanup]);

  // Initialize player when URL changes
  useEffect(() => {
    initializePlayer();
    return cleanup;
  }, [initializePlayer, cleanup]);

  // Video event handlers
  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoError = (e: any) => {
    setHasError(true);
    setErrorMessage("Lỗi phát video");
    setIsLoading(false);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full space-y-4">
      <div className="relative w-full pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-lg bg-black">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
            <div className="text-white text-lg">Đang tải video...</div>
          </div>
        )}
        
        {/* Error overlay */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/90 z-20">
            <div className="text-white text-lg mb-2">Lỗi phát video</div>
            <div className="text-white text-sm text-center px-4 mb-4">{errorMessage}</div>
            <button
              onClick={initializePlayer}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Video element */}
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full"
          controls
          preload="metadata"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onCanPlay={handleCanPlay}
          style={{ backgroundColor: "#000" }}
          playsInline
          crossOrigin="anonymous"
        >
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
      </div>


    </div>
  );
}
