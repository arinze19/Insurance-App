import { screen, render, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('UNIT: unit tests for header component', () => {
  const handleAPICall = jest.fn();
  it('correctly renders component to document page', () => {
    render(<Header handleAPICall={handleAPICall} loading={false} />);

    const headerElement = screen.getByTestId('header-container');

    expect(headerElement).toBeInTheDocument();
  });

  it('disables search button while API is calling endpoint', () => {
    render(<Header handleAPICall={handleAPICall} loading={true} />);

    const submitElement = screen.getByTestId('header-submit-button');

    expect(submitElement).toBeDisabled();
  });

  it('correctly updates conrolled input', () => {
    render(<Header handleAPICall={handleAPICall} loading={false} />)

    const inputElement = screen.getByTestId('header-input') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'ARINZE' } })

    expect(inputElement.value).toMatch(/ARINZE/i)
  })
});
