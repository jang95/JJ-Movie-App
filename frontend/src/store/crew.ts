import { create } from 'zustand';
import { ActorDetail, CrewDetail } from '../types/crew';

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
