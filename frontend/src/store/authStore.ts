import { create } from 'zustand';

export interface IUser {
  _id: string;
  email: string;
  nickName: string;
}

/**
 * 유정 정보 및 accessToken 상태 관리
 */
export interface AuthStateStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  accessToken: string;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStateStore>()((set) => ({
  user: null,
  accessToken: '',
  setUser: (user) => set({ user }),
  setAccessToken: (token) => set({ accessToken: token }),
  clearUser: () => set({ user: null }),
  clearAccessToken: () => set({ accessToken: '' }),
}));
