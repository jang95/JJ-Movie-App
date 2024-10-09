import { useQuery } from '@tanstack/react-query';
import ReviewItem from './ReviewItem';
import { useAuthStore } from '../../store/authStore';
import { sendGetUserReviews } from '../../api/userApi';
import { IReview } from '../review/ReviewList';

const ReviewList = () => {
  const { user } = useAuthStore();
  const { data } = useQuery({
    queryKey: [user!._id, 'userReviews'],
    queryFn: () => sendGetUserReviews(user!._id),
  });

  return (
    <div className='relative'>
      <div className='w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto'>
        {data &&
          data.reviews.map((item: IReview) => (
            <ReviewItem key={item._id} reviewData={item} />
          ))}
      </div>
    </div>
  );
};

export default ReviewList;
