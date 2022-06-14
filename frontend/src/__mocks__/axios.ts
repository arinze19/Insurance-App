const response = {
  data: [
    {
      id: '70facb3e-c0b5-4d71-97b9-f625456968e1',
      insuranceType: 'HEALTH',
      provider: 'TK',
      startDate: '2012-09-24T09:55:17.000Z',
      endDate: null,
      customer: {
        id: '70facb3e-c0b5-4d71-97b9-f625456968e1',
        dateOfBirth: '2005-08-12T07:01:40.000Z',
        firstName: 'Rozelle',
        lastName: 'Nipper',
      },
    },
    {
        id: '70facb3e-c0b5-4d71-97b9-f625456968e1',
        insuranceType: 'HEALTH',
        provider: 'TK',
        startDate: '2012-09-24T09:55:17.000Z',
        endDate: null,
        customer: {
          id: '70facb3e-c0b5-4d71-97b9-f625456968e1',
          dateOfBirth: '2005-08-12T07:01:40.000Z',
          firstName: 'Rozelle',
          lastName: 'Nipper',
        },
      },
      {
        id: '70facb3e-c0b5-4d71-97b9-f625456968e1',
        insuranceType: 'HEALTH',
        provider: 'TK',
        startDate: '2012-09-24T09:55:17.000Z',
        endDate: null,
        customer: {
          id: '70facb3e-c0b5-4d71-97b9-f625456968e1',
          dateOfBirth: '2005-08-12T07:01:40.000Z',
          firstName: 'Rozelle',
          lastName: 'Nipper',
        },
      },
      {
        id: '70facb3e-c0b5-4d71-97b9-f625456968e1',
        insuranceType: 'HEALTH',
        provider: 'TK',
        startDate: '2012-09-24T09:55:17.000Z',
        endDate: null,
        customer: {
          id: '70facb3e-c0b5-4d71-97b9-f625456968e1',
          dateOfBirth: '2005-08-12T07:01:40.000Z',
          firstName: 'Rozelle',
          lastName: 'Nipper',
        },
      },
      {
        id: '70facb3e-c0b5-4d71-97b9-f625456968e1',
        insuranceType: 'HEALTH',
        provider: 'TK',
        startDate: '2012-09-24T09:55:17.000Z',
        endDate: null,
        customer: {
          id: '70facb3e-c0b5-4d71-97b9-f625456968e1',
          dateOfBirth: '2005-08-12T07:01:40.000Z',
          firstName: 'Rozelle',
          lastName: 'Nipper',
        },
      },
  ],
};

const axios = {
  get: jest.fn().mockResolvedValue(response),
};

export default axios;
