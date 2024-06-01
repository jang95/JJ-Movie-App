import axios from 'axios';
import { MoiveListResponse, MovieDetail } from '../types/response';

const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;

// MovieList Now Playing, Popular, Top Rated, Upcoming
export const fetchMoviesList = async (
  type: string
): Promise<MoiveListResponse> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${type}?`,
    {
      params: {
        api_key: API_KEY,
        language: 'ko-KR',
        page: 1,
        region: 'KR',
      },
    }
  );

  if (response.data) {
    return response.data;
  } else {
    throw new Error('No data returned from API');
  }
};

// Trending movie list (day, week)
export const fetchMoviesTrending = async (
  type: string
): Promise<MoiveListResponse> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/${type}?`,
    {
      params: {
        api_key: API_KEY,
        language: 'ko-KR',
      },
    }
  );

  if (response.data) {
    console.log('fetchMoviesTrending', response);
    return response.data;
  } else {
    throw new Error('No data returned from API');
  }
};

// Movie search Api
export const fetchMovieSearch = async (
  text: string
): Promise<MoiveListResponse> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        api_key: API_KEY,
        query: text,
        language: 'ko-KR',
        page: 1,
        region: 'KR',
      },
    }
  );

  if (response.data) {
    console.log('fetchMovieSearch', response);
    return response.data;
  } else {
    throw new Error('No data returned from API');
  }
};

export const fetchMovieDetail = async (
  movieID: number
): Promise<MovieDetail> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}?`,
    {
      params: {
        api_key: API_KEY,
        language: 'ko-KR',
      },
    }
  );

  if (response.data) {
    console.log('fetchMovieDetail', response.data);
    return response.data;
  } else {
    throw new Error('No data returned from API');
  }
};
