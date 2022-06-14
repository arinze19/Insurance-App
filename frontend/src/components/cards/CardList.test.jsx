import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CardList from './CardList';

const MockCardList = () => {
  return (
    <BrowserRouter>
      <CardList />
    </BrowserRouter>
  );
};

describe('UNIT: unit test for card list component', () => {
  it('confirms component is loaded', async () => {
    render(<MockCardList />);

    const cardListElement = await screen.findByTestId('card-list-container');

    expect(cardListElement).toBeInTheDocument();
  });
});

describe('INTEGRATION: integration test for card list component', () => {
  it('confirms card item component displays accurate number of cards', async () => {
    render(<MockCardList />);

    const cardItemsElement = await screen.findAllByTestId(
      'card-item-container'
    );

    expect(cardItemsElement.length).toBe(3);
  });
});
