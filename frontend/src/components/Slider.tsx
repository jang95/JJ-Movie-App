import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMoviesList } from '../api/moviesApi';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
const IMAGE_SIZE = 200;

interface SliderProps {
  type: string;
  title: string;
}

const Slider = ({ type, title }: SliderProps) => {
  const slideRef = useRef<HTMLDivElement | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [imagesPerPage, setImagesPerPage] = useState(6);

  const { data, isFetching } = useQuery({
    queryKey: [type],
    queryFn: () => fetchMoviesList(type),
  });

  if (isFetching) {
    console.log('이미지 리스트 가져오는 중');
  }

  useEffect(() => {
    const handleResize = () => {
      if (slideRef.current) {
        const sliderWidth = slideRef.current.offsetWidth;
        const itemsPerSlide = Math.floor(sliderWidth / IMAGE_SIZE);
        setImagesPerPage(itemsPerSlide);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showNextImages = () => {
    if (data && startIndex + imagesPerPage < data.results.length) {
      setStartIndex(startIndex + imagesPerPage);
    }
  };

  const showPreviousImages = () => {
    if (startIndex - imagesPerPage >= 0) {
      setStartIndex(startIndex - imagesPerPage);
    }
  };

  const showImages = () => {
    if (!data) return <div>영화 정보를 가져오는데 실패</div>;

    // 슬라이드 마지막 index
    const lastSlideIndex = Math.ceil(data.results.length / imagesPerPage) - 1;
    // 마지막 슬라이드에 있는 이미지 수
    const lastSlideImages = data.results.slice(lastSlideIndex * imagesPerPage);
    // 부족한 이미지 채울 더미 수
    const emptySlots = imagesPerPage - lastSlideImages.length;

    const imagesToDisplay = data.results.map((image) => (
      <div
        key={image.id}
        className={`group w-[200px] h-[300px] hover:w-[400px] hover:h-[600px] hover:relative transition-all duration-500`}
      >
        <img
          className='object-fill w-full h-full hover:h-3/4'
          src={`${BASE_IMAGE_URL}w${IMAGE_SIZE}${image.poster_path}`}
          alt={`Image ${image.title}`}
        />
        <div className='p-4 bg-gray-400 hidden group-hover:block'>
          <h3 className='font-bold text-lg'>{image.title}</h3>
          <p className='text-sm line-clamp-3'>{image.overview}</p>
        </div>
      </div>
    ));

    if (startIndex + imagesPerPage > data.results.length) {
      for (let i = 0; i < emptySlots; i++) {
        imagesToDisplay.push(
          <div className='w-[200px] h-[300px]' key={`dummy-${i}`} />
        );
      }
    }

    return imagesToDisplay;
  };

  return (
    <div className='container mx-auto my-8'>
      <div className='font-bold text-3xl p-4'>{title}</div>
      <div className='flex items-center'>
        {startIndex === 0 ? null : (
          <div className='h-full'>
            <MdArrowBackIos onClick={showPreviousImages} size={40} />
          </div>
        )}
        <div ref={slideRef} className='flex overflow-hidden w-full'>
          <div
            className='flex transition-transform duration-500 gap-2'
            style={{ transform: `translateX(-${startIndex * IMAGE_SIZE}px)` }}
          >
            {showImages()}
          </div>
        </div>
        {data && startIndex + imagesPerPage >= data.results.length ? null : (
          <MdArrowForwardIos onClick={showNextImages} size={40} />
        )}
      </div>
    </div>
  );
};

export default Slider;
