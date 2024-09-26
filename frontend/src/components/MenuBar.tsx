import { sendLogoutRequest } from '../api/userApi';

const MenuBar = () => {
  const userLogout = async () => {
    try {
      await sendLogoutRequest();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='absolute w-20 sm:w-28 top-full/2 cursor-pointer bg-white rounded-md border-2'>
      <ul>
        <li className='text-xs sm:text-sm p-2 text-center border-b-2 hover:bg-slate-400'>
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
