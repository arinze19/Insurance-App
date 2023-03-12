import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import Text from './Text';
import Badge from './Badge';
import Label from './Label';
import Select from './Select';
import api from '../../utils/api';
import { useNotificationContext } from '../../context/NotificationContext';
import { Policy } from '../../types';

const options = {
  providers: [
    { value: 'BARMER', label: 'BARMER' },
    { value: 'TK', label: 'TK' },
    { value: 'AOK', label: 'AOK' },
    { value: 'DAK', label: 'DAK' },
  ],
  insuranceTypes: [
    { value: 'HEALTH', label: 'HEALTH' },
    { value: 'LIABILITY', label: 'LIABILITY' },
    { value: 'HOUSEHOLD', label: 'HOUSEHOLD' },
  ],
  status: [
    { value: 'PENDING', label: 'PENDING' },
    { value: 'ACTIVE', label: 'ACTIVE' },
    { value: 'DROPPED_OUT', label: 'DROPPED_OUT' },
    { value: 'CANCELLED', label: 'CANCELLED' },
  ],
};

const validationSchema = Yup.object({
  provider: Yup.string()
    .oneOf(
      ['BARMER', 'TK', 'DAK', 'AOK'],
      'Insurance provider must be one of BARMER, TK, DAK, AOK'
    )
    .required(),
  insuranceType: Yup.string()
    .oneOf(
      ['HEALTH', 'LIABILITY', 'HOUSEHOLD'],
      'Insurance type must be one of HEALTH, LIABILITY, HOUSEHOLD'
    )
    .required(),
  status: Yup.string()
    .oneOf(
      ['ACTIVE', 'DROPPED_OUT', 'CANCELLED', 'PENDING'],
      'Insurance status must be one of ACTIVE, DROPPED_OUT, CANCELLED, PENDING'
    )
    .required(),
});

function PolicyForm() {
  const params = useParams();
  const notification = useNotificationContext();
  const [policy, setPolicy] = React.useState<Omit<Policy, 'familyMembers'>>({
    id: '',
    customer: { id: '', dateOfBirth: '', firstName: '', lastName: '' },
    insuranceType: 'HEALTH',
    provider: '',
    status: 'DROPPED_OUT',
    createdAt: new Date(),
    startDate: new Date(),
    endDate: new Date(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      insuranceType: policy.insuranceType,
      provider: policy.provider,
      status: policy.status,
      createdAt: policy.createdAt,
      startDate: policy.startDate,
      endDate: policy.endDate,
      familyMember: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => console.log(values),
  });

  const fetchPolicy = async () => {
    const [data, error] = await api.get<Policy>(`/policies/${params.id}`);

    if (data) {
      setPolicy(data);
    } else if (error) {
      notification.setStatus({ message: error, open: true });
    }
  };

  React.useEffect(() => {
    fetchPolicy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <div className='w-full flex flex-col gap-6 md:w-2/3 max-w-2xl'>
      <div className='flex gap-3 items-center'>
        <Text size='xl' weight='bold' color='gray-800'>
          {`${policy?.customer?.firstName || '-'} 
        ${policy?.customer?.lastName}` || '-'}{' '}
        </Text>
        <Badge status={policy.status || 'CANCELLED'} />
      </div>

      <form className='grid gap-4 grid-cols-1 bg-white-100 p-4 border-gray-200 border rounded-md md:grid-cols-2'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='provider' size='md' weight='bold'>
            Provider
          </Label>
          <Select
            options={options.providers}
            selected={{
              value: formik.values.provider,
              label: formik.values.provider,
            }}
            handleChange={(e) =>
              formik.setFieldValue('provider', e.currentTarget.dataset?.value)
            }
            disabled={true}
            id='provider'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <Label htmlFor='insuranceType' size='md' weight='bold'>
            Insurance Type
          </Label>
          <Select
            options={options.insuranceTypes}
            selected={{
              value: formik.values.insuranceType,
              label: formik.values.insuranceType,
            }}
            handleChange={(e) =>
              formik.setFieldValue(
                'insuranceType',
                e.currentTarget.dataset?.value
              )
            }
            disabled={true}
            id='insuranceType'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <Label htmlFor='status' size='md' weight='bold'>
            Status
          </Label>
          <Select
            options={options.status}
            selected={{
              value: formik.values.status,
              label: formik.values.status,
            }}
            handleChange={(e) =>
              formik.setFieldValue('status', e.currentTarget.dataset?.value)
            }
            disabled={true}
            id='status'
          />
        </div>
      </form>
    </div>
  );
}

export default PolicyForm;
