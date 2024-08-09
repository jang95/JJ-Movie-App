import axios from 'axios';
import { useRef } from 'react';

const LoginPage = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (idRef.current && passwordRef.current) {
      const formData = new FormData();
      formData.append('id', idRef.current.value);
      formData.append('password', passwordRef.current.value);

      sendLoginRequest(formData);
    }
  };

  const sendLoginRequest = async (formData: FormData) => {
    try {
      const response = await axios.post(
        'http://localhost:5100/api/login',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('response', response);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='flex w-[90%] h-[80vh]  mx-auto my-2 justify-center items-center'>
      <div className='w-[550px] h-[70%] bg-slate-600 bg-[url("assets/LoginBg.webp")] opacity-30 hidden lg:inline'></div>

      <div className='flex flex-col w-[390px] h-[70%] p-6 bg-gray-100 justify-center items-center'>
        <p className='font-bold text-3xl p-6'>Sign In</p>
        <div>
          <form onSubmit={handleLoginSubmit}>
            <div className='flex flex-col gap-4'>
              <input
                className='w-full h-10 px-8 rounded-xl focus:outline-none bg-gray-200 border-2 focus:border-blue-400'
                ref={idRef}
                type='text'
                placeholder='Email or userName'
              />
              <input
                className='w-full h-10 px-8 rounded-xl focus:outline-none bg-gray-200 border-2 focus:border-blue-400'
                ref={passwordRef}
                type='password'
                placeholder='Password'
              />
              <button
                className='w-full h-10 rounded-xl bg-blue-400'
                type='submit'
              >
                Sign In
              </button>
              <button
                className='w-full h-8 rounded-xl bg-green-400'
                type='submit'
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
