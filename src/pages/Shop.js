// redux
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomDatePicker from '../components/customDatePicker/customDatePicker';
import FilterPopUp from '../components/filterPopUp/filterPopUp';

import CustomTable from '../components/CustomTable';
import tableHeadService from '../utils/tableHead';
import fileService from '../utils/files';
// components
import { getShops, deleteShop, filterByDate } from '../redux/features/shops/shopSlice';
import Protected from '../utils/protected';
// ----------------------------------------------------------------------

export default function Shop() {
  const navigate = useNavigate();
  const [showFilterPopUp, setShowFilterPopUp] = useState(false);
  const [dateFilterValue, setDateFilterValue] = useState(new Date());
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const { shops } = useSelector((state) => state.shop);

  // keys for table will only be based on recieved object keys to avoid having column with no value
  const keys = Object.keys(shops[0] || {}).filter((key) => key !== 'id');
  const TABLE_HEAD = tableHeadService.generateTableHead(keys.length > 0 ? keys : []);

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
      text: 'Export Shop',
      callback: () => fileService.handleFileExport('Shops', shops),
    },
  ];

  /* eslint-disable */
  useEffect(() => {
    dispatch(getShops());
  }, []);
  /* eslint-enable */

  const handleFilterSubmit = () => {
    dispatch(filterByDate(dateFilterValue));
    setPage(0);
    setShowFilterPopUp(false);
  };

  return (
    <>
      {/* todo to add user type */}
      <Protected allowedRoles={['admin']}>
        {showFilterPopUp ? (
          <FilterPopUp filterSubmitCallBack={handleFilterSubmit} closeBtnCallback={() => setShowFilterPopUp(false)}>
            <CustomDatePicker onSelectCallback={(value) => setDateFilterValue(value)} />
          </FilterPopUp>
        ) : null}
        <div className={`${showFilterPopUp ? 'blur' : null}`}>
          <CustomTable
            title={'Shops'}
            searchAttribute={'name'}
            searchPlaceHolder={'name'}
            head={TABLE_HEAD}
            items={shops}
            sideButtons={sideMenuButtonItems}
            topButtons={topButtons}
            filterButtonCallBack={() => setShowFilterPopUp(true)}
            page={page}
            pageCallBack={(value) => setPage(value)}
          />
        </div>
      </Protected>
    </>
  );
}
