import { useNavigate } from 'react-router-dom';
import { ActorDetail, CrewDetail } from '../store/crew';

const FACE_URL = 'https://media.themoviedb.org/t/p/w276_and_h350_face/';
const BASE_IMAGE_URL =
  'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg';

interface CrewCardProps {
  crewList: ActorDetail[] | CrewDetail[];
}

const CrewCard = ({ crewList }: CrewCardProps) => {
  const navigate = useNavigate();
  const mainCrew = crewList.slice(0, 6);

  return (
    <>
      {mainCrew.map((crew) => {
        return (
          <div
            key={crew.credit_id}
            className='max-w-[200px] shadow-lg bg-white mt-4 rounded-md mb-4'
            onClick={() => navigate(`/person/${crew.id}`)}
          >
            <img
              className='w-full rounded-t-md'
              src={
                crew.profile_path !== null
                  ? `${FACE_URL}${crew.profile_path}`
                  : BASE_IMAGE_URL
              }
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
