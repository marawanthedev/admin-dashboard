// redux
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomTable from '../components/CustomTable';
import tableHeadService from '../utils/tableHead';
import fileService from '../utils/files';
// components
import { getShops, deleteShop } from '../redux/features/shops/shopSlice';
// ----------------------------------------------------------------------

export default function Shop() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const TABLE_HEAD = tableHeadService.generateTableHead([
    'name',
    'user',
    'handle',
    'collection',
    'description',
    'tagline',
    'address',
  ]);

  const sideMenuButtonItems = [
    {
      text: 'Delete',
      callback: (currentItem) => dispatch(deleteShop(currentItem.id)),
    },
    {
      text: 'Edit Shop',
      callback: (currentItem) => navigate('/manage-shop', { state: { mode: 'edit', shop: currentItem } }),
    },
  ];

  const topButtons = [
    {
      text: 'Add Shop',
      callback: () => navigate('/manage-shop', { state: { mode: 'add' } }),
    },
    {
      text: 'Import Shop',
      // todo add to redux state
      callback: (e) =>
        fileService.handleFileUpload(e, (data) => {
          console.log(data);
        }),
    },
    {
      text: 'Export Shop',
      callback: () => fileService.handleFileExport('Shops', shops),
    },
  ];

  const { shops } = useSelector((state) => state.shop);

  /* eslint-disable */
  useEffect(() => {
    dispatch(getShops());
  }, []);
  /* eslint-enable */

  return (
    <CustomTable
      title={'Users'}
      searchAttribute={'name'}
      head={TABLE_HEAD}
      items={shops}
      sideButtons={sideMenuButtonItems}
      topButtons={topButtons}
    />
  );
}
