import axios from 'axios';
import {
  MoiveListResponse,
  MovieAgeRating,
  MovieDetail,
} from '../types/response';

const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;
const MOVIE_BASE_URL = 'https://api.themoviedb.org/3/movie/';

// 공통 params 객체 생성
const commonParams = {
  api_key: API_KEY,
  language: 'ko-KR',
  region: 'KR',
};

// MovieList Now Playing, Popular, Top Rated, Upcoming
export const fetchMoviesList = async (
  type: string
): Promise<MoiveListResponse> => {
  try {
    const response = await axios.get(`${MOVIE_BASE_URL}${type}`, {
      params: {
        ...commonParams,
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('영화 목록을 가져오는데 실패했습니다.');
  }
};

// Trending movie list (day, week)
export const fetchMoviesTrending = async (
  type: string
): Promise<MoiveListResponse> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/${type}`,
      {
        params: {
          ...commonParams,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('트렌드 영화 목록을 가져오는데 실패했습니다.');
  }
};

// Movie search Api
export const fetchMovieSearch = async (
  text: string
): Promise<MoiveListResponse> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          ...commonParams,
          query: text,
          page: 1,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('영화 검색에 실패했습니다.');
  }
};

export const fetchMovieDetail = async (
  movieID: string | undefined
): Promise<MovieDetail> => {
  try {
    const response = await axios.get(`${MOVIE_BASE_URL}${movieID}`, {
      params: {
        ...commonParams,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('해당 영화 정보를 가져오는데 실패했습니다.');
  }
};

// 오류: TanStack-Query의 경우 Promise를 반환해야 함
export const fetchMovieReleaseDates = async (
  movieID: string | undefined
): Promise<MovieAgeRating> => {
  try {
    const response = await axios.get(
      `${MOVIE_BASE_URL}${movieID}/release_dates`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('해당 영화 정보를 가져오는데 실패했습니다.');
  }
};
