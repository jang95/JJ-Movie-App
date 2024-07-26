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
    <div className='container'>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor='id'>아이디</label>
        <input ref={idRef} type='text' />
        <label htmlFor='password'>비밀번호</label>
        <input ref={passwordRef} type='password' id='' />
        <button type='submit'>전송</button>
      </form>
    </div>
  );
};

export default LoginPage;
