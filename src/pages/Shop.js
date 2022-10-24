// redux
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomDatePicker from '../components/common/customDatePicker/customDatePicker';
import FilterPopUp from '../components/filterPopUp/filterPopUp';

import CustomTable from '../components/CustomTable';
import tableHeadService from '../utils/tableHead';
import fileService from '../utils/files';
// components
import { getShops, deleteShop, filterByDate, addShop } from '../redux/features/shops/shopSlice';
import Protected from '../utils/protected';
import { CustomLoader } from '../components/common/customLoader/customLoader';
import compareDates from '../utils/compareDates';
// ----------------------------------------------------------------------

export default function Shop() {
  const navigate = useNavigate();
  const [showFilterPopUp, setShowFilterPopUp] = useState(false);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const { shops } = useSelector((state) => state.shop);
  const [dateStartFilterValue, setDateStartFilterValue] = useState(new Date());
  const [dateEndFilterValue, setDateEndFilterValue] = useState(new Date());

  // keys for table will only be based on recieved object keys to avoid having column with no value
  const keys = Object.keys(shops[0] || {}).filter((key) => key !== 'id');
  const TABLE_HEAD = tableHeadService.generateTableHead(keys.length > 0 ? keys : []);

  const sideMenuButtonItems = [
    {
      text: 'Delete',
      callback: (currentItem) => dispatch(deleteShop(currentItem.id)),
    },
    // {
    //   text: 'Import Shops',
    //   callback: (e) => fileService.handleCsvFileUpload(e, (data) => dispatch(addShop(data))),
    // },
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
    dispatch(getShops(offset));
  }, [offset]);
  /* eslint-enable */

  const handleFilterSubmit = () => {
    if (!compareDates({ startDate: dateStartFilterValue, endDate: dateEndFilterValue })) {
      alert('Start Date Has to be less than end Date');
    } else {
      dispatch(filterByDate({ startDate: dateStartFilterValue, endDate: dateEndFilterValue }));
      setPage(0);
      setShowFilterPopUp(false);
    }
  };

  return (
    <>
      {/* todo to add user type */}
      {/* loader with its own internal handling */}
      <CustomLoader targetReduxFeature="shop" />
      <Protected allowedRoles={['admin']}>
        {showFilterPopUp ? (
          <FilterPopUp filterSubmitCallBack={handleFilterSubmit} closeBtnCallback={() => setShowFilterPopUp(false)}>
            <CustomDatePicker
              previous
              text={'Start Date'}
              onSelectCallback={(value) => setDateStartFilterValue(value)}
            />
            <CustomDatePicker text={'End Date'} onSelectCallback={(value) => setDateEndFilterValue(value)} />
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
            pageCallBack={(pageNumber, rowsPerPage) => {
              if ((pageNumber + 1) * rowsPerPage >= shops.length) setOffset(() => offset + 1);
              setPage(pageNumber);
            }}
          />
        </div>
      </Protected>
    </>
  );
}
