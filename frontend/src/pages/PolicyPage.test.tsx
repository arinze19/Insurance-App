import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PolicyPage from './PolicyPage';

// mock axios and cast type to prevent calling API in async code
// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

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