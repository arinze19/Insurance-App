import { screen, render, cleanup, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PolicyPage from './PolicyPage';

import mockAxios from 'axios';
import { policies } from '../assets/data.json';

afterEach(cleanup);

const MockPolicyPage = () => {
  return (
    <BrowserRouter>
      <PolicyPage />
    </BrowserRouter>
  );
};

describe('UNIT: unit tests for policy page component', () => {
  it('correctly renders policy page container to the screen', () => {
    render(<MockPolicyPage />);

    const policyContainer = screen.getByTestId('policy-page-container');
    expect(policyContainer).toBeInTheDocument();
  });
});


describe('INTEGRATION: integration tests for policy page component', () => {
  it('renders the number of users acuurately', async () => {
    (mockAxios.get as jest.Mock).mockResolvedValueOnce({ data: policies })

    render(<MockPolicyPage />);

    const tableCellElements = await waitFor(() => screen.getAllByTestId('table-cell'))

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(tableCellElements).toHaveLength(5)

  })
})

