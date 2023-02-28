import Badge from './Badge';
import Pagination from './Pagination';

import { TableProps } from '../../types';
import React from 'react';

const Table = ({ policies, loading, page, setPage }: TableProps) => {
  const handlePaginate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e.currentTarget.id === 'prev') {
      setPage({ ...page, offset: page.offset - 10 });
    } else {
      setPage({ ...page, offset: (page.offset += 10) });
    }
  };

  return (
    <div className='flex flex-col'>
      {policies.length === 0 && !loading ? (
        <span>Sorry, there are no records for this query</span>
      ) : (
        <React.Fragment>
          <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
              <div className='overflow-hidden rounded-lg shadow-sm'>
                <table className='min-w-full' data-testid='table-container'>
                  <thead className='border-b bg-purple-200'>
                    <tr>
                      <th
                        scope='col'
                        className='text-sm font-medium text-white-100 px-6 py-4 text-left'
                      >
                        #
                      </th>
                      <th
                        scope='col'
                        className='text-sm font-medium text-white-100 px-6 py-4 text-left'
                      >
                        Name
                      </th>
                      <th
                        scope='col'
                        className='text-sm font-medium text-white-100 px-6 py-4 text-left'
                      >
                        Provider
                      </th>
                      <th
                        scope='col'
                        className='text-sm font-medium text-white-100 px-6 py-4 text-left'
                      >
                        Type
                      </th>
                      <th
                        scope='col'
                        className='text-sm font-medium text-white-100 px-6 py-4 text-left'
                      >
                        Status
                      </th>
                      <th
                        scope='col'
                        className='text-sm font-medium text-white-100 px-6 py-4 text-left'
                      >
                        Family Members
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr className='animate-pulse border-b'>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          <div className='bg-gray-300 rounded-sm w-4 p-2'></div>
                        </td>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          <div className='bg-gray-300 rounded-sm w-20 p-2'></div>
                        </td>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          <div className='bg-gray-300 rounded-sm w-12 p-2'></div>
                        </td>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          <div className='bg-gray-300 rounded-sm w-12 p-2'></div>
                        </td>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          <div className='bg-gray-300 rounded-sm w-12 p-2'></div>
                        </td>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          <div className='bg-gray-300 rounded-sm w-12 p-2'></div>
                        </td>
                      </tr>
                    ) : (
                      policies.map((policy, i) => (
                        <tr
                          className='border-b'
                          key={policy.id}
                          data-testid='table-cell'
                        >
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                            {page.offset + i + 1}
                          </td>
                          <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                            {policy.customer.firstName +
                              ' ' +
                              policy.customer.lastName}
                          </td>
                          <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                            {policy.provider}
                          </td>
                          <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                            {policy.insuranceType}
                          </td>
                          <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                            <Badge status={policy.status} />
                          </td>
                          <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                            {policy.familyMembers
                              ? policy.familyMembers.map((member, i) => (
                                  <p key={i}>{member.name} </p>
                                ))
                              : null}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Pagination
            max={page.max}
            current={page.current}
            count={page.count}
            offset={page.offset}
            from={page.from}
            to={page.to}
            handlePaginate={handlePaginate}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default Table;
