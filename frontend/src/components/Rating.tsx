import Button from '../ui/Button';

interface RatringProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  errorMsg: string;
}

const Rating = ({ rating, onRatingChange, errorMsg }: RatringProps) => {
  return (
    <div className='flex flex-col sm:flex-row mb-4 items-center gap-4'>
      <span className='flex items-end h-10 text-gray-700 text-2xl font-bold'>
        평점을 남겨주세요
      </span>
      <div id='rating' className='flex'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Button
            type='button'
            key={star}
            style={`w-10 h-10 text-2xl ${
              star <= rating ? 'text-yellow-500' : 'text-gray-300'
            }`}
            onClick={() => onRatingChange(star)}
          >
            ★
          </Button>
        ))}
      </div>
      {errorMsg && (
        <span className='h-10 text-red-500 content-end'>{errorMsg}</span>
      )}
    </div>
  );
};

export default Rating;
