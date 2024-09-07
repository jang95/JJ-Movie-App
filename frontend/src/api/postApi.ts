import axios from 'axios';
// import api from './api';
// import { useAuthStore } from '../store/authStore';
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

// 리뷰 생성
export const sendcreateReviewRequest = async (formData: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/review/create`, formData, {
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
