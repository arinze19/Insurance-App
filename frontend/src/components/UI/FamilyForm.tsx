import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useParams } from 'react-router';
import { FiTrash } from 'react-icons/fi';
import Text from './Text';
import Input from './Input';
import Button from './Button';
import Loader from './Loader';
import api from '../../utils/api';
import { useNotificationContext } from '../../context/NotificationContext';
import { Family } from '../../types';

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Family member name cannot be more than 10 characters')
    .min(4, 'Family character name cannot be less than 4 characters')
    .required(),
});

function FamilyForm() {
  const params = useParams();
  const notification = useNotificationContext();
  const [loading, setLoading] = React.useState(true);
  const [family, setFamily] = React.useState<Family[]>([]);

  const fetchFamilyMembers = async () => {
    setLoading(true);
    const [data, error] = await api.get<Family[]>(
      `/policies/${params.id}/family`
    );

    if (data) {
      setFamily(data);
    } else if (error) {
      notification.setStatus({ message: error, open: true });
    }

    setLoading(false);
  };

  const addFamilyMember = async (payload: string) => {
    setLoading(true);
    const [data, error] = await api.post<Family>(
      `/policies/${params.id}/family`,
      { name: payload }
    );

    if (data) {
      setFamily([...family, data]);
    } else if (error) {
      notification.setStatus({ message: error, open: true });
    }

    setLoading(false);
  };

  const removeFamily = async (e: React.MouseEvent<SVGElement>) => {
    const id = e.currentTarget.parentElement?.id;

    setLoading(true);
    const [data, error] = await api.delete<Family>(
      `/policies/${params.id}/family/${id}`
    );

    if (data) {
      setFamily(family.filter((member) => member.id !== data.id));
    } else if (error) {
      notification.setStatus({ message: error, open: true });
    }

    setLoading(false);
  };

  const formik = useFormik({
    initialValues: { name: '' },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: validationSchema,
    onSubmit: async (values, config) => {
      addFamilyMember(values.name);
      config.resetForm();
    },
  });

  React.useEffect(() => {
    fetchFamilyMembers();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [params.id]);

  return (
    <div className='flex flex-col gap-4 w-full md:w-1/3 max-w-lg'>
      <div className='flex flex-col p-4 gap-4 border bg-white-100 rounded-md border-gray-200'>
        <Text size='lg' color='gray-800' weight='bold'>
          Add a family member
        </Text>
        <form className='flex flex-col gap-2' onSubmit={formik.handleSubmit}>
          <Input
            type='text'
            value={formik.values.name}
            placeholder='John Doe'
            onChange={formik.handleChange}
            id='name'
            px={2}
            py={2}
            error={Boolean(formik.errors.name && formik.touched)}
            errorMessage={formik.errors && formik.touched && formik.errors.name}
          />
          <Button type='submit' size='full' variant='primary' py={3}>
            Add
          </Button>
        </form>
      </div>

      <div className='flex flex-col gap-2 p-4 border bg-white-100 rounded-md border-gray-200'>
        <Text size='lg' color='gray-800' weight='bold'>
          Family Members
        </Text>
        <ul className='flex flex-col gap-5'>
          {loading
            ? [1, 2].map((item) => <Loader key={item} width='md' />)
            : family.map((member, i) => (
                <li
                  className='flex justify-between items-center'
                  id={member.id}
                  key={member.id}
                >
                  <Text size='md'>
                    {' '}
                    {i + 1}. {member.name}
                  </Text>
                  <FiTrash color='#ef4444' onClick={removeFamily} />
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default FamilyForm;
