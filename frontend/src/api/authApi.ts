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
    // axiosError으로 타입 좁히기
    if (axios.isAxiosError(error)) {
      error.response?.status === 400 &&
        alert('이메일 또는 비밀번호가 잘못되었습니다.');
    }
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
    if (axios.isAxiosError(error)) {
      error.response?.status === 400 &&
        alert('이미 같은 이메일이 사용 중 입니다.');
    }
  }
};
