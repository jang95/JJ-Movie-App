import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMoviesList } from '../api/moviesApi';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
const IMAGE_SIZE = 200;
const INDEX_COUNT = 5;
const IMAGE_LAST_INDEX = 20;

interface SliderProps {
  type: string;
  title: string;
}

const Slider = ({ type, title }: SliderProps) => {
  const navigate = useNavigate();

  const [indexRange, setIndexRange] = useState({ start: 0, end: INDEX_COUNT });

  const { data, isLoading, isError } = useQuery({
    queryKey: [type],
    queryFn: () => fetchMoviesList(type),
  });

  const content = useMemo(() => {
    if (data) {
      const viewList = data.results.slice(indexRange.start, indexRange.end);
      return viewList.map((image) => (
        <div
          key={image.id}
          className={`gap-4 hover:cursor-pointer`}
          onClick={() => navigate(`/movie/${image.id}`)}
        >
          <img
            src={`${BASE_IMAGE_URL}w${IMAGE_SIZE}${image.poster_path}`}
            alt={`Image ${image.title}`}
            loading='lazy'
          />
        </div>
      ));
    }
    return (
      <div>
        영화 정보를 가져오는데 실패 했습니다. 잠시 후 다시 시도해주세요.
      </div>
    );
  }, [data, indexRange, navigate]);

  const handleNext = () => {
    setIndexRange((prev) => {
      const newStart =
        prev.start + INDEX_COUNT >= IMAGE_LAST_INDEX
          ? 0
          : prev.start + INDEX_COUNT;
      const newEnd = newStart + INDEX_COUNT;
      return { start: newStart, end: newEnd };
    });
  };

  const handlePrev = () => {
    setIndexRange((prev) => {
      const newStart =
        prev.start - INDEX_COUNT < 0
          ? IMAGE_LAST_INDEX - INDEX_COUNT
          : prev.start - INDEX_COUNT;
      const newEnd = newStart + INDEX_COUNT;
      return { start: newStart, end: newEnd };
    });
  };

  if (isLoading) {
    return <div>각 테마에 맞는 영화 불러오는 중...</div>;
  }

  if (isError) {
    return (
      <div>
        영화 정보를 가져오는데 실패 했습니다. 잠시 후 다시 시도해주세요.
      </div>
    );
  }

  return (
    <div className='container mx-auto my-8'>
      <div className='font-bold text-xl sm:text-3xl p-4'>{title}</div>
      <div className='flex'>
        <div className='flex gap-1 sm:gap-4 justify-center items-center p-4 w-full'>
          <MdArrowBackIos
            className='cursor-pointer'
            size={60}
            onClick={handlePrev}
          />
          {content}
          <MdArrowForwardIos
            className='cursor-pointer'
            size={60}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
