import { useCallback, useState } from 'react';
import { sendRegisterRequest } from '../api/authApi';
import InputField from './form/InputField';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs-react';

interface FormData {
  email: string;
  nickName: string;
  password: string;
  passwordCheck: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    nickName: '',
    password: '',
    passwordCheck: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 이메일 유효성 검사
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    if (formData.nickName.trim() === '') {
      newErrors.nickName = '닉네임을 입력해주세요.';
    }

    if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
      newErrors.passwordCheck = '올바른 비밀번호 설정 후 확인 가능합니다.';
    }

    if (formData.password !== formData.passwordCheck) {
      newErrors.passwordCheck = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    },
    [setFormData]
  );

  const createFormData = (data: FormData) => {
    // 비밀번호 해시
    const password = bcrypt.hashSync(data.password, 10);

    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('nickName', data.nickName);
    formData.append('password', password);

    return formData;
  };

  const submitRegistration = async (formData: FormData) => {
    const data = createFormData(formData);
    try {
      await sendRegisterRequest(data);
      navigate('/login');
    } catch (error) {
      alert('회원 가입에 실패했습니다. 다시 시도해주세요');
    }
  };

  const registerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      await submitRegistration(formData);
      setFormData({
        email: '',
        nickName: '',
        password: '',
        passwordCheck: '',
      });
    }
  };

  return (
    <>
      <p className='font-bold text-3xl p-6'>회원 가입</p>

      <form onSubmit={registerSubmit}>
        <div className='flex flex-col gap-4'>
          <InputField
            label='Email'
            type='text'
            name='email'
            value={formData.email}
            placeholder='Your Email'
            error={errors.email}
            onChange={(e) => handleInputChange(e)}
          />
          <InputField
            label='NickName'
            type='text'
            name='nickName'
            value={formData.nickName}
            placeholder='Your NickName'
            error={errors.nickName}
            onChange={handleInputChange}
          />
          <InputField
            label='Password'
            type='password'
            name='password'
            value={formData.password}
            placeholder='Your Password'
            error={errors.password}
            onChange={handleInputChange}
          />
          <InputField
            label='PasswordCheck'
            type='password'
            name='passwordCheck'
            value={formData.passwordCheck}
            placeholder='Your Password check'
            error={errors.passwordCheck}
            onChange={handleInputChange}
          />
          <button className='w-full h-10 rounded-xl bg-green-400' type='submit'>
            가입하기
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
