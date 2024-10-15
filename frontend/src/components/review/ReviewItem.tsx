import { useEffect, useState } from 'react';
import { IReview } from './ReviewList';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import useDeleteReview from '../../hooks/reviews/useDeleteReview';
import formatToISODate from '../../util/formatToISODate';
import Button from '../../ui/Button';

const ReviewItem = ({
  review,
  author,
  updatedAt,
  _id,
  movie,
  type,
}: IReview) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { deleteReview, loading } = useDeleteReview(_id);
  const [isMyRivew, setIsMyReview] = useState<boolean>(false);

  useEffect(() => {
    if (user?._id === author!._id) {
      setIsMyReview(true);
    }
  }, [review, author, user]);

  return (
    <div className='pt-11 pb-8 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto'>
      <div className='flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4'>
        <div className='flex items-center gap-3'>
          <h6 className='font-semibold text-lg leading-8 text-indigo-600'>
            {type === 'user' ? movie!.title : author!.nickName}
          </h6>
        </div>
        {isMyRivew && (
          <div className='flex gap-2'>
            <Button
              type={'button'}
              secondary={true}
              onClick={() => navigate(`/review/edit/${movie?.id}`)}
            >
              수정
            </Button>
            <Button
              type={'button'}
              disabled={loading}
              danger={true}
              onClick={deleteReview}
            >
              {loading ? '삭제 중...' : '삭제'}
            </Button>
          </div>
        )}
      </div>
      <div className='flex justify-between'>
        <span className='font-normal text-lg leading-8 text-gray-400 max-xl:text-justify'>
          {review.content}
        </span>
        <span className='font-semibold text-lg leading-8 text-gray-400'>
          {formatToISODate(updatedAt)}
        </span>
      </div>
    </div>
  );
};

export default ReviewItem;
