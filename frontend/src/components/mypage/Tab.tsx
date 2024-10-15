import { useState } from 'react';
import Tabs from './Tabs';
import ProfileCard from './ProfileCard';
import ReviewList from '../review/ReviewList';
import { useAuthStore } from '../../store/authStore';

const Tab = () => {
  const { user } = useAuthStore();
  const tabTitle = ['나의 정보', '내가 쓴 리뷰'];
  const [activeTab, setActiveTab] = useState('나의 정보');

  return (
    <>
      {/* 탭 부분 */}
      <div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700'>
        <ul className='flex flex-wrap'>
          {tabTitle.map((tab) => (
            <li
              className='me-2 cursor-pointer'
              key={tab}
              onClick={() => setActiveTab(tab)}
            >
              <Tabs title={tab} active={activeTab} />
            </li>
          ))}
        </ul>
      </div>
      {/* 컨텐츠 부분 */}
      <div className='w-full'>
        {activeTab === '나의 정보' ? (
          <ProfileCard />
        ) : (
          <ReviewList type={'user'} id={user?._id} />
        )}
      </div>
    </>
  );
};

export default Tab;
