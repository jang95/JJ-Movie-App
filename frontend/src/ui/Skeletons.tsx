import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';

export function SlideSkeleton() {
  return (
    <div className='container mx-auto'>
      <div className='font-bold text-xl sm:text-3xl p-4'>
        <div className='flex'>
          <div className='flex gap-1 sm:gap-4 justify-center items-center p-4 w-full min-w-[400px]'>
            <MdArrowBackIos size={60} />
            <SlideCardSkeleton />
            <SlideCardSkeleton />
            <SlideCardSkeleton />
            <SlideCardSkeleton />
            <SlideCardSkeleton />
            <MdArrowForwardIos size={60} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SlideCardSkeleton() {
  return (
    <div className='animate-pulse'>
      <div className='bg-gray-300 rounded w-[200px] h-[300px]'></div>
    </div>
  );
}
