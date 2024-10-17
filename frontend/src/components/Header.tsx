import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import webpLogo from '../assets/logo.webp';
import SearchBar from './SearchBar';
import { FiMenu } from 'react-icons/fi';
import { IoIosLogIn } from 'react-icons/io';
import { useAuthStore } from '../store/authStore';
import MenuBar from './MenuBar';
import { useState, useEffect, useRef } from 'react';

const Header = () => {
  const location = useLocation();
  const [isShow, setIsShow] = useState(false);
  const { user } = useAuthStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsShow(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsShow(false);
      }
    };

    if (isShow) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShow]);

  return (
    <header className='shadow sticky top-0 z-20 bg-yellow-100 min-w-[400px]'>
      <div className='max-w-[1280px] flex justify-between mx-auto p-6 items-center'>
        <div className='items-center hidden sm:flex'>
          <Link to='/' className='font-bold text-gray-800'>
            <picture>
              <source srcSet={webpLogo} type='image/webp' className='w-32' />
              <img src={logo} alt='movie engine logo' width='100' height='40' />
            </picture>
          </Link>
        </div>
        <SearchBar />
        <div className='flex items-end'>
          {!user ? (
            <Link
              to='/login'
              className='text-2xl font-bold text-gray-800'
              aria-label='Login'
            >
              <IoIosLogIn size={30} />
            </Link>
          ) : (
            <div className='w-20 sm:w-28' ref={menuRef}>
              <FiMenu
                className='cursor-pointer mx-auto'
                size={30}
                onClick={() => setIsShow(!isShow)}
                aria-label='Toggle menu'
              />
              {isShow && <MenuBar />}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
