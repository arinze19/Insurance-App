import { screen, render } from '@testing-library/react';
import Table from './Table';
import { Policy } from '../../types';

const policies: Policy[] = [
  {
    id: '70facb3e-c0b5-4d71-97b9-f625456968e1',
    insuranceType: 'HEALTH',
    status: 'ACTIVE',
    provider: 'TK',
    startDate: '2012-09-24T09:55:17.000Z',
    endDate: null,
    customer: {
      id: '70facb3e-c0b5-4d71-97b9-f625456968e1',
      dateOfBirth: '2005-08-12T07:01:40.000Z',
      firstName: 'Rozelle',
      lastName: 'Nipper',
    },
    familyMembers: [
      {
        name: 'Thomas'
      }
    ]
  },
  {
    id: '0e33757e-5b78-40a8-870e-4774c18d97e8',
    insuranceType: 'HEALTH',
    status: 'ACTIVE',
    provider: 'TK',
    startDate: '2012-09-24T09:55:17.000Z',
    endDate: null,
    customer: {
      id: '70facb3e-c0b5-4d71-97b9-f625456968e1',
      dateOfBirth: '2005-08-12T07:01:40.000Z',
      firstName: 'Rozelle',
      lastName: 'Nipper',
    },
    familyMembers: [
      {
        name: 'Kylie'
      }
    ]
  },
  {
    id: '1d104132-6df3-445a-b98d-5b86fd12bf78',
    insuranceType: 'HEALTH',
    status: 'DROPPED_OUT',
    provider: 'TK',
    startDate: '2012-09-24T09:55:17.000Z',
    endDate: null,
    customer: {
      id: '70facb3e-c0b5-4d71-97b9-f625456968e1',
      dateOfBirth: '2005-08-12T07:01:40.000Z',
      firstName: 'Rozelle',
      lastName: 'Nipper',
    },
    familyMembers: [
      {
        name: 'James'
      }
    ]
  },
  {
    id: '331bebaf-fcdf-4406-b650-57faacec7fe9',
    insuranceType: 'HEALTH',
    status: 'PENDING',
    provider: 'TK',
    startDate: '2012-09-24T09:55:17.000Z',
    endDate: null,
    customer: {
      id: '70facb3e-c0b5-4d71-97b9-f625456968e1',
      dateOfBirth: '2005-08-12T07:01:40.000Z',
      firstName: 'Rozelle',
      lastName: 'Nipper',
    },
    familyMembers: [
      {
        name: 'Reus'
      }
    ]
  },
  {
    id: '33853c96-2392-4ef1-9e4e-4c55fdd08b42',
    insuranceType: 'HEALTH',
    status: 'CANCELLED',
    provider: 'TK',
    startDate: '2012-09-24T09:55:17.000Z',
    endDate: null,
    customer: {
      id: '70facb3e-c0b5-4d71-97b9-f625456968e1',
      dateOfBirth: '2005-08-12T07:01:40.000Z',
      firstName: 'Rozelle',
      lastName: 'Nipper',
    },
    familyMembers: [
      {
        name: 'Robert'
      }
    ]
  },
];



describe('UNIT: unit tests for table component', () => {
  it('table component renders', () => {
    render(<Table policies={policies} loading={false} />);

    const tableElement = screen.getByTestId('table-container');
    expect(tableElement).toBeInTheDocument();
  });
});
