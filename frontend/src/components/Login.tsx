import React, { useCallback, useState } from 'react';
import { sendLoginRequest } from '../api/userApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import InputField from './form/InputField';
import axios from 'axios';

interface Login {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginData, setLoginData] = useState<Login>({
    email: '',
    password: '',
  });

  const { setUser, setAccessToken } = useAuthStore();

  const createFormData = (data: Login) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    return formData;
  };

  const submitLoginration = async (loginData: Login) => {
    const data = createFormData(loginData);
    try {
      const userData = await sendLoginRequest(data);
      setUser(userData.user);
      setAccessToken(userData.accessToken);
      movePage();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          alert(error.response?.data.message);
        } else {
          alert('400이외의 오류 발생했습니다.');
          navigate('/login');
        }
      } else {
        console.error('Unexpected error:', error);
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  // 로그인하지 않은 상태에서 로그인이 필요한 서비스 이용할 때
  // 로그인 후 해당 정보를 가지고 다시 서비스 이용 경로로 이동하기 위한 코드
  const movePage = () => {
    if (location.state === null) {
      navigate('/');
    } else {
      const { id, title, release, overview, poster } = location.state;
      const from = location.state?.from?.pathname;
      navigate(from, {
        state: {
          id,
          title,
          release,
          overview,
          poster,
        },
      });
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await submitLoginration(loginData);
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLoginData((prevLoginData) => ({
        ...prevLoginData,
        [name]: value,
      }));
    },
    [setLoginData]
  );

  return (
    <>
      <p className='font-bold text-3xl p-6'>로그인</p>

      <form onSubmit={handleLoginSubmit}>
        <div className='flex flex-col gap-4'>
          <InputField
            type='text'
            name='email'
            value={loginData.email}
            placeholder='Your Email'
            onChange={(e) => handleInputChange(e)}
          />
          <InputField
            type='password'
            name='password'
            value={loginData.password}
            placeholder='Your Password'
            onChange={(e) => handleInputChange(e)}
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
