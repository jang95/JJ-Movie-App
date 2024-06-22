import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';

export function SlideSkeleton() {
  return (
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
  );
}

export function SlideCardSkeleton() {
  return (
    <div className='animate-pulse'>
      <div className='bg-gray-300 rounded w-[200px] h-[300px]'></div>
    </div>
  );
}

export function MovieDetailBgSkeleton() {
  return (
    <div className='relative'>
      <div className='absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30'>
        <MovieInfoSkeleton />
      </div>
    </div>
  );
}

export function MovieInfoSkeleton() {
  return (
    <div className='flex flex-col sm:flex-row justify-center items-center p-8 sm:p-12'>
      <div className='min-w-[300px] min-h-[450px] z-10'></div>
      <div className='flex flex-col w-full sm:w-[700px] sm:pl-8 gap-4 mt-4 sm:mt-0'></div>
    </div>
  );
}

export function CrewListSkeleton() {
  return (
    <div className='flex justify-around flex-wrap lg:gap-2 lg:flex-nowrap'>
      <CrewCard />
      <CrewCard />
      <CrewCard />
      <CrewCard />
      <CrewCard />
      <CrewCard />
    </div>
  );
}

export function CrewCard() {
  return (
    <div className='flex flex-col justify-around shadow-lg bg-white mt-4 rounded-md mb-4' />
  );
}

export function MovieDetailPageSkeleton() {
  return (
    <div className='container mx-auto min-h-[1700px]'>
      <MovieDetailBgSkeleton />
      <CrewListSkeleton />
    </div>
  );
}
