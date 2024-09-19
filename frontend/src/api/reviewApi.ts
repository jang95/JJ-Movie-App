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

// 리뷰 목록 조회
export const sendViewReviewRequest = async (reviewId: string | undefined) => {
  try {
    const response = await axios.get(`${BASE_URL}/review/view`, {
      params: {
        id: reviewId,
      },
    });
    console.log('sendViewReviewRequest', response);
    return response.data.reviews;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      error.response?.status === 400 && alert('리뷰 목록 조회에 실패했습니다.');
    }
  }
};

// 리뷰 삭제
export const sendDeleteReviewRequset = async (reviewId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/review/delete`, {
      params: {
        id: reviewId,
      },
    });
    console.log('sendDeleteReviewRequset', response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      error.response?.status === 400 && alert('리뷰 삭제에 실패했습니다.');
    }
  }
};

// 리뷰 조회
export const sendGetReviewRequset = async (
  userId: string | undefined,
  movieId: number
) => {
  try {
    const response = await axios.get(`${BASE_URL}/review/find`, {
      params: {
        userId,
        movieId,
      },
    });
    console.log('sendGetReviewRequset', response);
    return response.data.review;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      error.response?.status === 400 && alert('리뷰 조회에 실패했습니다.');
    }
  }
};

// 리뷰 수정
export const sendUpdateReviewRequest = async (formData: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/review/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('sendUpdateReviewRequest', response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      error.response?.status === 400 && alert('리뷰 수정에 실패했습니다.');
    }
  }
};
