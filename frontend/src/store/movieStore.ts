import { create } from 'zustand';
import { MovieDetail } from '../types/response';
import { fetchMovieDetail, fetchMovieReleaseDates } from '../api/moviesApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

interface MovieState {
  movie: MovieDetail | null;
  ageRating: string;
  setMovie: (movie: MovieDetail) => void;
  setAgeRating: (ageRating: string) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  movie: null,
  ageRating: 'NR',
  setMovie: (movie: MovieDetail) => set({ movie }),
  setAgeRating: (ageRating: string) => set({ ageRating }),
}));

// 영화 정보
export const useFetchMovie = (id: string | undefined) => {
  const setMovie = useMovieStore((state) => state.setMovie);
  const movie = useMovieStore((state) => state.movie);

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: [id],
    queryFn: () => fetchMovieDetail(id),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setMovie(data);
    }
  }, [isSuccess, data, setMovie]);

  return { movie, isLoading, error };
};

// 영화 연령 등급
export const useFetchMovieAgeRating = (id: string | undefined) => {
  const setAgeRating = useMovieStore((state) => state.setAgeRating);
  const ageRating = useMovieStore((state) => state.ageRating);
  const { data: age, isSuccess } = useQuery({
    queryKey: [id, 'age-rating'],
    queryFn: () => fetchMovieReleaseDates(id),
  });

  useEffect(() => {
    if (isSuccess && age) {
      const check = age.results.filter((item) => item.iso_3166_1 === 'KR');
      if (check.length === 0) {
        setAgeRating('NR');
      } else if (check[0].release_dates[0].certification === '') {
        setAgeRating('R');
      } else {
        setAgeRating(check[0].release_dates[0].certification);
      }
    }
  }, [isSuccess, age, setAgeRating]);

  return { ageRating };
};
