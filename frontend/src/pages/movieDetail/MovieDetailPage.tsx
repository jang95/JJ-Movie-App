import { useParams } from 'react-router-dom';
import { fetchMovieDetail, fetchMovieReleaseDates } from '../../api/moviesApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getAgeRatingClass, getPreferenceColor } from '../../util/rating';

const BACKGROUND_IMAGE_URL = 'https://media.themoviedb.org/t/p/w1280/';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [ageRating, setAgeRating] = useState('');

  const { data } = useQuery({
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
      } else {
        setAgeRating(check[0].release_dates[0].certification);
      }
    }
  }, [age]);

  const backgroundImageStyle = data
    ? {
        backgroundImage: `url(${BACKGROUND_IMAGE_URL}${data.backdrop_path})`,
      }
    : {};

  const userScore =
    data && data.vote_average ? Math.floor(data.vote_average * 10) : 0;

  const content = data ? (
    <div className='flex flex-col sm:flex-row justify-center items-center p-8 sm:p-12'>
      <div className='w-[200px] h-[300px] sm:w-[300px] sm:h-[450px]'>
        <img
          src={`https://media.themoviedb.org/t/p/w342/${data?.poster_path}`}
          alt={data?.title}
          className='w-[200px] h-[300px] sm:w-[300px] sm:h-[450px] object-cover'
        />
      </div>
      <div className='flex flex-col w-full sm:w-[700px] sm:pl-8 gap-4 mt-4 sm:mt-0'>
        <span className='text-2xl sm:text-3xl font-bold mb-2'>
          {data?.title}
          <sup className={`ml-2 p-1 rounded ${getAgeRatingClass(ageRating)}`}>
            {ageRating}
          </sup>
        </span>

        <div className='flex flex-col gap-2 text-sm sm:text-base font-semibold'>
          <span>개봉일: {data?.release_date}</span>
          <span>장르: {data?.genres.map((genre) => `${genre.name} `)}</span>
          <span>
            러닝 타임: {data?.runtime && Math.floor(data?.runtime / 60)}
            시간 {data?.runtime && Math.floor(data?.runtime % 60)}분
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

        <span className='text-lg sm:text-xl font-bold'>{data?.tagline}</span>
        <span className='font-extrabold'>{data?.overview}</span>
      </div>
    </div>
  ) : null;

  return (
    <div className='relative'>
      <div
        style={backgroundImageStyle}
        className='absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30'
      />
      {content}
    </div>
  );
};

export default MovieDetailPage;
