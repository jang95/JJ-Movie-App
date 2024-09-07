import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { attemptTokenRefresh } from './authApi';

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

// jwt 토큰 파싱
export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1]; // JWT의 페이로드 부분 추출
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 토큰이 필요한 요청 요청 전에 사용 interceptors
api.interceptors.request.use(
  async (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      const decodedToken = parseJwt(accessToken);
      const tokenExpirationTime = new Date(decodedToken.exp * 1000);
      const currentTime = new Date();
      if (tokenExpirationTime < currentTime) {
        // 토큰 만료, 재발급 시도
        try {
          const newAccessToken = await attemptTokenRefresh();
          config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        } catch (error) {
          console.error('토큰 갱신 처리 중 오류 발생:', error);
          return Promise.reject(error);
        }
      } else {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
