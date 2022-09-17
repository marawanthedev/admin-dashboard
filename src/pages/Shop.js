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
// ----------------------------------------------------------------------

export default function Shop() {
  const navigate = useNavigate();
  const [showFilterPopUp, setShowFilterPopUp] = useState(false);
  const [dateFilterValue, setDateFilterValue] = useState(new Date());
  const [page, setPage] = useState(0);

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

  const handleFilterSubmit = () => {
    dispatch(filterByDate(dateFilterValue));
    setPage(0);
    setShowFilterPopUp(false);
  };

  return (
    <>
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
    </>
  );
}
