import { useState, useEffect } from 'react';
import { useAuthStore } from './../../store/authStore';
import {
  sendGetReviewRequset,
  sendUpdateReviewRequest,
} from '../../api/reviewApi';
import { ReviewData } from './ReviewWritePage';
import { useFetchMovie } from '../../store/movieStore';
import { IReview } from '../../components/review/ReviewList';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewMovieInfo from '../../components/review/ReviewMovieInfo';
import Button from '../../ui/Button';
import Rating from '../../components/Rating';

const ReviewEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthStore();
  const { movie, isLoading } = useFetchMovie(id);

  const [review, setReview] = useState<ReviewData>({
    _id: '',
    rating: 0,
    content: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (isLoading) {
    <h1>영화 정보를 가져오는 중입니다</h1>;
  }

  useEffect(() => {
    getReview();
  }, [movie]);

  // 리뷰 데이터 가져오기
  const getReview = async () => {
    try {
      const data: IReview = await sendGetReviewRequset(user?._id, movie!.id);
      const { review, _id } = data;
      setReview((prevReviewData) => ({
        ...prevReviewData,
        content: review.content,
        rating: review.rating,
        _id,
      }));
    } catch (error) {
      console.error('리뷰를 가져오는 중 오류가 발생했습니다.', error);
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReview((prevReviewData) => ({
      ...prevReviewData,
      [name]: value,
    }));
  };

  // 수정할 때 영화의 정보나 작성자의 정보변경 없음
  const createFormData = (data: ReviewData) => {
    const formData = new FormData();

    formData.append(
      'review',
      JSON.stringify({
        _id: data._id,
        rating: data.rating.toString(),
        content: data.content,
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
      await sendUpdateReviewRequest(data);
      navigate(`/movie/${movie!.id}`);
    } catch (error) {
      console.log('리뷰 수정 오류', error);
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
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
              value={review.content}
              onChange={handleTextAreaChange}
              placeholder='이 영화에 대한 당신의 감상을 적어주세요'
            />
          </div>
          <Button
            type='submit'
            style='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600'
          >
            리뷰 수정 완료
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReviewEditPage;
