import { useMovieStore } from '../../store/movieStore';

const ReviewMovieInfo = () => {
  const { movie } = useMovieStore();

  if (!movie) {
    return <h2>영화 정보 로딩 중</h2>;
  }

  return (
    <div className='flex flex-col sm:flex-row justify-center items-center mt-8 gap-8 bg-white p-8 border-4 rounded-lg'>
      <div className='min-w-[200px]'>
        <img
          className='w-[200px] h-[300px] rounded-md object-cover'
          src={`https://media.themoviedb.org/t/p/w342/${movie!.poster_path}`}
          alt={movie!.title}
        />
      </div>
      <div className='flex flex-col gap-4 p-4'>
        <h2 className='text-2xl font-semibold'>{movie!.title}</h2>
        <p className='text-xl'>개봉일: {movie!.release_date}</p>
        <p>{movie!.overview}</p>
      </div>
    </div>
  );
};

export default ReviewMovieInfo;
