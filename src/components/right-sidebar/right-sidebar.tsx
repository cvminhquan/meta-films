"use client";
import { useState } from "react";
import { MovieListSection } from "./components/movie-list-section";
import { NowPlayingCard } from "./components/now-playing-card";
import { SidebarTabs } from "./components/sidebar-tabs";

export default function RightSidebar() {
  const [tab, setTab] = useState("related");

  return (
    <div className="w-full max-w-[300px] bg-[hsla(0,0%,100%,0.05)] text-white p-4 space-y-4">
      <SidebarTabs currentTab={tab} onChange={setTab} />
      <NowPlayingCard />
      <MovieListSection
        title={
          tab === "related"
            ? "Phim liên quan"
            : tab === "watchlist"
            ? "Danh sách xem"
            : "Lịch sử xem"
        }
      />
    </div>
  );
}
