import { useNavigate, useParams } from 'react-router-dom';
import { getAgeRatingClass, getPreferenceColor } from '../../util/rating';
import CreditsList from '../../components/CreditsList';
import { MovieDetailPageSkeleton } from '../../ui/Skeletons';
import ReviewList from '../../components/review/ReviewList';
import { useFetchMovie, useFetchMovieAgeRating } from '../../store/movieStore';

const BACKGROUND_IMAGE_URL = 'https://media.themoviedb.org/t/p/w1280/';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { movie, isLoading } = useFetchMovie(id);
  const { ageRating } = useFetchMovieAgeRating(id);

  if (isLoading) {
    return <MovieDetailPageSkeleton />;
  }

  let content;

  if (movie) {
    const userScore = Math.floor(movie.vote_average * 10);

    const backgroundImageStyle = {
      backgroundImage: `url(${BACKGROUND_IMAGE_URL}${movie.backdrop_path})`,
    };

    content = (
      <div className='relative'>
        <div
          style={backgroundImageStyle}
          className='absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30'
        />

        <div className='flex flex-col md:flex-row justify-center items-center p-8 sm:p-12 gap-2'>
          <div className='min-w-[300px] min-h-[450px] z-10'>
            <img
              src={`https://media.themoviedb.org/t/p/w342/${movie.poster_path}`}
              alt={movie.title}
              className='w-[300px] h-[450px]'
            />
          </div>
          <div className='flex flex-col w-full md:w-[700px] md:pl-8 gap-4 mt-4 sm:mt-0'>
            <span className='text-2xl md:text-3xl font-bold mb-2'>
              {movie?.title}
              <sub
                className={`ml-2 p-1 rounded ${getAgeRatingClass(ageRating)}`}
              >
                {ageRating}
              </sub>
            </span>
            <div className='flex flex-col gap-2 text-sm md:text-base font-semibold'>
              <span>개봉일: {movie.release_date}</span>
              <span>장르: {movie.genres.map((genre) => `${genre.name} `)}</span>
              <span>
                러닝 타임: {movie.runtime && Math.floor(movie.runtime / 60)}
                시간 {movie.runtime && Math.floor(movie.runtime % 60)}분
              </span>
            </div>
            <div className='flex items-center font-semibold'>
              시청자 선호도
              <span
                className={`text-lg ml-2 px-2 py-1 rounded z-10 ${getPreferenceColor(
                  userScore
                )}`}
              >
                {userScore}%
              </span>
            </div>
            <div className='z-10'>
              <button
                className='text-white bg-lime-600 px-2 py-1 rounded'
                onClick={() =>
                  navigate(`/review/write/${id}`, {
                    state: {
                      id,
                      title: movie.title,
                      release: movie.release_date,
                      overview: movie.overview,
                      poster: movie.poster_path,
                    },
                  })
                }
              >
                당신의 생각은 어떤가요?
              </button>
            </div>
            <span className='text-lg md:text-xl font-bold'>
              {movie.tagline}
            </span>
            <span className='font-extrabold'>{movie.overview}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container flex flex-col mx-auto sm:px-8'>
      {content}
      <ReviewList type={'movie'} id={movie?.id} />
      <CreditsList />
    </div>
  );
};

export default MovieDetailPage;
