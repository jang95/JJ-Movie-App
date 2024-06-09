import logo from '../assets/logo.png';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header className='shadow sticky top-0 z-20 bg-yellow-100'>
      <div className='container flex justify-between mx-auto p-6 items-center'>
        <div className='flex items-center'>
          <a href='/' className='text-2xl font-bold text-gray-800'>
            <img src={logo} alt='movie engine logo' className='w-32' />
          </a>
        </div>
        <SearchBar />
        <div className='flex items-center'>
          {/* <button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
            Login
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
