import axios from 'axios';
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

// 리뷰 생성
export const sendCreateReviewRequest = async (formData: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/review/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('sendCreateReviewRequest', response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      error.response?.status === 400 && alert('리뷰 저장에 실패했습니다.');
    }
  }
};
