import React from 'react';
import Select from './Select';
import { HeaderProps } from '../../types';

const Header = ({ filter, setFilter }: HeaderProps) => {
  const options = [
    { value: '', label: 'Filter by status' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'ACTIVE', label: 'Active' },
  ];

  const handleQueryChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFilter({ ...filter, query: e.currentTarget.value });
  };

  const handleFilterChange = (e: React.FormEvent<HTMLDivElement>) => {
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
      <form className='w-full'>
        <div>
          <input
            className='w-full md:w-3/4 my-6 p-4 border rounded-md outline-none focus:border-purple-200'
            type='text'
            placeholder='Search policies by name of user, provider or family members'
            value={filter.query}
            onChange={handleQueryChange}
            data-testid='header-input'
          />
        </div>

        <Select
          options={options}
          label={filter.dropdown.label}
          handleChange={handleFilterChange}
        />
      </form>
    </div>
  );
};

export default Header;
