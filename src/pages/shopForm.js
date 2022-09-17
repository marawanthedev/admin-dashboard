import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { addShop, editShopInfo } from '../redux/features/shops/shopSlice';
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

export default function ShopForm() {
  const location = useLocation();
  const mode = location.state?.mode ? location.state?.mode : 'add';
  const shopInfo = mode === 'edit' ? location.state.shop : null;

  const formHeader = mode && mode === 'edit' ? 'Shop update' : 'Shop Registration';
  const formButton = {
    text: mode && mode === 'edit' ? 'Update Shop' : 'Register Shop',
    onClick: () => console.log('clicked'),
  };

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  /* eslint-disable */
  useEffect(() => {
    console.log(mode);
    if (mode === 'add') {
      dispatch(getUsers());
    }
  }, []);
  /* eslint-enable */

  const menuItems =
    mode === undefined || mode !== 'edit'
      ? [
          {
            label: 'User',
            items: users,
            defaultValue: shopInfo ? shopInfo.user : null,
            to: '/register',
          },
        ]
      : null;

  const addShopSchema = Yup.object().shape({
    select: Yup.string().required(),
    handle: Yup.string().required('Handle is Required').min(4),
    name: Yup.string().required('Name is Required').min(4),
    tagline: Yup.string().required('Tagline  is Required').min(4),
    description: Yup.string().required('description is Required').min(4),
    address: Yup.string().required('Address is Required').min(4),
  });
  const editShopSchema = Yup.object().shape({
    handle: Yup.string().required('Handle is Required').min(4),
    name: Yup.string().required('Name is Required').min(4),
    tagline: Yup.string().required('Tagline  is Required').min(4),
    description: Yup.string().required('description is Required').min(4),
    address: Yup.string().required('Address is Required').min(4),
  });

  const defaultValues = {
    select: mode === 'edit' && shopInfo ? shopInfo.name : '',
    handle: mode === 'edit' && shopInfo ? shopInfo.handle : '',
    name: mode === 'edit' && shopInfo ? shopInfo.name : '',
    tagline: mode === 'edit' && shopInfo ? shopInfo.tagline : '',
    description: mode === 'edit' && shopInfo ? shopInfo.description : '',
    address: mode === 'edit' && shopInfo ? shopInfo.address : '',
    collections: mode === 'edit' && shopInfo ? shopInfo.collections : '',
  };

  const handleShopSubmission = (formValues) => {
    switch (mode) {
      case 'add':
        dispatch(addShop(formValues));
        break;
      case 'edit':
        dispatch(editShopInfo(formValues));
        break;
      default:
    }
  };

  const handleBaseRendering = () => {
    if (mode === 'edit')
      return (
        <Form
          schema={mode === 'edit' ? addShopSchema : editShopSchema}
          textInputs={textInputs}
          formButton={formButton}
          formHeader={formHeader}
          menuItems={mode === 'edit' ? menuItems : null}
          defaultValues={defaultValues}
          onFormSubmission={handleShopSubmission}
        />
      );

    return (
      <Form
        schema={mode === 'add' ? addShopSchema : editShopSchema}
        textInputs={textInputs}
        formButton={formButton}
        formHeader={formHeader}
        menuItems={mode === undefined || mode === 'add' ? menuItems : null}
        defaultValues={defaultValues}
        onFormSubmission={handleShopSubmission}
      />
    );
  };
  return <>{handleBaseRendering()}</>;
}
