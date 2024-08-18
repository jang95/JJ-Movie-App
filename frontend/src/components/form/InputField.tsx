import React from 'react';

interface InputFieldProps {
  label?: string;
  type: 'text' | 'password' | 'email';
  value: string;
  placeholder: string;
  error?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label,
  type,
  value,
  placeholder,
  error,
  name,
  onChange,
}: InputFieldProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        className={`w-full h-10 px-8 rounded-xl focus:outline-none bg-gray-200 border-2 ${
          error ? 'border-red-500' : 'focus:border-blue-400'
        }`}
        id={name}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
};

export default InputField;
