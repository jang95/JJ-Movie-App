import { useNavigate, useParams } from 'react-router-dom';
import { fetchMovieDetail, fetchMovieReleaseDates } from '../../api/moviesApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getAgeRatingClass, getPreferenceColor } from '../../util/rating';
import CreditsList from '../../components/CreditsList';
import { MovieDetailPageSkeleton } from '../../ui/Skeletons';

const BACKGROUND_IMAGE_URL = 'https://media.themoviedb.org/t/p/w1280/';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ageRating, setAgeRating] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: [id],
    queryFn: () => fetchMovieDetail(id),
  });

  const { data: age } = useQuery({
    queryKey: [id, 'age-rating'],
    queryFn: () => fetchMovieReleaseDates(id),
  });

  useEffect(() => {
    if (age) {
      const check = age.results.filter((item) => item.iso_3166_1 === 'KR');
      if (check.length === 0) {
        setAgeRating('NR');
      } else if (check[0].release_dates[0].certification === '') {
        setAgeRating('R');
      } else {
        setAgeRating(check[0].release_dates[0].certification);
      }
    }
  }, [age]);

  if (isLoading) {
    return <MovieDetailPageSkeleton />;
  }

  let content;

  if (data) {
    const userScore = Math.floor(data.vote_average * 10);

    const backgroundImageStyle = {
      backgroundImage: `url(${BACKGROUND_IMAGE_URL}${data.backdrop_path})`,
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
              src={`https://media.themoviedb.org/t/p/w342/${data.poster_path}`}
              alt={data.title}
              className='w-[300px] h-[450px]'
            />
          </div>
          <div className='flex flex-col w-full md:w-[700px] md:pl-8 gap-4 mt-4 sm:mt-0'>
            <span className='text-2xl md:text-3xl font-bold mb-2'>
              {data?.title}
              <sub
                className={`ml-2 p-1 rounded ${getAgeRatingClass(ageRating)}`}
              >
                {ageRating}
              </sub>
            </span>
            <div className='flex flex-col gap-2 text-sm md:text-base font-semibold'>
              <span>개봉일: {data.release_date}</span>
              <span>장르: {data.genres.map((genre) => `${genre.name} `)}</span>
              <span>
                러닝 타임: {data.runtime && Math.floor(data.runtime / 60)}
                시간 {data.runtime && Math.floor(data.runtime % 60)}분
              </span>
            </div>
            <div className='flex items-center font-semibold'>
              시청자 선호도:
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
                      title: data.title,
                      release: data.release_date,
                      overview: data.overview,
                      poster: data.poster_path,
                    },
                  })
                }
              >
                당신의 생각은 어떤가요?
              </button>
            </div>
            <span className='text-lg md:text-xl font-bold'>{data.tagline}</span>
            <span className='font-extrabold'>{data.overview}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container flex flex-col mx-auto sm:px-8'>
      {content}
      <CreditsList />
    </div>
  );
};

export default MovieDetailPage;
