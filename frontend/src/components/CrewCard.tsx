import { ActorDetail, CrewDetail } from '../store/crew';

const FACE_URL = 'https://media.themoviedb.org/t/p/w276_and_h350_face/';

interface CrewCardProps {
  crewList: ActorDetail[] | CrewDetail[];
}

const CrewCard = ({ crewList }: CrewCardProps) => {
  const mainCrew = crewList.slice(0, 6);
  return (
    <>
      {mainCrew.map((crew) => {
        return (
          <div className='max-w-[200px] shadow-lg bg-white mt-4 rounded-md mb-4'>
            <img
              className='w-full rounded-t-md'
              src={`${FACE_URL}${crew.profile_path}`}
              alt={crew.name}
            />
            <div className='px-6 py-4'>
              <div className='font-bold text-xl mb-2'>{crew.name}</div>
              <p className='text-gray-700 text-base'>{crew.original_name}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CrewCard;
