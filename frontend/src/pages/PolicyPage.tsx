import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/UI/Header';
import Table from '../components/UI/Table';
import Pagination from '../components/UI/Pagination';

import { Policy } from '../types';

interface IData {
  policies: Policy[];
  maxPage: number;
  currentPage: number;
}

const PolicyPage = () => {
  const [data, setData] = useState<IData>({policies: [], maxPage: 0, currentPage: 0});
  const [loading, setLoading] = useState(true);
  /**
   * 2 useState maxPage and currentPage
   * { currentPage, maxPage, policies }
   */

  const handleAPICall = async (query = '') => {
    let abortController = new AbortController();

    try {
    setLoading(true)
    let url = 'http://localhost:4000/policies?' + query;
    const{ data } = await axios.get(url, { signal: abortController.signal });

    if(!abortController.signal.aborted) {
      setData(data)
    }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }

    return () => {
      abortController.abort()
    }
  }

  useEffect(() => {
    handleAPICall()
  }, [])

  return (
    <div className='w-5/6 max-w-screen-xl h-screen mx-auto' data-testid='policy-page-container'>
      <Header loading={loading} handleAPICall={handleAPICall} />
      <Table policies={data.policies} loading={loading} />
      <Pagination maxPage={data.maxPage} currentPage={data.currentPage} handleAPICall={handleAPICall} />
    </div>
  );
};

export default PolicyPage;
