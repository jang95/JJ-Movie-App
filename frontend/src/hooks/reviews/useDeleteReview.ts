import { useState } from 'react';
import { sendDeleteReviewRequset } from '../../api/reviewApi';

const useDeleteReview = (reviewId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteReview = async () => {
    const deleteMessage = confirm('해당 리뷰를 삭제하시겠습니까?');
    if (deleteMessage) {
      setLoading(true);
      try {
        await sendDeleteReviewRequset(reviewId);
        window.location.reload();
      } catch (error) {
        setError(
          '리뷰 삭제 중 에러가 발생했습니다. 잠시 후 다시 이용해주세요.'
        );
        console.error('리뷰 삭제 에러:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return { deleteReview, loading, error };
};

export default useDeleteReview;
