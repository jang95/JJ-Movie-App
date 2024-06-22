import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchPersonDetail } from '../../api/personApi';
import { useEffect } from 'react';
import { usePersonDataStore } from '../../store/person';
import MainProfile from '../../components/MainProfile';
import SideProfile from '../../components/SideProfile';

const PersonDetailPage = () => {
  const { id } = useParams();
  const { setProfileData, setLoading } = usePersonDataStore();

  const { data, isLoading } = useQuery({
    queryKey: [id, 'person'],
    queryFn: () => fetchPersonDetail(id),
  });

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }

    if (data) {
      setProfileData(data);
      setLoading(false);
    }
  }, [data, isLoading, setLoading, setProfileData]);

  return (
    <div className='container flex flex-col mx-auto justify-center items-center 2xl:flex-row 2xl:items-start'>
      <SideProfile />
      <MainProfile />
    </div>
  );
};

export default PersonDetailPage;
