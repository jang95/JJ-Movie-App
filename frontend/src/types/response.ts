import { Movie } from './Movie';

/**
 * Movise List
 * Top Rated, Popular, Upcoming, Now Playing
 */
export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Basic Data
interface Basic {
  adult: boolean;
  id: number;
  popularity: number;
}

// Movie Detail
export interface MovieDetail extends Basic {
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// Movie release date & age-rating
export interface MovieAgeRating {
  id: number;
  results: Array<{
    iso_3166_1: string;
    release_dates: Array<{
      certification: string;
      descriptors: string[];
      iso_639_1: string;
      note: string;
      release_date: string;
      type: number;
    }>;
  }>;
}

export interface PersonDetailResponse extends Basic {
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  profile_path: string;
}
