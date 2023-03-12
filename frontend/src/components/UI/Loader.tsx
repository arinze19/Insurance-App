import React from 'react';
import { LoaderProps } from '../../types';

function Loader({ width = 'lg', px = 4, py = 3 }: LoaderProps) {
  const widthParse = width === 'lg' ? 'full' : width === 'md' ? '1/2' : '1/5';
  return (
    <div
      className={`bg-gray-300 px-${px} py-${py} py-3 rounded-md w-${widthParse} animate-pulse`}
    ></div>
  );
}

export default Loader;
