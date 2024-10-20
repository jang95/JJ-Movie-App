import axios from 'axios';
import api from './api';
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

// 회원가입
export const sendRegisterRequest = async (formData: FormData) => {
  try {
    await axios.post(`${BASE_URL}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      error.response?.status === 400 &&
        alert('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  }
};

// 로그아웃
export const sendLogoutRequest = async () => {
  try {
    await api.post(`${BASE_URL}/logout`, {});
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('로그아웃 오류 + error', error);
    }
  }
};

// 회원탈퇴
export const withdrawalRequest = async (email: string) => {
  try {
    await axios.delete(`${BASE_URL}/withdrawal`, {
      params: { email },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('회원탈퇴 네트워크 오류 발생', error);
    }
    throw error;
  }
};

// 사용자 리뷰 조회
export const sendGetUserReviews = async (userId: string | undefined) => {
  try {
    const response = await axios.get(`${BASE_URL}/review/findUserReviews`, {
      params: { userId },
    });
    return response.data.reviews;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('사용자의 리뷰 목록을 불러오는데 실패 했습니다.', error);
    }
  }
};
