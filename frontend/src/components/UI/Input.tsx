import React from 'react';
import Text from './Text';
import { InputProps } from '../../types';

function Input({
  type,
  value,
  onChange,
  placeholder,
  data_testid,
  error,
  errorMessage,
  id,
  px = 4,
  py = 4,
}: InputProps) {
  return (
    <React.Fragment>
      <input
        id={id}
        className={`w-full border rounded-md outline-none focus:border-purple-200 ${
          error && 'border-red-500'
        } ${`p-${px}`}  ${`p-${py}`}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data-testid={data_testid}
      />
      <Text size='sm' color='red-500'>
        {errorMessage}
      </Text>
    </React.Fragment>
  );
}

export default Input;
