import { useNavigate } from 'react-router-dom';
import { usePersonDataStore } from '../store/person';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

// 배우의 출연작 중 인기 높은 영화 5개 표출
const FeaturedMovies = () => {
  const navigate = useNavigate();
  const { personData } = usePersonDataStore();
  return (
    <>
      <span className='text-3xl font-semibold pb-4'>
        {personData.profile.name}의 유명 작품
      </span>
      <div className='flex max-md:flex-wrap gap-2 mb-8'>
        {personData.credits
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 5)
          .map((movie) => (
            <div
              key={movie.id}
              className='flex flex-col items-center mx-auto'
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img
                className='rounded-md w-full h-[85%]'
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
              />
              <div className='text-md h-[15%] max-w-[200px]'>{movie.title}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default FeaturedMovies;
