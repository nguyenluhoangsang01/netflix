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
  media_type: MediaType;
  original_language: Language;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
