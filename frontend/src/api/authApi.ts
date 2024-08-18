import axios from 'axios';
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

// 로그인
export const sendLoginRequest = async (formData: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('response', response);
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

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
    console.error('회원가입 연결 오류', error);
  }
};
