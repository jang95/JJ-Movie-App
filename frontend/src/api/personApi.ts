import axios from 'axios';
import { CreditsMovie } from '../types/movie';
const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;

export const fetchPersonDetail = async (id: string | undefined) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${id}`,
      {
        params: { api_key: API_KEY },
      }
    );

    return response.data;
  } catch (error) {
    throw Error(' 사람 정보 불러오기 실패');
  }
};

export const fetchPersonMovie_credits = async (
  id: string | undefined
): Promise<CreditsMovie[]> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/movie_credits`,
      {
        params: { api_key: API_KEY, language: 'ko-KR' },
      }
    );

    return response.data.cast;
  } catch (error) {
    throw Error(' 사람 정보 불러오기 실패');
  }
};
