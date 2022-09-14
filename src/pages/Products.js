// redux
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../components/CustomTable';

// components
import { getProducts, deleteProduct } from '../redux/features/product/productSlice';
import tableHeadService from '../utils/tableHead';
import fileService from '../utils/files';

// ----------------------------------------------------------------------

const TABLE_HEAD = tableHeadService.generateTableHead([
  'title',
  'description',
  'images',
  'price',
  'quantity',
  'category',
  'shopHandle',
  'availability',
  'shippingDetails',
]);

// ----------------------------------------------------------------------

export default function Product() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  /* eslint-disable */
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  /* eslint-enable */

  const sideMenuButtonItems = [
    {
      text: 'Delete',
      callback: (currentItem) => dispatch(deleteProduct(currentItem.id)),
    },
    {
      text: 'Edit Product',
      callback: (currentItem) => navigate('/manage-product', { state: { mode: 'edit', product: currentItem } }),
    },
  ];

  const topButtons = [
    {
      text: 'Add Product',
      callback: () => navigate('/manage-product', { state: { mode: 'add' } }),
    },
    {
      text: 'Import Products',
      // todo add to redux state
      callback: (e) => fileService.handleFileUpload(e, (data) => console.log(data)),
    },
    {
      text: 'Export Products',
      callback: () => fileService.handleFileExport('Products', products),
    },
  ];

  return (
    <CustomTable
      title={'test'}
      searchAttribute={'title'}
      head={TABLE_HEAD}
      items={products}
      sideButtons={sideMenuButtonItems}
      topButtons={topButtons}
    />
  );
}
