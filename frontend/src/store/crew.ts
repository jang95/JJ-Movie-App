import { create } from 'zustand';

export interface ActorDetail {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface CrewDetail {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

interface CrewStore {
  crewList: { cast: ActorDetail[]; crew: CrewDetail[] };
  setCrewList: (newCrewList: {
    cast: ActorDetail[];
    crew: CrewDetail[];
  }) => void;
}

export const useCrewStore = create<CrewStore>((set) => ({
  crewList: { cast: [], crew: [] },
  setCrewList: (newCrewList) => set({ crewList: newCrewList }),
}));
