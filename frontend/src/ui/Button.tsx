import { ReactNode } from 'react';
import classNames from 'classnames';

interface ButtonProps {
  children: ReactNode;
  type: 'submit' | 'reset' | 'button' | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button = ({
  children,
  type,
  onClick,
  primary,
  secondary,
  danger,
  disabled,
}: ButtonProps) => {
  const classes = classNames(
    'px-4 py-2 coursor-pointer border-none rounded-md',
    {
      'bg-blue-400 text-white': primary,
      'bg-green-500 text-white': secondary,
      'bg-red-500 text-white': danger,
      'bg-gray-300 text-gray-700 cursor-not-allowed': disabled,
    }
  );
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
