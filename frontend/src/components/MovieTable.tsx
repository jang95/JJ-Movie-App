import { usePersonDataStore } from '../store/person';
import { MovieTableSkeleton } from '../ui/Skeletons';

const MovieTable = () => {
  const { personData, isLoading } = usePersonDataStore();

  if (isLoading) {
    return <MovieTableSkeleton />;
  }

  if (personData.credits.length === 0) {
    return <></>;
  }

  // 배우 영화 참여작 출시일에 맞춰 정렬
  const content = personData.credits
    .sort(
      (a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    )
    .map((movie) => (
      <tr key={movie.title} className='hover:bg-gray-100'>
        <td className='px-3 py-4 text-sm font-medium text-gray-900'>
          {movie.title}
        </td>
        <td className='px-3 py-4 text-sm text-gray-500 whitespace-nowrap'>
          {movie.release_date}
        </td>
        <td className='px-3 py-4 text-sm text-gray-500'>{movie.character}</td>
      </tr>
    ));

  return (
    <>
      <div className='text-2xl text-center md:text-3xl md:text-left font-bold mb-4'>
        출연 리스트
      </div>
      <table className='w-full shadow border-b border-gray-200 sm:rounded-lg mx-auto'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='px-3 py-3 text-left text-xs font-medium text-gray-500'>
              제목
            </th>
            <th className='px-3 py-3 text-left text-xs font-medium text-gray-500'>
              출시일
            </th>
            <th className='px-3 py-3 text-left text-xs font-medium text-gray-500'>
              배역
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>{content}</tbody>
      </table>
    </>
  );
};

export default MovieTable;
