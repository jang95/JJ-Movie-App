import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { refreshAuthToken, sendLogoutRequest } from './authApi';

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

const parseJwt = (token: string) => {
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

// 요청 전 interceptors
// 토큰이 필요한 요청에 사용
api.interceptors.request.use(
  async (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      const decodedToken = parseJwt(accessToken);
      const tokenExpirationTime = new Date(decodedToken.exp * 1000);
      const currentTime = new Date();
      if (tokenExpirationTime < currentTime) {
        try {
          const newAccessToken = await refreshAuthToken();
          useAuthStore.getState().setAccessToken(newAccessToken);
        } catch (error) {
          console.error('토큰 갱신 실패:', error);
          // 토큰 갱신 실패 시 로그아웃 로직을 실행
          await sendLogoutRequest();
          const moveLoginPage = confirm('로그인 페이지로 이동하시겠습니까?');
          if (moveLoginPage) {
            location.href = 'https://localhost:5173/login';
          }
        }
        console.log('토큰이 만료되었습니다. 토큰 재발급 실행');
      } else {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        console.log('토큰이 유효합니다.');
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
