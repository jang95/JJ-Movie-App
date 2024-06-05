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
      <section className='my-8'>
        <h2 className='text-2xl font-semibold m-4'>{title}</h2>
        <div className='flex justify-around flex-wrap'>
          <CrewCard crewList={crewType} />
        </div>
      </section>
    );

  return (
    <>
      {renderCrewSection(crewList.cast, '주요 출연진')}
      {renderCrewSection(crewList.crew, '주요 제작진')}
    </>
  );
};

export default CreditsList;
