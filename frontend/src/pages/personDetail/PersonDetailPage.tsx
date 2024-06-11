import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchPersonDetail } from '../../api/personApi';
import { useEffect } from 'react';
import { usePersonDataStore } from '../../store/person';
import MainProfile from '../../components/MainProfile';
import SideProfile from '../../components/SideProfile';

const PersonDetailPage = () => {
  const { id } = useParams();
  const { setProfileData } = usePersonDataStore();

  const { data } = useQuery({
    queryKey: [id, 'person'],
    queryFn: () => fetchPersonDetail(id),
  });

  useEffect(() => {
    if (data) {
      setProfileData(data);
    }
  }, [data, setProfileData]);

  return (
    <div className='flex flex-col lg:flex-row justify-center items-center lg:items-start py-12 px-8 gap-6'>
      <SideProfile />
      <MainProfile />
    </div>
  );
};

export default PersonDetailPage;
