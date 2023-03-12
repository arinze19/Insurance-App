import React from 'react';
import { TextProps } from '../../types';

function Text({
  size,
  weight = 'thin',
  color = 'gray-700',
  data_testid = '',
  children,
  align = 'left',
}: TextProps) {
  return (
    <span
      className={`text-${size} text-${color} font-${weight} text-${align}`}
      data-testid={data_testid}
    >
      {children}
    </span>
  );
}

export default Text;
