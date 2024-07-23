import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMoviesList } from '../api/moviesApi';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { SlideSkeleton } from '../ui/Skeletons';
import { SliderProps } from '../pages/home/HomePage';
import SliderError from './error/SliderError';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
const IMAGE_SIZE = 200;
const INDEX_COUNT = 5;
const IMAGE_LAST_INDEX = 20;

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
          className={`hover:cursor-pointer w-[100px] h-[150px] lg:w-[200px] lg:h-[300px] flex-shrink-0`}
          onClick={() => navigate(`/movie/${image.id}`)}
        >
          <img
            src={`${BASE_IMAGE_URL}w${IMAGE_SIZE}${image.poster_path}`}
            srcSet={`${BASE_IMAGE_URL}w${IMAGE_SIZE}${image.poster_path}`}
            alt={`Image ${image.title}`}
            loading='lazy'
            className='w-full h-full object-cover rounded-md'
          />
        </div>
      ));
    }
    return null;
  }, [data, indexRange, navigate]);

  if (isLoading) {
    return <SlideSkeleton />;
  }

  if (isError) {
    return <SliderError type={type} title={title} />;
  }

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

  return (
    <>
      <div className='container mx-auto'>
        <div className='font-bold text-xl sm:text-3xl p-4'>{title}</div>
        <div className='flex items-center'>
          <MdArrowBackIos
            className='cursor-pointer w-20'
            size={60}
            onClick={handlePrev}
          />
          <div className='flex gap-1 sm:gap-4 justify-normal md:justify-around items-center py-4 w-full min-w-[400px] overflow-x-auto'>
            {content}
          </div>
          <MdArrowForwardIos
            className='cursor-pointer w-20'
            size={60}
            onClick={handleNext}
          />
        </div>
      </div>
    </>
  );
};

export default Slider;
