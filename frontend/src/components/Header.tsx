import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import webpLogo from '../assets/logo.webp';
import SearchBar from './SearchBar';
import { FiMenu } from 'react-icons/fi';
import { IoIosLogIn } from 'react-icons/io';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';
import {
  sendLogoutRequest,
  verifyAuthLogin,
  verifyAuthToken,
} from '../api/authApi';

const Header = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    // testUser();
  }, []);

  const testUser = async () => {
    try {
      const status = await verifyAuthLogin();
      console.log('status', status);
    } catch (error) {
      console.log(error);
    }
  };

  const testToken = async () => {
    try {
      const status = await verifyAuthToken();
      console.log('status', status);
    } catch (error) {
      console.log(error);
    }
  };

  const userLogout = async () => {
    try {
      const status = await sendLogoutRequest();
      console.log('status', status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className='shadow sticky top-0 z-20 bg-yellow-100 min-w-[400px] '>
      <div className='max-w-[1280px] flex justify-evenly sm:justify-between mx-auto p-6 items-center'>
        <div className='items-center hidden sm:flex'>
          <Link to='/' className='font-bold text-gray-800'>
            <picture>
              <source srcSet={webpLogo} type='image/webp' className='w-32' />
              <img src={logo} alt='movie engine logo' width='100' height='40' />
            </picture>
          </Link>
        </div>
        <SearchBar />
        <button onClick={userLogout}>로그아웃</button>
        <button onClick={testUser}>로그인 확인</button>
        <button onClick={testToken}>토큰 확인</button>
        <div className='flex items-end'>
          {!user ? (
            <Link to='/login' className='text-2xl font-bold text-gray-800'>
              <IoIosLogIn size={30} />
            </Link>
          ) : (
            <FiMenu size={30} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
