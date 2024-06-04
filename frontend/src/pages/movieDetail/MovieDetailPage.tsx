import { useParams } from 'react-router-dom';
import { fetchMovieDetail, fetchMovieReleaseDates } from '../../api/moviesApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const BACKGROUND_IMAGE_URL = 'https://media.themoviedb.org/t/p/w1280/';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [ageRating, setAgeRating] = useState('');
  const { data, isFetching } = useQuery({
    queryKey: [id],
    queryFn: () => fetchMovieDetail(id),
  });

  const { data: age } = useQuery({
    queryKey: [id, 'age-rating'],
    queryFn: () => fetchMovieReleaseDates(id),
  });
  if (isFetching) {
    console.log('영화 상세 정보 가져오는 중');
  }

  useEffect(() => {
    if (age) {
      // console.log('영화 연령 정보', age);
      const check = age.results.filter((item: any) => item.iso_3166_1 === 'KR');
      console.log('영화 연령 정보', check[0]);
      if (check[0].release_dates) {
        setAgeRating(check[0].release_dates[0].certification);
      } else {
        setAgeRating('API 응답에서 한국 연령 정보를 찾을 수 없습니다.');
      }

      // console.log('check', check[0].release_dates[0].certification);
    }
  }, [age]);

  if (data) {
    console.log('영화 상세 정보', data);
  }

  const backgroundImageStyle = data
    ? {
        backgroundImage: `url(${BACKGROUND_IMAGE_URL}${data.backdrop_path})`,
      }
    : {};

  return (
    <div className='relative'>
      <div
        style={backgroundImageStyle}
        className='absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30'
      />
      <div className='relative z-10'>
        <div className='flex flex-col sm:flex-row justify-center items-center p-8 sm:p-12'>
          <div className='w-[200px] h-[300px] sm:w-[300px] sm:h-[450px]'>
            <img
              src={`https://media.themoviedb.org/t/p/w342/${data?.poster_path}`}
              alt={data?.title}
              className='w-[200px] h-[300px] sm:w-[300px] sm:h-[450px] object-cover'
            />
          </div>
          <div className='flex flex-col w-full sm:w-[700px] sm:pl-8 gap-4 mt-4 sm:mt-0'>
            {/* main 머리 */}
            <div>
              <div className='text-2xl sm:text-3xl font-bold mb-2'>
                {data?.title}
              </div>
              <div className='flex flex-col gap-2 text-sm sm:text-base font-semibold'>
                <span>{ageRating}</span>
                <span>개봉일: {data?.release_date}</span>
                <span>
                  장르: {data?.genres.map((genre) => `${genre.name} `)}
                </span>
                <span>
                  러닝 타임: {data?.runtime && Math.floor(data?.runtime / 60)}
                  시간 {data?.runtime && Math.floor(data?.runtime % 60)}분
                </span>
              </div>
            </div>

            {/* 메인 바디 */}
            <div>중간 정보</div>

            {/* 하단 설명 */}
            <div className='flex flex-col gap-2'>
              <span className='text-lg sm:text-xl font-bold'>
                {data?.tagline}
              </span>
              <span className='font-extrabold'>{data?.overview}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
