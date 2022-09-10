import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import Form from '../components/form/form';
import { getUsers } from '../redux/features/user/userSlice';

const textInputs = [
  {
    name: 'handle',
    label: 'Handle',
  },
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'collections',
    label: 'Collections',
  },
  {
    name: 'description',
    label: 'Description',
  },
  {
    name: 'tagline',
    label: 'Tagline',
  },
  {
    name: 'address',
    label: 'Address',
  },
];

const formHeader = 'Shop Registration';
const formButton = { text: 'Register Shop', onClick: () => console.log('clicked') };

export default function ShopForm() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const menuItem = {
    label: 'User',
    items: users,
  };

  const shopSchema = Yup.object().shape({
    user: Yup.string().required('Please select a user').oneOf(menuItem.items),
    handle: Yup.string().required('Handle is Required').min(4),
    name: Yup.string().required('Name is Required').min(4),
    tagline: Yup.string().required('Tagline  is Required').min(4),
    description: Yup.string().required('description is Required').min(4),
    address: Yup.string().required('Address is Required').min(4),
    select: Yup.string().required(),
  });

  const defaultValues = {
    user: '',
    handle: '',
    name: '',
    tagline: '',
    description: '',
    address: '',
    select: '',
  };

  return (
    <>
      {users.length > 0 ? (
        <Form
          schema={shopSchema}
          textInputs={textInputs}
          formButton={formButton}
          formHeader={formHeader}
          menuItem={menuItem}
          defaultValues={defaultValues}
          onFormSubmission={() => {
            console.log('submitted');
          }}
        />
      ) : null}
    </>
  );
}
