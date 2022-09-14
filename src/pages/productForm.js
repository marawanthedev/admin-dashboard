import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import Form from '../components/form/form';
import { editProduct, addProduct } from '../redux/features/product/productSlice';
import { getShops } from '../redux/features/shops/shopSlice';

const textInputs = [
  {
    name: 'title',
    label: 'Title',
  },
  {
    name: 'description',
    label: 'Description',
  },
  {
    name: 'images',
    label: 'Images',
  },
  {
    name: 'price',
    label: 'Price',
  },
  {
    name: 'quantity',
    label: 'Quantity',
  },
  {
    name: 'shopHandle',
    label: 'Shop Handle',
  },
  {
    name: 'availability',
    label: 'Availability',
  },
  {
    name: 'shippingDetails',
    label: 'Shipping Details',
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

  useEffect(() => {
    if (mode === 'add') {
      dispatch(getShops());
    }
  }, []);

  const menuItems = [
    {
      label: 'Shop',
      items: shops,
      name: 'shop',
      defaultValue: productInfo ? productInfo.shop : null,
      to: '/manage-shop',
    },
    {
      label: 'Category',
      name: 'category',

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
      to: '/register-product',
    },
  ];

  const addShopSchema = Yup.object().shape({
    select: Yup.string().required(),
    // shop: Yup.string().required(),
    // category: Yup.string().required(),
    title: Yup.string().required('title is Required').min(4),
    images: Yup.string().required('images is Required').min(4),
    price: Yup.string().required('price  is Required').min(4),
    description: Yup.string().required('description is Required').min(4),
    quantity: Yup.string().required('quantity is Required').min(4),
    shopHandle: Yup.string().required('Shop Handle is Required').min(4),
    availability: Yup.string().required('availability is Required').min(4),
    shippingDetails: Yup.string().required('Shipping Details is Required').min(4),
  });
  const editShopSchema = Yup.object().shape({
    title: Yup.string().required('title is Required').min(4),
    images: Yup.string().required('images is Required').min(4),
    price: Yup.string().required('price  is Required').min(4),
    description: Yup.string().required('description is Required').min(4),
    quantity: Yup.string().required('quantity is Required').min(4),
    shopHandle: Yup.string().required('Shop Handle is Required').min(4),
    availability: Yup.string().required('availability is Required').min(4),
    shippingDetails: Yup.string().required('Shipping Details is Required').min(4),
  });

  const defaultValues = {
    select: mode === 'edit' && productInfo ? productInfo.shop : '',
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
        dispatch(editProduct(formValues));
        break;
      default:
    }
  };

  const handleBaseRendering = () => {
    if ((mode === 'add' && shops.length !== 0) || mode === 'edit') {
      return (
        <Form
          schema={mode === 'add' ? addShopSchema : editShopSchema}
          textInputs={textInputs}
          formButton={formButton}
          formHeader={formHeader}
          menuItems={mode === 'add' ? menuItems : null}
          defaultValues={defaultValues}
          onFormSubmission={handleShopSubmission}
        />
      );
    }
  };
  return <>{handleBaseRendering()}</>;
}
