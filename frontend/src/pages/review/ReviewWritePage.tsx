import { useState } from 'react';
import { useAuthStore } from './../../store/authStore';
import { sendCreateReviewRequest } from '../../api/reviewApi';
import { useMovieStore } from '../../store/movieStore';
import Button from '../../ui/Button';
import ReviewMovieInfo from '../../components/review/ReviewMovieInfo';
import Rating from '../../components/Rating';

export interface ReviewData {
  _id?: string;
  rating: number;
  content: string;
}

const ReviewWritePage = () => {
  const { movie } = useMovieStore();
  const { user } = useAuthStore();

  const [review, setReview] = useState<ReviewData>({
    rating: 0,
    content: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReview((prevReviewData) => ({
      ...prevReviewData,
      [name]: value,
    }));
  };

  const createFormData = (data: ReviewData) => {
    const formData = new FormData();

    formData.append(
      'review',
      JSON.stringify({
        rating: data.rating.toString(),
        content: data.content,
      })
    );

    formData.append(
      'movie',
      JSON.stringify({
        id: movie!.id,
        title: movie!.title,
      })
    );

    formData.append(
      'author',
      JSON.stringify({
        _id: user?._id,
        nickName: user?.nickName,
        email: user?.email,
      })
    );

    return formData;
  };

  const reviewDataValidate = () => {
    const newErrors: { [key: string]: string } = {};

    if (review.rating <= 0) {
      newErrors.rating = '평점은 최소 1점 입니다.';
    }

    if (review.content.trim().length < 2) {
      newErrors.content = '리뷰 내용은 최소 2글자 이상입니다.';
    }

    return newErrors;
  };

  const reviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = reviewDataValidate();
    if (Object.keys(errors).length === 0) {
      setErrors(errors);
      return;
    }

    const data = createFormData(review);
    try {
      await sendCreateReviewRequest(data);
      window.location.replace(`/movie/${movie!.id}`);
    } catch (error) {
      console.log('리뷰 생성 오류');
    }
  };

  return (
    <div className='max-w-[1024px] mx-auto p-4'>
      <ReviewMovieInfo />
      <div className='mt-8 bg-white p-8 border-4 rounded-lg'>
        <form className='p-4' onSubmit={reviewSubmit}>
          <Rating
            rating={review.rating}
            errorMsg={errors.rating}
            onRatingChange={(star) =>
              setReview((prevReview) => ({
                ...prevReview,
                ['rating']: star,
              }))
            }
          />
          <div className='mb-4'>
            <label
              htmlFor='content'
              className='block text-gray-700 text-2xl font-bold mb-2'
            >
              리뷰 작성
            </label>
            {errors.content && (
              <span className='text-red-500'>{errors.content}</span>
            )}
            <textarea
              id='content'
              name='content'
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={review.content}
              onChange={handleTextAreaChange}
              placeholder='이 영화에 대한 당신의 감상을 적어주세요'
            />
          </div>
          <Button
            type='submit'
            style='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600'
          >
            리뷰 작성 완료
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReviewWritePage;
