"use client";

import { useEffect, useState } from "react";
import {
  fetchPhimBo,
  fetchPhimLe,
  fetchTVShow,
  fetchHoatHinh,
  fetchPhimVietsub,
  fetchThuyetMinh,
  fetchLongTieng,
} from "@/libs/phimapi";
import { Movie } from "@/types/movie";
import { MOVIE_TYPE } from "@/constanst/movie";
import { Button } from "../ui/button";
import { MovieListSection } from "../right-sidebar/components/movie-list-section";
import { MovieSection } from "../movie-section";

export default function TabbedHomepage() {
  const [tab, setTab] = useState<MOVIE_TYPE>(MOVIE_TYPE.PHIM_BO);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  console.log("Current tab:", tab);
  console.log("Movies:", movies);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data: Movie[] = [];

      switch (tab) {
        case MOVIE_TYPE.PHIM_BO:
          data = await fetchPhimBo();
          break;
        case MOVIE_TYPE.PHIM_LE:
          data = await fetchPhimLe();
          break;
        case MOVIE_TYPE.TV_SHOW:
          data = await fetchTVShow();
          break;
        case MOVIE_TYPE.HOAT_HINH:
          data = await fetchHoatHinh();
          break;
        case MOVIE_TYPE.PHIM_VIETSUB:
          data = await fetchPhimVietsub();
          break;
        case MOVIE_TYPE.THUYET_MINH:
          data = await fetchThuyetMinh();
          break;
        case MOVIE_TYPE.LONG_TIENG:
          data = await fetchLongTieng();
          break;
      }

      setMovies(data);
      setLoading(false);
    };

    fetchData();
  }, [tab]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={tab === MOVIE_TYPE.PHIM_BO ? "default" : "ghost"}
          onClick={() => setTab(MOVIE_TYPE.PHIM_BO)}
        >
          Phim bộ
        </Button>
        <Button
          variant={tab === MOVIE_TYPE.PHIM_LE ? "default" : "ghost"}
          onClick={() => setTab(MOVIE_TYPE.PHIM_LE)}
        >
          Phim lẻ
        </Button>
        <Button
          variant={tab === MOVIE_TYPE.TV_SHOW ? "default" : "ghost"}
          onClick={() => setTab(MOVIE_TYPE.TV_SHOW)}
        >
          TV Show
        </Button>
        <Button
          variant={tab === MOVIE_TYPE.HOAT_HINH ? "default" : "ghost"}
          onClick={() => setTab(MOVIE_TYPE.HOAT_HINH)}
        >
          Hoạt hình
        </Button>
        <Button
          variant={tab === MOVIE_TYPE.PHIM_VIETSUB ? "default" : "ghost"}
          onClick={() => setTab(MOVIE_TYPE.PHIM_VIETSUB)}
        >
          Vietsub
        </Button>
        <Button
          variant={tab === MOVIE_TYPE.THUYET_MINH ? "default" : "ghost"}
          onClick={() => setTab(MOVIE_TYPE.THUYET_MINH)}
        >
          Thuyết minh
        </Button>
        <Button
          variant={tab === MOVIE_TYPE.LONG_TIENG ? "default" : "ghost"}
          onClick={() => setTab(MOVIE_TYPE.LONG_TIENG)}
        >
          Lồng tiếng
        </Button>
      </div>

      <MovieSection movies={movies} title="" type={tab} sortParam={tab} />
      {/* <MovieSection
        type={
          tab === MOVIE_TYPE.MOVIE
            ? MOVIE_TYPE.MOVIE
            : tab === MOVIE_TYPE.TV
            ? MOVIE_TYPE.TV
            : "series"
        }
        title="Upcoming Movies"
        movies={upcoming}
        sortParam="upcoming"
      /> */}
    </div>
  );
}
