import { create } from 'zustand';
import { Movie } from '../types/movie';

interface NowPlayingStore {
  movieList: Movie[];
  setMovies: (newMovies: Movie[]) => void;
}

export const useNowPlayingStore = create<NowPlayingStore>((set) => ({
  movieList: [],
  setMovies: (newMovies) => set({ movieList: newMovies }),
}));
