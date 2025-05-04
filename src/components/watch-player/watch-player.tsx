"use client";

import { useEffect, useState } from "react";

interface WatchPlayerProps {
  id: number | string;
  type: "movie" | "tv";
  season?: number;
  episode?: number;
}

export const WatchPlayer = ({ id, type, season, episode }: WatchPlayerProps) => {
  const [embedUrl, setEmbedUrl] = useState("");

  useEffect(() => {
    const baseUrl =
      type === "movie"
        ? process.env.NEXT_PUBLIC_EMBED_URL
        : process.env.NEXT_PUBLIC_EMBED_TV_URL;

    setEmbedUrl(`${baseUrl}/${id}&s=${season}&e=${episode}`);
  }, [id, type, season, episode]);

  console.log("Embed URL:", embedUrl);
  return (
    <div className="relative w-full pb-[56.25%] h-0 mt-10 rounded-lg overflow-hidden shadow-lg">
      {embedUrl && (
        <iframe
          src={embedUrl}
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
          title="Watch Player"
        />
      )}
    </div>
  );
};
