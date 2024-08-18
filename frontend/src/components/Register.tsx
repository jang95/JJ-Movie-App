import React, { useRef } from 'react';
import { sendRegisterRequest } from '../api/authApi';

const Register = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  // const passwordCheckRef = useRef<HTMLInputElement>(null);

  const registerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailRef.current && nickNameRef.current && passwordRef.current) {
      const formData = new FormData();
      formData.append('email', emailRef.current.value);
      formData.append('nickName', nickNameRef.current.value);
      formData.append('password', passwordRef.current.value);

      sendRegisterRequest(formData);
    }
  };

  return (
    <>
      <p className='font-bold text-3xl p-6'>회원 가입</p>

      <form onSubmit={registerSubmit}>
        <div className='flex flex-col gap-4'>
          <input
            className='w-full h-10 px-8 rounded-xl focus:outline-none bg-gray-200 border-2 focus:border-blue-400'
            ref={emailRef}
            type='text'
            placeholder='Email'
          />
          <input
            className='w-full h-10 px-8 rounded-xl focus:outline-none bg-gray-200 border-2 focus:border-blue-400'
            ref={nickNameRef}
            type='text'
            placeholder='NickName'
          />
          <input
            className='w-full h-10 px-8 rounded-xl focus:outline-none bg-gray-200 border-2 focus:border-blue-400'
            ref={passwordRef}
            type='password'
            placeholder='Password'
          />
          {/* <input
            className='w-full h-10 px-8 rounded-xl focus:outline-none bg-gray-200 border-2 focus:border-blue-400'
            ref={passwordCheckRef}
            type='password'
            placeholder='Password check'
          /> */}
          <button className='w-full h-10 rounded-xl bg-green-400' type='submit'>
            가입하기
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
