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
    // 브라우저 창 크기에 비례해 보여줄 이미지 수
    const handleResize = () => {
      if (slideRef.current) {
        // 해당 DOM요소의 너비
        const sliderWidth = slideRef.current.offsetWidth;
        // 너비를 이미지 사이즈로 나눔
        const itemsPerSlide = Math.floor(sliderWidth / IMAGE_SIZE);
        setImagesPerPage(itemsPerSlide);
      }
    };

    handleResize();

    // 브라우저 창 크기가 조절될 때 호출
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
    if (!data) return null;

    // 슬라이드 마지막 index
    const lastSlideIndex = Math.ceil(data.results.length / imagesPerPage) - 1;
    // 마지막 슬라이드에 있는 이미지 수
    const lastSlideImages = data.results.slice(lastSlideIndex * imagesPerPage);
    // 부족한 이미지 채울 더미 수
    const emptySlots = imagesPerPage - lastSlideImages.length;

    const imagesToDisplay = data.results.map((image) => (
      <img
        key={image.id}
        src={`${BASE_IMAGE_URL}w${IMAGE_SIZE}${image.poster_path}`}
        alt={`Image ${image.title}`}
        className='transition-transform duration-500'
      />
    ));

    // 마지막 슬라이드일 때 빈 이미지 슬롯 추가
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
          <MdArrowBackIos onClick={showPreviousImages} size={40} />
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
