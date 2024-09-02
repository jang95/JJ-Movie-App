import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface IUser {
  email: string;
  nickName: string;
}

interface AuthStateStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  clearUser: () => void;
}

export const useAuthStore = create(
  persist<AuthStateStore>(
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
