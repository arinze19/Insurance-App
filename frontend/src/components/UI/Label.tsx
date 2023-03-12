import React from 'react';
import { LabelProps } from '../../types';

function Label({ htmlFor, size, weight, children }: LabelProps) {
  return (
    <label
      className={`text-gray-800 text-${size} font-${weight}`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}

export default Label;
