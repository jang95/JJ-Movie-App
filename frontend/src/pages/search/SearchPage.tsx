import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMovieSearch } from '../../api/moviesApi';

const SearchPage = () => {
  const location = new URLSearchParams(useLocation().search);
  const query = location.get('query');
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['searchMovies', query],
    queryFn: () => fetchMovieSearch(query || ''),
    enabled: !!query, // query가 존재할 때만 쿼리 실행
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

  let content;

  if (data) {
    if (data?.results.length > 0) {
      content = data.results.map((movie) => (
        <div
          key={movie.id}
          className='flex flex-col min-w-[300px] md:flex-row gap-4 shadow rounded-md m-2 border-gray-500'
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          <div className='flex items-center min-w-[200px] max-w-[200px] mx-auto md:mx-0'>
            <img
              className='w-[200px] h-[300px] rounded-md object-cover'
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          <div className='flex flex-col w-full md:w-[90%] gap-4 p-4'>
            <span className='text-xl md:text-2xl'>
              {`${movie.title} (원제: ${movie.original_title})`}
            </span>
            <span className='text-lg'>{`개봉일 ${movie.release_date}`}</span>
            <div className='h-[150px] overflow-y-scroll md:h-auto md:overflow-y-hidden'>
              {movie.overview}
            </div>
          </div>
        </div>
      ));
    } else {
      content = <p>No results found.</p>;
    }
  }

  return <div className='p-4'>{content}</div>;
};

export default SearchPage;
