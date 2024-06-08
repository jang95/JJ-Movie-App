import { usePersonDataStore } from '../store/person';

const MovieTable = () => {
  const { personData } = usePersonDataStore();

  // 배우 영화 참여작 출시일에 맞춰 정렬
  const content = personData.credits
    .sort(
      (a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    )
    .map((movie) => (
      <tr key={movie.title} className='hover:bg-gray-100'>
        <td className='px-6 py-4 text-sm font-medium text-gray-900'>
          {movie.title}
        </td>
        <td className='px-6 py-4text-sm text-gray-500'>{movie.release_date}</td>
        <td className='px-6 py-4 text-sm text-gray-500'>{movie.character}</td>
      </tr>
    ));

  return (
    <>
      <div className='text-3xl font-bold mb-4'>출연 리스트</div>
      <div className='flex flex-col'>
        <div className='shadow border-b border-gray-200 sm:rounded-lg'>
          <table className='w-full'>
            <thead className='bg-gray-200'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500'
                >
                  제목
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500'
                >
                  출시일
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500'
                >
                  배역
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {content}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MovieTable;
