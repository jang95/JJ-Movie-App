import { useQuery } from '@tanstack/react-query';
import { fetchMovieCredits } from '../api/moviesApi';
import { useParams } from 'react-router-dom';
import CrewCard from './CrewCard';
import { useEffect } from 'react';
import { ActorDetail, CrewDetail, useCrewStore } from '../store/crew';

const CreditsList = () => {
  const { id } = useParams();
  const { setCrewList, crewList } = useCrewStore();

  /**
   * 고쳐야 할 부분
   * 굳이 전역 상태관리를 통해 관리해야 할까?
   */
  const { data } = useQuery({
    queryKey: [id, 'credits'],
    queryFn: () => fetchMovieCredits(id),
  });

  useEffect(() => {
    if (data) {
      const { cast, crew } = data;
      setCrewList({ cast, crew });
    }
  }, [data, setCrewList]);

  // 출연진과 제작진 정보 표출
  const renderCrewSection = (
    crewType: ActorDetail[] | CrewDetail[],
    title: string
  ) =>
    crewType && (
      <>
        <p className='text-2xl font-semibold m-4'>{title}</p>
        <div className='p-4 flex justify-around flex-wrap lg:gap-2 lg:flex-nowrap overflow-x-auto'>
          <CrewCard crewList={crewType} />
        </div>
      </>
    );

  return (
    <>
      {renderCrewSection(crewList.cast, '주요 출연진')}
      {renderCrewSection(crewList.crew, '주요 제작진')}
    </>
  );
};

export default CreditsList;
