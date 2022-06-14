import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CardItem from './CardItem';
import { PolicySummary, CardItemProp } from '../../types';

const MockCardItem = ({ policy }: CardItemProp) => {
  return (
    <BrowserRouter>
      <CardItem policy={policy} />
    </BrowserRouter>
  );
};

describe('UNIT: unit tests for CardItem component', () => {
  it('confirms component is rendered', async () => {
    const policy: PolicySummary = {
      id: 1,
      name: 'Health Insurance',
      type: 'HEALTH',
      description:
        'Going public or private? We help you choose your best option for your situation.',
    };

    render(<MockCardItem policy={policy} />);

    const policyName = await screen.findByTestId('policy-summary-name');

    expect(policyName).toBeInTheDocument();
  });
});
