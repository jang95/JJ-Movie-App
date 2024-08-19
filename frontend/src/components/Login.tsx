import React, { useRef } from 'react';
import { sendLoginRequest } from '../api/authApi';

const Login = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (idRef.current && passwordRef.current) {
      const formData = new FormData();
      formData.append('email', idRef.current.value);
      formData.append('password', passwordRef.current.value);

      sendLoginRequest(formData);
    }
  };
  return (
    <>
      <p className='font-bold text-3xl p-6'>로그인</p>

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
          <button className='w-full h-10 rounded-xl bg-blue-400' type='submit'>
            로그인 하기
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
