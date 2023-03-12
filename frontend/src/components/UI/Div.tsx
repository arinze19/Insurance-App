import React from 'react';
import { DivProps } from '../../types';

function Div({
  position = 'static',
  display = 'block',
  flexDir = 'row',
  top = 'auto',
  left = 'auto',
  right = 'auto',
  bottom = 'auto',
  px = 1,
  py = 1,
  mx = 1,
  my = 1,
  bg = 'transparent',
  border = 0,
  borderColor = 'white-100',
  borderRadius = 'none',
  gap = 0,
  width = 'full',
  md = 'full',
  lg = 'full',
  children,
}: DivProps) {
  return (
    <div
      className={`w-${width} ${position} ${display} ${left} ${top} ${bottom} ${right} px-${px} py-${py} mx-${mx} my-${my} bg-${bg} border-${border} border-${borderColor} rounded-${borderRadius} gap-${gap} flex-${flexDir} md:w-${md} lg:w-${lg}`}
    >
      {children}
    </div>
  );
}

export default Div;
