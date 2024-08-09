import React, { useRef } from 'react';

const Register = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <p className='font-bold text-3xl p-6'>Sign Up</p>

      <form>
        <div className='flex flex-col gap-4'>
          <input
            className='w-full h-10 px-8 rounded-xl focus:outline-none bg-gray-200 border-2 focus:border-blue-400'
            ref={idRef}
            type='text'
            placeholder='Email or userName'
          />
          <input
            className='w-full h-10 px-8 rounded-xl focus:outline-none bg-gray-200 border-2 focus:border-blue-400'
            ref={idRef}
            type='text'
            placeholder='NickName'
          />
          <input
            className='w-full h-10 px-8 rounded-xl focus:outline-none bg-gray-200 border-2 focus:border-blue-400'
            ref={passwordRef}
            type='password'
            placeholder='Password'
          />
          <input
            className='w-full h-10 px-8 rounded-xl focus:outline-none bg-gray-200 border-2 focus:border-blue-400'
            ref={passwordRef}
            type='password'
            placeholder='Password check'
          />
          <button className='w-full h-10 rounded-xl bg-green-400' type='submit'>
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
