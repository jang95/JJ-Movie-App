import { create } from 'zustand';
import { PersonDetailResponse } from '../types/response';
import { CreditsMovie } from '../types/Movie';

const defaultPersonDetailResponse: PersonDetailResponse = {
  adult: false,
  also_known_as: [],
  biography: '',
  birthday: '',
  deathday: null,
  gender: 0,
  homepage: null,
  id: 0,
  imdb_id: '',
  known_for_department: '',
  name: '',
  place_of_birth: '',
  popularity: 0,
  profile_path: '',
};

interface PersonStore {
  personData: { profile: PersonDetailResponse; credits: CreditsMovie[] };
  isLoading: boolean;
  setProfileData: (profile: PersonDetailResponse) => void;
  setCreditsData: (credits: CreditsMovie[]) => void;
  setLoading: (isLoading: boolean) => void;
}

export const usePersonDataStore = create<PersonStore>((set) => ({
  personData: { profile: defaultPersonDetailResponse, credits: [] },
  isLoading: false,
  setProfileData: (profile) =>
    set((state) => ({ personData: { ...state.personData, profile } })),
  setCreditsData: (credits) =>
    set((state) => ({ personData: { ...state.personData, credits } })),
  setLoading: (isLoading) => set({ isLoading }),
}));
