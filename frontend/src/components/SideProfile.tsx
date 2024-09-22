import { usePersonDataStore } from '../store/personStore';
import { SideProfileSkeleton } from '../ui/Skeletons';

const PROFILE = 'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/';
const BASE_IMAGE_URL =
  'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg';

const SideProfile = () => {
  const { personData, isLoading } = usePersonDataStore();

  if (isLoading) {
    return <SideProfileSkeleton />;
  }

  return (
    <div className='flex max-md:flex-col 2xl:flex-col items-center py-8 px-4'>
      <section className='mb-8'>
        <img
          className='rounded-xl w-[300px] h-[450px] p-2'
          src={
            personData.profile.profile_path !== null
              ? `${PROFILE}${personData.profile.profile_path}`
              : BASE_IMAGE_URL
          }
          alt={personData.profile.name}
        />
      </section>

      <section className='flex flex-col min-w-[360px] min-h-[300px] gap-4 py-4 px-12'>
        <span className='text-2xl font-semibold'>인물 정보</span>
        <p className='flex flex-col'>
          <strong>이름</strong>
          {personData.profile.name}
        </p>
        <p className='flex flex-col'>
          <strong>성별</strong>
          {personData.profile.gender === 1 ? '여자' : '남자'}
        </p>
        <p className='flex flex-col'>
          <strong>생년월일</strong>
          {personData.profile.birthday
            ? personData.profile.birthday
            : '정보 없음'}
        </p>
        <p className='flex flex-col'>
          <strong>출생지</strong>
          {personData.profile.place_of_birth
            ? personData.profile.place_of_birth
            : '정보 없음'}
        </p>
      </section>
    </div>
  );
};

export default SideProfile;
