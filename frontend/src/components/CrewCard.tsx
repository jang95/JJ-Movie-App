import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ActorDetail, CrewDetail } from '../types/crew';

const FACE_URL = 'https://media.themoviedb.org/t/p/w276_and_h350_face/';
const BASE_IMAGE_URL =
  'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg';

interface CrewCardProps {
  crewList: ActorDetail[] | CrewDetail[];
}

const CrewCard = ({ crewList }: CrewCardProps) => {
  const navigate = useNavigate();
  const [mainCrew, setMainCrew] = useState<(ActorDetail | CrewDetail)[]>([]);

  useEffect(() => {
    const uniqueData = [];
    const seen = new Set();

    // 사람은 같은데 직업이 여러 개인 경우, 중복 제거
    for (const item of crewList) {
      const key = `${item.name}-${item.profile_path}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueData.push(item);
      }

      if (uniqueData.length === 6) break;
    }

    setMainCrew(uniqueData);
  }, [crewList]);

  return (
    <>
      {mainCrew.map((crew) => {
        return (
          <div
            key={crew.credit_id}
            className='flex flex-col justify-around shadow-lg bg-white mt-4 rounded-md mb-4'
            onClick={() => navigate(`/person/${crew.id}`)}
          >
            <img
              className='w-[200px] h-[250px] rounded-t-md'
              src={
                crew.profile_path !== null
                  ? `${FACE_URL}${crew.profile_path}`
                  : BASE_IMAGE_URL
              }
              alt={crew.name}
            />
            <div className='p-4 w-[200px]'>
              <div className='font-bold text-xl mb-2 whitespace-nowrap overflow-x-auto'>
                {crew.name}
              </div>
              <p className='text-gray-700 text-base whitespace-nowrap overflow-x-auto'>
                {crew.original_name}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CrewCard;
