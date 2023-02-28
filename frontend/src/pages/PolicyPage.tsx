import React from 'react';
import api from '../utils/api';
import Header from '../components/UI/Header';
import Table from '../components/UI/Table';
import { Policy, PageData } from '../types';

const PolicyPage = () => {
  const [policies, setPolicies] = React.useState<Policy[]>([]);
  const [page, setPage] = React.useState<PageData>({
    max: 0,
    current: 0,
    from: 0,
    to: 0,
    count: 0,
    offset: 0,
  });
  const [filter, setFilter] = React.useState({
    query: '',
    dropdown: { value: '', label: 'Filter by status' },
  });
  const [loading, setLoading] = React.useState(true);

  const handleCall = async (page: PageData) => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/policies?search=${filter.query}&filter=${filter.dropdown.value}&offset=${page.offset}`
      );

      setPolicies(data.policies);
      setPage(data.page);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleCall(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.offset]);

  React.useEffect(() => {
    handleCall({ max: 0, current: 0, from: 0, to: 0, count: 0, offset: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.query, filter.dropdown.value]);

  return (
    <div
      className='w-11/12 max-w-screen-xl h-screen mx-auto'
      data-testid='policy-page-container'
    >
      <Header filter={filter} setFilter={setFilter} />
      <Table
        policies={policies}
        loading={loading}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default PolicyPage;
