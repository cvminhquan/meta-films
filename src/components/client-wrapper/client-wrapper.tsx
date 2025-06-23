"use client";

import WatchComponent from "@/components/watch-component/watch-component";

export default function ClientWatchWrapper({ movie }: { movie: any }) {
  return <WatchComponent movie={movie} />;
}
