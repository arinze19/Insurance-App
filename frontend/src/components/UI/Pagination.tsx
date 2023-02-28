import { PaginationProps } from '../../types';

const Pagination = ({
  max,
  current,
  count,
  from,
  to,
  handlePaginate,
}: PaginationProps) => {
  return (
    <div className='w-full flex justify-between items-center my-2'>
      <div>
        <span>
          currently showing {from} - {to} of {count}
        </span>
      </div>
      <div className='flex justify-between'>
        <button
          className={`text-white-100 bg-purple-200 py-2 px-4 mr-4 rounded-sm ${
            current === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          id='prev'
          onClick={handlePaginate}
          disabled={current === 1}
        >
          &#8592;
        </button>
        <button
          className={`text-white-100 bg-purple-200 py-2 px-4 rounded-sm ${
            current >= max ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          id='next'
          onClick={handlePaginate}
          disabled={current >= max}
          data-testid='pagination-next-button'
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
