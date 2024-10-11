import { useState, useCallback, useEffect } from 'react';
import { useAuthStore } from './../../store/authStore';
import {
  sendGetReviewRequset,
  sendUpdateReviewRequest,
} from '../../api/reviewApi';
import { ReviewData } from './ReviewWritePage';
import { useMovieStore } from '../../store/movieStore';
import { IReview } from '../../components/review/ReviewList';

const ReviewEditPage = () => {
  const { movie } = useMovieStore();
  const { user } = useAuthStore();

  const [review, setReview] = useState<ReviewData>({
    _id: '',
    rating: 0,
    content: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 리뷰 데이터 가져오기
  useEffect(() => {
    const getReview = async () => {
      const review = await sendGetReviewRequset(user?._id, movie!.id);
      setReviewData(review);
    };

    getReview();
  }, [movie, user?._id]);

  const setReviewData = (data: IReview) => {
    const { review, _id } = data;
    setReview((prevReviewData) => ({
      ...prevReviewData,
      content: review.content,
      rating: review.rating,
      _id,
    }));
  };

  const reviewDataValidate = () => {
    const newErrors: { [key: string]: string } = {};

    if (review.rating <= 0) {
      newErrors.rating = '평점은 최소 1점 입니다.';
    }

    if (review.content.trim().length <= 2) {
      newErrors.content = '리뷰 내용은 최소 2글자 이상입니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
      _id: data._id,
      rating: data.rating.toString(),
      content: data.content,
    };

    formData.append('review', JSON.stringify(review));

    return formData;
  };

  const reviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (reviewDataValidate()) {
      const data = createFormData(review);
      try {
        await sendUpdateReviewRequest(data);
        window.location.replace(`/movie/${movie!.id}`);
      } catch (error) {
        console.log('리뷰 수정 오류');
      }
    }
  };

  return (
    <div className='max-w-[1024px] mx-auto p-4'>
      <div className='flex flex-col sm:flex-row justify-center items-center mt-8 gap-8 bg-white p-8 border-4 rounded-lg'>
        <div className='min-w-[200px]'>
          <img
            className='w-[200px] h-[300px] rounded-md object-cover'
            src={`https://media.themoviedb.org/t/p/w342/${movie!.poster_path}`}
            alt={movie!.title}
          />
        </div>
        <div className='flex flex-col gap-4 p-4'>
          <h2 className='text-2xl font-semibold'>{movie!.title}</h2>
          <p className='text-xl'>개봉일: {movie!.release_date}</p>
          <p>{movie!.overview}</p>
        </div>
      </div>
      <div className='mt-8 bg-white p-8 border-4 rounded-lg'>
        <form className='p-4' onSubmit={reviewSubmit}>
          <div className='flex flex-col sm:flex-row mb-4 items-center gap-4'>
            <span className='flex items-end h-10 text-gray-700 text-2xl font-bold'>
              평점을 남겨주세요
            </span>
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
            {errors.rating && (
              <span className='h-10 text-red-500 content-end'>
                {errors.rating}
              </span>
            )}
          </div>
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
          <button
            type='submit'
            className='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600'
          >
            리뷰 수정 완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewEditPage;
