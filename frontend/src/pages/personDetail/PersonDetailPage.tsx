import { useParams } from 'react-router-dom';

import MainProfile from '../../components/MainProfile';
import SideProfile from '../../components/SideProfile';
import {
  useFetchPersonDetail,
  useFetchPersonMovieCredits,
} from '../../store/personStore';

const PersonDetailPage = () => {
  const { id } = useParams();
  useFetchPersonDetail(id);
  useFetchPersonMovieCredits(id);

  return (
    <div className='container flex flex-col mx-auto justify-center items-center 2xl:flex-row 2xl:items-start'>
      <SideProfile />
      <MainProfile />
    </div>
  );
};

export default PersonDetailPage;
