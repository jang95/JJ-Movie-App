import { useAuthStore } from '../store/authStore';

const clearUserSession = () => {
  useAuthStore.getState().clearAccessToken();
  useAuthStore.getState().clearUser();
  localStorage.removeItem('auth-storage');
};

export default clearUserSession;
