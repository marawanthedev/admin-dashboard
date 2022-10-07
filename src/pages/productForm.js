import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import Form from '../components/form/form';
import { editProduct, addProduct } from '../redux/features/product/productSlice';
import { getShops } from '../redux/features/shops/shopSlice';

const textInputs = [
  {
    name: 'title',
    label: 'Title',
    modes: ['edit', 'add'],
  },
  {
    name: 'description',
    label: 'Description',
    modes: ['edit', 'add'],
  },
  {
    name: 'images',
    label: 'Images',
    modes: ['edit'],
  },
  {
    name: 'price',
    label: 'Price',
    modes: ['edit', 'add'],
  },
  {
    name: 'quantity',
    label: 'Quantity',
    modes: ['edit'],
  },
  {
    name: 'shopHandle',
    label: 'Shop Handle',
    modes: ['edit', 'add'],
  },
  {
    name: 'availability',
    label: 'Availability',
    modes: ['edit'],
  },
  {
    name: 'shippingDetails',
    label: 'Shipping Details',
    modes: ['edit'],
  },
];

export default function ProductForm() {
  const location = useLocation();
  const mode = location?.state.mode;
  const productInfo = mode === 'edit' ? location.state.product : null;

  const formHeader = mode === 'add' ? 'Product Registration' : 'Product update';
  const formButton = { text: mode === 'add' ? 'Add Product' : 'Update Product', onClick: () => console.log('clicked') };

  const dispatch = useDispatch();
  const { shops } = useSelector((state) => state.shop);

  /* eslint-disable */
  useEffect(() => {
    if (mode === 'add') {
      dispatch(getShops());
    }
  }, []);
  /* eslint-enable */

  const menuItems = [
    {
      label: 'Shop',
      items: shops,
      name: 'shop',
      defaultValue: productInfo ? productInfo.shop : null,
      to: '/manage-shop',
      modes: ['add'],
    },
    {
      label: 'Category',
      name: 'category',
      modes: ['edit'],

      //   todo gotta use actual categories
      items: [
        {
          id: 'food',
          label: 'food',
          name: 'food',
        },
        {
          id: 'cloth',
          label: 'cloth',
          name: 'cloth',
        },
        {
          id: 'handmade',
          label: 'handmade',
          name: 'handmade',
        },
      ],
      defaultValue: productInfo ? productInfo.category : null,
      to: '/manage-category',
    },
  ];

  const addProductSchema = Yup.object().shape({
    select: Yup.string().required('Select value is required!'),

    title: Yup.string().required('title is Required').min(4),
    price: Yup.string().required('price  is Required').min(4),
    description: Yup.string().required('description is Required').min(4),
    shopHandle: Yup.string().required('Shop Handle is Required').min(4),
  });
  const editProductSchema = Yup.object().shape({
    select: Yup.string().required('Select value is required!'),
    title: Yup.string().required('title is Required').min(4),
    price: Yup.string().required('price  is Required').min(4),
    description: Yup.string().required('description is Required').min(4),
    quantity: Yup.string().required('quantity is Required').min(4),
    shopHandle: Yup.string().required('Shop Handle is Required').min(4),
    availability: Yup.string().required('availability is Required').min(4),
    shippingDetails: Yup.string().required('Shipping Details is Required').min(4),
  });

  const defaultValues = {
    title: mode === 'edit' && productInfo ? productInfo.title : '',
    description: mode === 'edit' && productInfo ? productInfo.description : '',
    images: mode === 'edit' && productInfo ? productInfo.images : '',
    price: mode === 'edit' && productInfo ? productInfo.price : '',
    quantity: mode === 'edit' && productInfo ? productInfo.quantity : '',
    shopHandle: mode === 'edit' && productInfo ? productInfo.shopHandle : '',
    availability: mode === 'edit' && productInfo ? productInfo.availability : '',
    shippingDetails: mode === 'edit' && productInfo ? productInfo.shippingDetails : '',
  };

  const handleShopSubmission = (formValues) => {
    switch (mode) {
      case 'add':
        dispatch(addProduct(formValues));
        break;
      case 'edit':
        dispatch(editProduct({ id: productInfo.id, data: formValues }));
        break;
      default:
    }
  };
  function filterByMode(arr) {
    return arr.filter((item) => {
      let doesBelong = true;
      if (item.modes) {
        if (!item.modes.includes(mode)) doesBelong = false;
      }
      if (doesBelong) return item;
      return null;
    });
  }

  /* eslint-disable */
  const handleBaseRendering = () => {
    if ((mode === 'add' && shops.length !== 0) || mode === 'edit') {
      return (
        <Form
          schema={mode === 'add' ? addProductSchema : editProductSchema}
          textInputs={filterByMode(textInputs)}
          formButton={formButton}
          formHeader={formHeader}
          menuItems={filterByMode(menuItems)}
          defaultValues={defaultValues}
          onFormSubmission={handleShopSubmission}
        />
      );
    }
  };
  /* eslint-enable */
  return <>{handleBaseRendering()}</>;
}
