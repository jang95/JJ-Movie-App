import { SliderProps } from '../../pages/home/HomePage';

const SliderError = ({ type, title }: SliderProps) => {
  return (
    <div className='p-4'>
      <div className='text-lg md:text-3xl font-bold p-4'>{`${title}(${type}) 목록을 불러오지 못했습니다.`}</div>
      <p className='text-md md:text-lg text-center py-2'>
        새로고침을 하거나 잠시 후 다시 접속해 주시기 바랍니다.
      </p>
    </div>
  );
};

export default SliderError;
