import { useNavigate } from 'react-router-dom';
import Register from '../../components/Register';

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex w-[90%] h-[80vh]  mx-auto my-2 justify-center items-center'>
      <div className='w-[550px] h-[70%] bg-slate-600 bg-[url("assets/LoginBg.webp")] opacity-30 hidden lg:inline'></div>
      <div className='flex flex-col w-[390px] h-[70%] p-6 bg-gray-100 justify-center items-center'>
        <Register />
        <div className='w-full my-4 border-b-[1px] border-y-slate-800'></div>
        <div className='w-[50%]'>
          <button
            className='bg-blue-400 w-full h-8 rounded-xl'
            onClick={() => navigate('/login')}
          >
            로그인 하러가기
          </button>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
