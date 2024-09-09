import { useState, useCallback } from 'react';

import { useLocation } from 'react-router-dom';
import InputField from '../../components/form/InputField';
import { useAuthStore } from './../../store/authStore';
import { sendCreateReviewRequest } from '../../api/postApi';

interface ReviewData {
  title: string;
  rating: number;
  content: string;
}

const ReviewWritePage = () => {
  const location = useLocation();
  const { id, title, release, overview, poster } = location.state;
  const { user } = useAuthStore();

  const [review, setReview] = useState<ReviewData>({
    title: '',
    rating: 0,
    content: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const reviewDataValidate = () => {
    const newErrors: { [key: string]: string } = {};

    if (review.title.trim() === '') {
      newErrors.title = '리뷰 제목을 입력해주세요';
    }

    if (review.rating <= 0) {
      newErrors.rating = '평점은 최소 1점 입니다.';
    }

    if (review.content.trim().length <= 2) {
      newErrors.rating = '리뷰 내용은 최소 2글자 이상입니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setReview((prevReviewData) => ({
        ...prevReviewData,
        [name]: value,
      }));
    },
    [setReview]
  );

  const handleTextAreaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setReview((prevReviewData) => ({
        ...prevReviewData,
        [name]: value,
      }));
    },
    [setReview]
  );

  const createFormData = (data: ReviewData) => {
    const formData = new FormData();

    const review = {
      title: data.title,
      rating: data.rating.toString(),
      content: data.content,
    };

    const movie = {
      id,
      title,
    };

    const author = {
      _id: user?._id,
      nickName: user?.nickName,
      email: user?.email,
    };

    formData.append('review', JSON.stringify(review));
    formData.append('movie', JSON.stringify(movie));
    formData.append('author', JSON.stringify(author));

    return formData;
  };

  const reviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (reviewDataValidate()) {
      const data = createFormData(review);
      try {
        await sendCreateReviewRequest(data);
      } catch (error) {
        console.log('리뷰 생성 오류');
      }
    }
  };

  return (
    <div className='max-w-[1024px] mx-auto p-4'>
      <div className='flex flex-col sm:flex-row justify-center items-center mt-8 gap-8 bg-white p-8 border-4 rounded-lg'>
        <div className='min-w-[200px]'>
          <img
            className='w-[200px] h-[300px] rounded-md object-cover'
            src={`https://media.themoviedb.org/t/p/w342/${poster}`}
            alt={title}
          />
        </div>
        <div className='flex flex-col gap-4 p-4'>
          <h2 className='text-2xl font-semibold'>{title}</h2>
          <p className='text-xl'>개봉일: {release}</p>
          <p>{overview}</p>
        </div>
      </div>
      <div className='mt-8 bg-white p-8 border-4 rounded-lg'>
        <h2 className='text-3xl font-bold mb-6 text-center'>리뷰 작성</h2>
        <form className='p-4' onSubmit={reviewSubmit}>
          <InputField
            label='리뷰'
            type='text'
            name='title'
            value={review.title}
            placeholder='리뷰 제목 작성해주세요'
            error={errors.title}
            onChange={handleInputChange}
          />
          <div className='mb-4'>
            <label
              htmlFor='rating'
              className='block text-gray-700 text-2xl font-bold mb-2'
            >
              평점을 남겨주세요
            </label>
            <div id='rating' className='flex'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type='button'
                  key={star}
                  className={`w-10 h-10 text-2xl ${
                    star <= review.rating ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  onClick={() =>
                    setReview((prevReview) => ({
                      ...prevReview,
                      ['rating']: star,
                    }))
                  }
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className='mb-4'>
            <label
              htmlFor='content'
              className='block text-gray-700 text-2xl font-bold mb-2'
            >
              리뷰 작성
            </label>
            <textarea
              id='content'
              name='content'
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={review.content}
              onChange={handleTextAreaChange}
              placeholder='이 영화에 대한 당신의 감상을 적어주세요'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600'
          >
            리뷰 작성 완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewWritePage;
