import { useNavigate } from 'react-router-dom';
import { IReview } from '../review/ReviewList';
import { sendDeleteReviewRequset } from '../../api/reviewApi';

interface ReviewItemProps {
  reviewData: IReview;
}

const ReviewItem = ({ reviewData }: ReviewItemProps) => {
  const navigate = useNavigate();

  // Todo...
  // 공동으로 쓰는 함수 => 합치기
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  // Todo...
  // 공동으로 쓰는 함수 => 합치기
  const deleteReview = async () => {
    const deleteMessage = confirm('해당 리뷰를 삭제하시겠습니까?');
    if (deleteMessage) {
      await sendDeleteReviewRequset(reviewData._id);
      window.location.reload();
    }
  };

  return (
    <div className='pt-11 pb-8 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto'>
      <div className='flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4'>
        <div className='flex items-center gap-3'>
          <h6 className='font-semibold text-lg leading-8 text-indigo-600 '>
            {reviewData.movie?.title}
          </h6>
        </div>
        <div className='flex flex-col gap-2'>
          <>
            <button
              className='bg-green-400 py-1 px-2 rounded-md'
              onClick={() => navigate(`/review/edit/${reviewData._id}`)}
            >
              수정
            </button>
            <button
              className='bg-red-400 py-1 px-2 rounded-md'
              onClick={deleteReview}
            >
              삭제
            </button>
          </>
        </div>
      </div>
      <div className='flex justify-between'>
        <span className='font-normal text-lg leading-8 text-gray-400 max-xl:text-justify'>
          {reviewData.review.content}
        </span>
        <span className='font-semibold text-lg leading-8 text-gray-400'>
          {formatDate(reviewData.updatedAt)}
        </span>
      </div>
    </div>
  );
};

export default ReviewItem;
