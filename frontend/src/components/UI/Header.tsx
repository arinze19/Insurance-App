import React from 'react';
import Select from './Select';
import { HeaderProps } from '../../types';
import Input from './Input';

const Header = ({ filter, setFilter }: HeaderProps) => {
  const options = [
    { value: '', label: 'Filter by status' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'ACTIVE', label: 'Active' },
  ];

  const handleQueryChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFilter({ ...filter, query: e.currentTarget.value });
  };

  const handleFilterChange = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const { value, label } = e.currentTarget.dataset;

    setFilter({
      ...filter,
      dropdown: {
        value: value ?? '',
        label: label ?? 'Filter by status',
      },
    });
  };

  return (
    <div className='w-full my-12' data-testid='header-container'>
      <h1 className='text-3xl font-bold'>Policies</h1>
      <form className='flex flex-col mt-4 gap-5'>
        <div className='w-full md:w-3/4'>
          <Input
            type='text'
            placeholder='Search policies by name of user, provider or family members'
            value={filter.query}
            onChange={handleQueryChange}
            data_testid='header-input'
          />
        </div>

        <div className='w-full md:w-1/5'>
          <Select
            options={options}
            selected={{
              value: filter.dropdown.value,
              label: filter.dropdown.label,
            }}
            handleChange={handleFilterChange}
          />
        </div>
      </form>
    </div>
  );
};

export default Header;
