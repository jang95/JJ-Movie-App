import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Root = () => {
  return (
    <div className='container mx-auto'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
