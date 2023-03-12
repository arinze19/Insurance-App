import React from 'react';
import { ButtonProps } from '../../types';

function Button({
  type,
  size,
  variant,
  px = 2,
  py = 2,
  onClick,
  children,
}: ButtonProps) {
  const parsedVariant =
    variant === 'primary'
      ? 'bg-purple-200 text-white-100'
      : 'bg-transparent text-red-600 border border-red-600 hover:bg-red-100';

  const parsedSize = size === 'full' ? 'w-full' : '';

  return (
    <button
      type={type}
      className={`${parsedVariant} ${parsedSize} ${`p-${px}`} ${`p-${py}`} rounded-sm`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
