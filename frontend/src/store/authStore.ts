import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface IUser {
  _id: string;
  email: string;
  nickName: string;
}

interface AuthStateStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStateStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (user) => set({ user }),
      setAccessToken: (token) => set({ accessToken: token }),
      clearUser: () => set({ user: null }),
      clearAccessToken: () => set({ accessToken: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
