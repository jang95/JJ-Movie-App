import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'multipart/form-data' },
  withCredentials: true,
});

/**
 * 서버에 요청보내기 전 토큰 검증
 */
apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
