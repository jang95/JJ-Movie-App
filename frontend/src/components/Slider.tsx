import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMoviesList } from '../api/moviesApi';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
const IMAGE_SIZE = 200;
const INDEX_COUNT = 5;

interface SliderProps {
  type: string;
  title: string;
}

const Slider = ({ type, title }: SliderProps) => {
  const navigate = useNavigate();

  const [slideIndex, setSlideIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(INDEX_COUNT);

  const { data, isLoading } = useQuery({
    queryKey: [type],
    queryFn: () => fetchMoviesList(type),
  });

  if (isLoading) {
    return <div>각 테마에 맞는 영화 불러오는 중...</div>;
  }

  let content;

  if (data) {
    const viewList = data.results.slice(slideIndex, lastIndex);

    content = viewList.map((image) => (
      <div
        key={image.id}
        className={`gap-4 hover:cursor-pointer`}
        onClick={() => navigate(`/movie/${image.id}`)}
      >
        <img
          src={`${BASE_IMAGE_URL}w${IMAGE_SIZE}${image.poster_path}`}
          alt={`Image ${image.title}`}
        />
      </div>
    ));
  }

  const handleNext = () => {
    if (slideIndex < 15) {
      setSlideIndex((prev) => prev + INDEX_COUNT);
      setLastIndex((prev) => prev + INDEX_COUNT);
    } else if (slideIndex === 15) {
      setSlideIndex(0);
      setLastIndex(INDEX_COUNT);
    }
  };

  const handlePrev = () => {
    if (slideIndex > 0) {
      setSlideIndex((prev) => prev - INDEX_COUNT);
      setLastIndex((prev) => prev - INDEX_COUNT);
    } else if (slideIndex === 0) {
      setSlideIndex(15);
      setLastIndex(20);
    }
  };

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
