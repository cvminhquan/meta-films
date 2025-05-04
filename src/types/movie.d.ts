export interface Movie {
  id: number;
  title: string;
  overview: string;
  original_title: string;
  original_language: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  video: boolean;
  name: string;
  genre_ids: number[];
  media_type: string
}
