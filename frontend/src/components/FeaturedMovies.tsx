import { useNavigate } from 'react-router-dom';
import { usePersonDataStore } from '../store/person';
import { FeaturedMoviesSkeleton } from '../ui/Skeletons';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

// 배우의 출연작 중 인기 높은 영화 5개 표출
const FeaturedMovies = () => {
  const navigate = useNavigate();
  const { personData, isLoading } = usePersonDataStore();

  if (isLoading) {
    return <FeaturedMoviesSkeleton />;
  }

  if (personData.credits.length === 0) {
    return (
      <>
        <span className='text-3xl font-semibold pb-4'>
          {personData.profile.name}의 유명 작품
        </span>
        <p>해당 내용에 대한 정보가 없습니다.</p>
      </>
    );
  }

  const sortMovies = personData.credits
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5);

  return (
    <>
      <span className='text-3xl font-semibold pb-4'>
        {personData.profile.name}의 유명 작품
      </span>
      <div className='flex max-lg:flex-wrap gap-4 mb-8 justify-center'>
        {sortMovies.map((movie) => (
          <div
            key={movie.id}
            className='flex flex-col items-center w-[200px]'
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img
              className='rounded-md w-[200px] h-[300px] border'
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
            />
            <div className='text-md h-[15%] max-w-[200px] line-clamp-1'>
              {movie.title}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedMovies;
