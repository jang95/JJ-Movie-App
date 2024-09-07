import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { sendLogoutRequest } from './userApi';
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

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

// 토큰 검증 및 재발급
export const attemptTokenRefresh = async () => {
  try {
    const newAccessToken = await refreshAuthToken();
    useAuthStore.getState().setAccessToken(newAccessToken);
    return newAccessToken; // 새로운 토큰 반환
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    // 토큰 갱신 실패 시 로그아웃 처리
    await sendLogoutRequest();
    const moveLoginPage = confirm('로그인 페이지로 이동하시겠습니까?');
    if (moveLoginPage) {
      location.href = 'https://localhost:5173/login';
    }
    throw new Error('Token refresh failed'); // 예외를 다시 던져 호출한 곳에서 처리할 수 있도록 함
  }
};
