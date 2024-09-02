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

    console.log('sendLogoutRequest', response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('로그아웃 오류 + error', error);
    }
  }
};

// 로그인 확인
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

// 토큰 인증
export const verifyAuthToken = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/token`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Axios 에러를 검사합니다.
    if (axios.isAxiosError(error)) {
      // 응답이 있는 경우
      if (error.response) {
        const status = error.response.status;
        switch (status) {
          case 400:
            alert('잘못된 요청입니다.');
            break;
          case 401:
            alert('인증되지 않은 요청입니다.');
            break;
          case 403:
            alert('접근이 거부되었습니다. 권한이 부족합니다.');
            break;
          case 404:
            alert('요청한 리소스를 찾을 수 없습니다.');
            break;
          default:
            alert('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
            break;
        }
      } else if (error.request) {
        // 요청이 보내졌으나 응답이 없는 경우
        alert('서버와의 연결에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
      } else {
        // 설정 중 발생한 에러
        alert(
          '토큰 검증 중 문제가 발생했습니다. 오류 메시지: ' + error.message
        );
      }
    } else {
      // Axios 에러가 아닌 경우
      alert('예상치 못한 오류가 발생했습니다.');
    }
  }
};

// 토근 재발급
export const refreshAuthToken = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/refresh`,
      {},
      {
        withCredentials: true,
      }
    );

    console.log('refreshAuthToken', response);

    return response.data.accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response?.status;
        switch (status) {
          case 400:
            alert('잘못된 요청입니다.');
            break;
          case 401:
            alert('인증되지 않은 요청입니다.');
            break;
          case 403:
            alert('접근이 거부되었습니다. 권한이 부족합니다.');
            break;
          case 404:
            alert('요청한 리소스를 찾을 수 없습니다.');
            break;
          default:
            alert('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
            break;
        }
      } else if (error.request) {
        alert('서버와의 연결에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
      } else {
        alert(
          '리프레시 토큰 검증 중 문제가 발생했습니다. 오류 메시지: ' +
            error.message
        );
      }
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
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
