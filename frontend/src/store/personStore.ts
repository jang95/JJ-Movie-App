import { create } from 'zustand';
import { PersonDetailResponse } from '../types/response';
import { CreditsMovie } from '../types/movie';
import { useQuery } from '@tanstack/react-query';
import { fetchPersonDetail, fetchPersonMovie_credits } from '../api/personApi';
import { useEffect } from 'react';

const defaultPersonDetailResponse: PersonDetailResponse = {
  adult: false,
  also_known_as: [],
  biography: '',
  birthday: '',
  deathday: null,
  gender: 0,
  homepage: null,
  id: '',
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

// 공통 Fetch 로직
export const useFetchData = <T>(
  id: string | undefined,
  queryKey: string[],
  fetchFn: (id: string | undefined) => Promise<T>,
  setDataFn: (data: T) => void
) => {
  const setLoading = usePersonDataStore((state) => state.setLoading);
  const personData = usePersonDataStore((state) => state.personData);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey,
    queryFn: () => fetchFn(id),
  });

  useEffect(() => {
    setLoading(isLoading);
    if (data && isSuccess) {
      setDataFn(data);
      setLoading(isLoading);
    }
  }, [data, isSuccess, setDataFn, isLoading, setLoading]);

  return { personData, isLoading };
};

// 출연자 상세 정보 훅
export const useFetchPersonDetail = (id: string | undefined) => {
  const setProfileData = usePersonDataStore((state) => state.setProfileData);
  return useFetchData(id, [id!, 'person'], fetchPersonDetail, setProfileData);
};

// 출연자의 출연 작품 목록 훅
export const useFetchPersonMovieCredits = (id: string | undefined) => {
  const setCreditsData = usePersonDataStore((state) => state.setCreditsData);
  return useFetchData(
    id,
    [id!, 'credit'],
    fetchPersonMovie_credits,
    setCreditsData
  );
};
