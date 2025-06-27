"use client";

import { MOVIE_TYPE } from "@/constanst/movie";
import {
  fetchHoatHinh,
  fetchLongTieng,
  fetchPhimBo,
  fetchPhimLe,
  fetchPhimVietsub,
  fetchThuyetMinh,
  fetchTVShow,
} from "@/libs/phimapi";
import type { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MovieSection } from "../movie-section";
import { Button } from "../ui/button";
import { MovieSwiper } from "../movie-swiper";
import { TrendingSlider } from "../trending-slider";

export default function TabbedHomepage() {
  const [tab, setTab] = useState<MOVIE_TYPE>(MOVIE_TYPE.PHIM_BO);

  // Helper function to get the appropriate fetch function based on tab
  const getFetchFunction = (tabType: MOVIE_TYPE) => {
    switch (tabType) {
      case MOVIE_TYPE.PHIM_BO:
        return fetchPhimBo;
      case MOVIE_TYPE.PHIM_LE:
        return fetchPhimLe;
      case MOVIE_TYPE.TV_SHOW:
        return fetchTVShow;
      case MOVIE_TYPE.HOAT_HINH:
        return fetchHoatHinh;
      case MOVIE_TYPE.PHIM_VIETSUB:
        return fetchPhimVietsub;
      case MOVIE_TYPE.THUYET_MINH:
        return fetchThuyetMinh;
      case MOVIE_TYPE.LONG_TIENG:
        return fetchLongTieng;
      default:
        return fetchPhimBo;
    }
  };

  // Use React Query for data fetching with caching
  const {
    data: movies = [],
    isLoading: loading,
    error,
  } = useQuery<Movie[]>({
    queryKey: ["movies", tab],
    queryFn: () => getFetchFunction(tab)(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={tab === MOVIE_TYPE.PHIM_BO ? "default" : "ghost"}
          onClick={() => setTab(MOVIE_TYPE.PHIM_BO)}
          disabled={loading}
        >
          Phim bộ
        </Button>
        <Button
          variant={tab === MOVIE_TYPE.PHIM_LE ? "default" : "ghost"}
          onClick={() => setTab(MOVIE_TYPE.PHIM_LE)}
          disabled={loading}
        >
          Phim lẻ
        </Button>
        <Button
          variant={tab === MOVIE_TYPE.TV_SHOW ? "default" : "ghost"}
          onClick={() => setTab(MOVIE_TYPE.TV_SHOW)}
          disabled={loading}
        >
          TV Show
        </Button>
        <Button
          variant={tab === MOVIE_TYPE.HOAT_HINH ? "default" : "ghost"}
          onClick={() => setTab(MOVIE_TYPE.HOAT_HINH)}
          disabled={loading}
        >
          Hoạt hình
        </Button>
        <Button
          variant={tab === MOVIE_TYPE.PHIM_VIETSUB ? "default" : "ghost"}
          onClick={() => setTab(MOVIE_TYPE.PHIM_VIETSUB)}
          disabled={loading}
        >
          Vietsub
        </Button>
        <Button
          variant={tab === MOVIE_TYPE.THUYET_MINH ? "default" : "ghost"}
          onClick={() => setTab(MOVIE_TYPE.THUYET_MINH)}
          disabled={loading}
        >
          Thuyết minh
        </Button>
        <Button
          variant={tab === MOVIE_TYPE.LONG_TIENG ? "default" : "ghost"}
          onClick={() => setTab(MOVIE_TYPE.LONG_TIENG)}
          disabled={loading}
        >
          Lồng tiếng
        </Button>
      </div>

      <TrendingSlider movies={movies} tab={tab} />
      <MovieSection
        movies={movies}
        title=""
        type={tab}
        sortParam={tab}
        isComponentsLoading={loading}
      />
    </div>
  );
}
