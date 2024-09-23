import MovieTable from './MovieTable';
import FeaturedMovies from './FeaturedMovies';

const MainProfile = () => {
  return (
    <div className='flex flex-col py-8 px-4 gap-4'>
      <FeaturedMovies />
      <MovieTable />
    </div>
  );
};

export default MainProfile;
