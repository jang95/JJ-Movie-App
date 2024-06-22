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
    <div className='relative bg-gray-200 animate-pulse'>
      <div className='absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30'>
        <MovieInfoSkeleton />
      </div>
    </div>
  );
}

export function MovieInfoSkeleton() {
  return (
    <div className='flex flex-col sm:flex-row justify-center items-center p-8 sm:p-12 bg-gray-400 animate-pulse'>
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
    <div className='flex flex-col justify-around mt-4 rounded-md mb-4 bg-gray-400 animate-pulse' />
  );
}

export function MovieDetailPageSkeleton() {
  return (
    <div className='container mx-auto min-h-[1700px] bg-gray-200 animate-pulse'>
      <MovieDetailBgSkeleton />
      <CrewListSkeleton />
    </div>
  );
}

export function SideProfileSkeleton() {
  return (
    <div className='flex max-md:flex-col 2xl:flex-col items-center py-8 px-4'>
      <section className='mb-8'>
        <div className='w-[300px] h-[450px] bg-gray-400 rounded-xl animate-pulse'></div>
      </section>

      <section className='flex flex-col min-w-[400px] min-h-[300px] gap-4 p-8'>
        <span className='text-2xl font-semibold bg-gray-400 h-6 w-24 rounded animate-pulse'></span>
        <SideProfileItemSkeleton />
        <SideProfileItemSkeleton />
        <SideProfileItemSkeleton />
        <SideProfileItemSkeleton />
      </section>
    </div>
  );
}

export function SideProfileItemSkeleton() {
  return (
    <p className='flex flex-col bg-gray-400'>
      <strong className='bg-gray-200 h-4 w-16 rounded animate-pulse'></strong>
      <span className='bg-gray-200 h-4 w-24 rounded animate-pulse'></span>
    </p>
  );
}

export function FeaturedMoviesSkeleton() {
  return (
    <>
      <span className='text-3xl font-semibold pb-4 bg-gray-400 animate-pulse'></span>
      <div className='flex max-lg:flex-wrap gap-4 mb-8 justify-center bg-gray-400 animate-pulse'>
        <FeaturedMoviesCardSkeleton />
        <FeaturedMoviesCardSkeleton />
        <FeaturedMoviesCardSkeleton />
        <FeaturedMoviesCardSkeleton />
        <FeaturedMoviesCardSkeleton />
      </div>
    </>
  );
}

export function FeaturedMoviesCardSkeleton() {
  return (
    <div className='flex flex-col items-center w-[200px]'>
      <img className='rounded-md w-[200px] h-[300px] border' />
      <div className='text-md h-[15%] max-w-[200px] line-clamp-1'></div>
    </div>
  );
}

export function MovieTableSkeleton() {
  return (
    <>
      <div className='text-3xl font-bold mb-4 '>출연 리스트</div>
      <div className='shadow border-b border-gray-200 sm:rounded-lg'>
        <table className='w-full'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500'>
                제목
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500'>
                출시일
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500'>
                배역
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'></tbody>
        </table>
      </div>
    </>
  );
}
