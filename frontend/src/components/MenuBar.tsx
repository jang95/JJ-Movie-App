import { sendLogoutRequest } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import clearUserSession from '../util/clearUserSession';

const MenuBar = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const userLogout = async () => {
    try {
      await sendLogoutRequest();
      clearUserSession();
    } catch (error) {
      console.log(error);
    }
  };

  const moveToMypage = () => {
    navigate(`/mypage/${user?.nickName}`);
  };

  return (
    <div className='absolute w-20 sm:w-28 top-full/2 cursor-pointer bg-white rounded-md border-2'>
      <ul>
        <li
          className='text-xs sm:text-sm p-2 text-center border-b-2 hover:bg-slate-400'
          onClick={moveToMypage}
        >
          마이페이지
        </li>
        <li
          className='text-xs sm:text-sm p-2 text-center cursor-pointer hover:bg-slate-400'
          onClick={userLogout}
        >
          로그아웃
        </li>
      </ul>
    </div>
  );
};

export default MenuBar;
