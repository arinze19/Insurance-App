import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { SelectProps } from '../../types';

function Select({
  options,
  selected,
  disabled = false,
  id = '',
  handleChange,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const customClass = !disabled
    ? ' bg-white-100 cursor-pointer'
    : 'bg-gray-100 cursor-not-allowed';
  const handleClick = () => {
    if (!disabled) {
      setOpen(!open);
    }
  };

  return (
    <div className='text-gray-500 relative'>
      <div
        className={`flex justify-between items-center py-3 px-5 border rounded-md ${customClass} ${
          open && 'border border-purple-200'
        }`}
        id={id}
        onClick={handleClick}
      >
        {selected.label}
        {open ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {open && (
        <ul className='w-full absolute top-14 left-0 border border-slate-100 rounded-md shadow-md bg-purple-50 overflow-hidden'>
          {options.map((item, i) => (
            <li
              key={item.value}
              onClick={handleChange}
              data-value={item.value}
              data-label={item.label}
              className={`p-4 cursor-pointer hover:bg-purple-100 ease-linear duration-100 ${
                i < options.length - 1 && 'border-b'
              } ${
                selected.label === item.label && 'bg-purple-100 text-purple-200'
              }`}
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
