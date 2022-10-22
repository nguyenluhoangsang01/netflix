enum MediaType {
  all = "all",
  movie = "movie",
  tv = "tv",
  person = "person",
}

enum Language {
  en = "en",
  vn = "vn",
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: Language;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  title?: string;
  original_title?: string;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  media_type: MediaType;
  origin_country?: string[];
  popularity: number;
  release_dates?: string;
  video?: boolean;
}

enum VideoTypes {
  Trailer = "Trailer",
  Teaser = "Teaser",
  Clip = "Clip",
  Bloopers = "Bloopers",
  Featurette = "Featurette",
  BehindTheScenes = "Behind the Scenes",
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: VideoTypes;
}

export interface Genre {
  id: number;
  name: string;
}

export interface FormValues {
  email: string;
  password: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  videoQuality: string;
  resolution: string;
  portability: boolean;
  ads: boolean;
  ultraHD: boolean;
}
