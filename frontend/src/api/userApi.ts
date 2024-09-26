import axios from 'axios';
import api from './api';
import { useAuthStore } from '../store/authStore';
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

// 회원가입
export const sendRegisterRequest = async (formData: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('response', response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      error.response?.status === 400 &&
        alert('이미 같은 이메일이 사용 중 입니다.');
    }
  }
};

// 로그인
export const sendLoginRequest = async (formData: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    console.log('response', response);

    return response.data;
  } catch (error) {
    // axiosError으로 타입 좁히기
    if (axios.isAxiosError(error)) {
      error.response?.status === 400 &&
        alert('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  }
};

// 로그아웃
export const sendLogoutRequest = async () => {
  try {
    const response = await api.post(`${BASE_URL}/logout`, {});

    useAuthStore.getState().clearAccessToken();
    useAuthStore.getState().clearUser();
    localStorage.removeItem('auth-storage');

    console.log('sendLogoutRequest', response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('로그아웃 오류 + error', error);
    }
  }
};

// 로그인 확인
// Todo delete...
export const verifyAuthLogin = async () => {
  try {
    const response = await api.get(`${BASE_URL}/check`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        switch (status) {
          case 400:
            alert('잘못된 요청입니다.');
            break;
          case 404:
            alert('요청한 리소스를 찾을 수 없습니다.');
            break;
          default:
            alert('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
            break;
        }
      }
    } else {
      alert('예상치 못한 오류가 발생했습니다.');
    }
  }
};

// 회원탈퇴
export const withdrawalRequset = async (email: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/withdrawal`, {
      params: { email },
    });
    sendLogoutRequest();
    console.log('withdrawalRequset', response.data.success);
    alert('회원탈퇴 되었습니다.');
    location.href = 'https://localhost:5173';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('withdrawalRequset', error);
    }
  }
};
