import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { SelectProps } from '../../types.d';

function Select({ options, label, handleChange }: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className='w-full md:w-1/5 text-gray-500 relative'>
      <div
        className={`flex justify-between items-center py-3 px-5 border rounded-md cursor-pointer ${
          open && 'border border-purple-200'
        }`}
        onClick={handleClick}
      >
        {label}
        {open ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {open && (
        <ul className='w-full absolute top-14 left-0 border border-slate-100 rounded-md bg-purple-50 overflow-hidden'>
          {options.map((item, i) => (
            <li
              data-value={item.value}
              data-label={item.label}
              id={item.value}
              onClick={handleChange}
              key={item.value}
              className={`p-2 cursor-pointer ${
                i < options.length - 1 && 'border-b'
              } ${label === item.label && 'bg-purple-100 text-purple-200'}`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
