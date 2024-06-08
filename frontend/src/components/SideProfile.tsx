import { usePersonDataStore } from '../store/person';

const PROFILE = 'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/';

const SideProfile = () => {
  const { personData } = usePersonDataStore();

  if (!personData.profile) {
    return <div>불러오는 중...</div>;
  }
  return (
    <div className='flex flex-col'>
      <section>
        <div className='w-[300px] mb-8'>
          <img
            className='rounded-xl'
            src={`${PROFILE}${personData.profile.profile_path}`}
            alt={personData.profile.name}
          />
        </div>
      </section>

      <section className='flex flex-col gap-4'>
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
          {personData.profile.birthday}
        </p>
        <p className='flex flex-col'>
          <strong>출생지</strong>
          {personData.profile.place_of_birth}
        </p>
        <ol className='flex flex-col'>
          <strong>다른 언어 명칭</strong>
          {personData.profile.also_known_as.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default SideProfile;
