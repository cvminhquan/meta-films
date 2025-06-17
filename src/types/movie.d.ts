export interface Movie {
  _id: string;
  name: string;
  origin_name: string;
  slug: string;
  type: string; // 'series' | 'single' | etc.
  poster_url: string;
  thumb_url: string;
  sub_docquyen: boolean;
  chieurap: boolean;
  time: string;
  episode_current: string;
  quality: string;
  lang: string;
  year: number;
  category: {
    id: string;
    name: string;
    slug: string;
  }[];
  country: {
    id: string;
    name: string;
    slug: string;
  }[];
  tmdb: {
    type: string;
    id: string;
    season: number;
    vote_average: number;
    vote_count: number;
  };
  imdb: {
    id: string | null;
  };
  created: {
    time: string;
  };
  modified: {
    time: string;
  };
}
export interface SeoSchema {
  "@context": string;
  "@type": string;
  name: string;
  dateModified: string;
  dateCreated: string;
  url: string;
  datePublished: string;
  image: string;
  director: string;
}

export interface SeoOnPage {
  og_type: string;
  titleHead: string;
  seoSchema: SeoSchema;
  descriptionHead: string;
  og_image: string[];
  updated_time: number;
  og_url: string;
}

export interface BreadCrumbItem {
  name: string;
  slug?: string;
  position: number;
  isCurrent?: boolean;
}

export interface Params {
  slug: string;
}

export interface MovieItem {
  tmdb: {
    type: string;
    id: string;
    season: number;
    vote_average: number;
    vote_count: number;
  };
  imdb: {
    id: string | null;
  };
  created: {
    time: string;
  };
  modified: {
    time: string;
  };
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  content: string;
  type: "series" | "single" | string;
  status: string;
  poster_url: string;
  thumb_url: string;
  is_copyright: boolean;
  sub_docquyen: boolean;
  chieurap: boolean;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  category: {
    id: string;
    name: string;
    slug: string;
  }[];
  country: {
    id: string;
    name: string;
    slug: string;
  }[];
}

export interface EpisodeData {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface Episode {
  server_name: string;
  server_data: EpisodeData[];
}

export interface MovieDetail {
  status: boolean;
  msg: string;
  movie: MovieItem;
  episodes: Episode[];
}
