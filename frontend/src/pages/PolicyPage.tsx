import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/UI/Header';
import Table from '../components/UI/Table';
import Pagination from '../components/UI/Pagination';

import { Policy } from '../types';

import urlBuilder from '../helpers/urlBuilder';

const PolicyPage = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);

  const handleAPICall = async (query = {}) => {
    try {
    setLoading(true)
    // let url = '/policies?' query;
    const { data } = await axios.get(urlBuilder(query));

      setPolicies(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleAPICall()
  }, [])

  return (
    <div className='w-5/6 max-w-screen-xl h-screen mx-auto' data-testid='policy-page-container'>
      <Header loading={loading} handleAPICall={handleAPICall} />
      <Table policies={policies} loading={loading} />
      <Pagination policiesLength={policies.length} handleAPICall={handleAPICall} />
    </div>
  );
};

export default PolicyPage;
