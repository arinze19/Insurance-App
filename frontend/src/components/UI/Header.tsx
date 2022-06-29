import React, { useState } from 'react';
import { HeaderProps } from '../../types';

const Header = ({ handleAPICall, loading }: HeaderProps) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');

  const handleQueryChange = (e: React.FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAPICall({ search: `${query}`, filter: `${filter}` })
  };

  const handleFilterChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setFilter(e.currentTarget.value);
  };

  return (
    <div className='w-full my-12' data-testid='header-container'>
      <h1 className='text-3xl font-bold'>
        Policies
      </h1>
      <form className='w-full' onSubmit={handleSubmit}>
        <div className='w-full flex flex-col md:flex-row md:justify-between'>
          <input
            className='w-full md:w-3/4 my-6 p-4 shadow-sm outline-none'
            type='text'
            placeholder='Search policies by name of user, provider and family members'
            value={query}
            onChange={handleQueryChange}
            data-testid='header-input'
          />

          <button
            className='w-full my-3 bg-purple-200 p-4 text-purple-50 rounded-sm disabled:cursor-not-allowed md:my-6 md:w-1/4  md:ml-8'
            type='submit'
            disabled={loading}
            data-testid='header-submit-button'
          >
            Search
          </button>
        </div>

        <div className='float-right'>
          <label className='text-gray-500' htmlFor='filter'>
            Filter by:{' '}
          </label>
          <select
            className='text-gray-500 py-2 px-4 cursor-pointer shadow-sm outline-none'
            name='filter'
            id='filter'
            value={filter}
            onChange={handleFilterChange}
          >
            <option value=''>--None--</option>
            <option value='PENDING'>Pending</option>
            <option value='ACTIVE'>Active</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Header;
