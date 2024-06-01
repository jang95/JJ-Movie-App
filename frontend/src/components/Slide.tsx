import { useQuery } from '@tanstack/react-query';
import { fetchMoviesList } from '../api/moivesApi';
import { useNowPlayingStore } from '../store/nowPlaying';
import { useEffect } from 'react';

const Slide = () => {
  const { movieList, setMovies } = useNowPlayingStore();
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
  const IMAGE_SIZE = 'w200';

  const { data, isFetching } = useQuery({
    queryKey: ['popular'],
    queryFn: () => fetchMoviesList('popular'),
  });

  if (isFetching) {
    console.log('가져오는 중');
  }

  useEffect(() => {
    if (data && data.results !== movieList) {
      setMovies(data.results);
      console.log(data);
    }
  }, [data, movieList, setMovies]);

  return (
    <div>
      {data?.results &&
        data.results.map((item) => {
          return (
            <img
              key={item.id}
              src={`${BASE_IMAGE_URL}${IMAGE_SIZE}${item.poster_path}`}
            />
          );
        })}
    </div>
  );
};

export default Slide;
