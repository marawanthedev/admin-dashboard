import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialUiForm from '../components/form/form';
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

  return (
    <>
      {users.length > 0 ? (
        <MaterialUiForm textInputs={textInputs} formButton={formButton} formHeader={formHeader} menuItem={menuItem} />
      ) : null}
    </>
  );
}
