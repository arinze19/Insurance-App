import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

const MockNavbar = () => {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe('UNIT: unit tests on navbar component', () => {
  it('ensures navbar is correctly rendered on the page', () => {
    render(<MockNavbar />);

    const logoElement = screen.getByAltText('Feather logo');

    expect(logoElement).toBeInTheDocument();
  });
});
