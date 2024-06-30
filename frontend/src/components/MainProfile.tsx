import { useQuery } from '@tanstack/react-query';
import { usePersonDataStore } from '../store/person';
import { fetchPersonMovie_credits } from '../api/personApi';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import MovieTable from './MovieTable';
import FeaturedMovies from './FeaturedMovies';

const MainProfile = () => {
  const { setCreditsData } = usePersonDataStore();
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: [id],
    queryFn: () => fetchPersonMovie_credits(id),
  });

  useEffect(() => {
    if (data) {
      setCreditsData(data);
    }
  }, [data, setCreditsData]);

  return (
    <div className='flex flex-col py-8 px-4 gap-4'>
      <FeaturedMovies />
      <MovieTable />
    </div>
  );
};

export default MainProfile;
