import { useState } from 'react';
import Login from '../../components/Login';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className='flex w-[90%] h-[80vh]  mx-auto my-2 justify-center items-center'>
      <div className='w-[550px] h-[70%] bg-slate-600 bg-[url("assets/LoginBg.webp")] opacity-30 hidden lg:inline'></div>

      <div className='flex flex-col w-[390px] h-[70%] p-6 bg-gray-100 justify-center items-center'>
        {isLogin ? <Login /> : null}
        <div className='w-full my-4 border-b-[1px] border-y-slate-800'></div>
        <div className='w-[50%]'>
          <button
            className={
              isLogin
                ? 'bg-green-400 w-full h-8 rounded-xl'
                : 'bg-blue-400 w-full h-8 rounded-xl'
            }
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
