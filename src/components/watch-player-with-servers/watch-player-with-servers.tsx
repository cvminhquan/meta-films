// components/watch-player/WatchPlayerWithServers.tsx
"use client";

import { useEffect, useState } from "react";

interface WatchPlayerProps {
  id: number | string;
  type: "movie" | "tv";
  season?: number;
  episode?: number;
}

type Server = {
  label: string;
  url: string;
  status?: "online" | "offline" | "checking";
};

const getServerList = (
  id: number | string,
  type: string,
  season?: number,
  episode?: number
): Server[] => {
  const baseTV = process.env.NEXT_PUBLIC_EMBED_TV_URL;
  const baseMovie = process.env.NEXT_PUBLIC_EMBED_URL;

  if (type === "tv") {
    return [
      {
        label: "2Embed - TV",
        url: `${baseTV}/${id}&s=${season}&e=${episode}`,
      },
      // {
      //   label: "MultiEmbed",
      //   url: `https://multiembed.mov/embed/tv?id=${id}&s=${season}&e=${episode}`,
      // },
      {
        label: "VidSrc",
        url: `https://vidsrc.net/embed/tv/${id}/${season}/${episode}`,
      },
    ];
  }

  return [
    {
      label: "2Embed - Movie",
      url: `${baseMovie}/${id}`,
    },
    // {
    //   label: "MultiEmbed",
    //   url: `https://multiembed.mov/embed/movie?id=${id}`,
    // },
    {
      label: "VidSrc",
      url: `https://vidsrc.to/embed/movie/${id}`,
    },
  ];
};

async function checkServerStatus(url: string): Promise<"online" | "offline"> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    await fetch(url, {
      method: "HEAD",
      mode: "no-cors",
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return "online";
  } catch (error) {
    return "offline";
  }
}

export const WatchPlayerWithServers = ({
  id,
  type,
  season = 1,
  episode = 1,
}: WatchPlayerProps) => {
  const [servers, setServers] = useState<Server[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<string>("");

  useEffect(() => {
    const initialServers = getServerList(id, type, season, episode).map(
      (s): Server => ({
        ...s,
        status: "checking",
      })
    );
    setServers(initialServers);
    setSelectedUrl(initialServers[0].url);

    initialServers.forEach(async (server) => {
      const status = await checkServerStatus(server.url);
      setServers((prev) =>
        prev.map((s) => (s.label === server.label ? { ...s, status } : s))
      );
    });
  }, [id, type, season, episode]);

  return (
    <div className="mt-6 space-y-4">

      <div className="flex gap-3 flex-wrap items-center">
        <h3>Server: </h3>
        {servers.map((server) => (
          <button
            key={server.label}
            className={`px-3 py-1 rounded-md text-sm transition relative ${
              selectedUrl === server.url
                ? "bg-primary text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            onClick={() => setSelectedUrl(server.url)}
          >
            {server.label}
            <span
              className={`ml-2 text-xs ${
                server.status === "online"
                  ? "text-green-400"
                  : server.status === "offline"
                  ? "text-red-500"
                  : "text-yellow-300"
              }`}
            >
              {server.status === "checking"
                ? "..."
                : server.status === "online"
                ? "\uD83D\uDFE2"
                : "\uD83D\uDD34"}
            </span>
          </button>
        ))}
      </div>
      <div className="relative w-full pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-lg">
        {selectedUrl && (
          <iframe
            src={selectedUrl}
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
            title="Watch Player"
          />
        )}
      </div>
    </div>
  );
};
