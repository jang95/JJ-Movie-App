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

  if (data) {
    console.log('data', data);
    return (
      <>
        {data?.results.length > 0 ? (
          <div className='p-4'>
            {data.results.map((movie) => (
              <div
                key={movie.id}
                className='flex gap-4 border-2 rounded-md m-2 border-gray-500'
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img
                  className=''
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className='flex flex-col gap-2'>
                  {`${movie.title} (원제: ${movie.original_title})`}
                  <span>{`개봉일 ${movie.release_date}`}</span>
                  <p>{movie.overview}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </>
    );
  }

  return <div></div>;
};

export default SearchPage;
