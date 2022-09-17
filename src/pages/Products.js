// redux
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../components/CustomTable';
import FilterPopUp from '../components/filterPopUp/filterPopUp';

// components
import {
  getProducts,
  deleteProduct,
  archiveProduct,
  filterByAvailability,
} from '../redux/features/product/productSlice';
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
  const [showFilterPopUp, setShowFilterPopUp] = useState(false);
  const [availabilityFilterValue, setAvailabilityFilterValue] = useState();
  const [page, setPage] = useState(0);

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
    {
      text: 'Archive Product',
      callback: (currentItem) => dispatch(archiveProduct(currentItem.id)),
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

  const handleSelectChange = (e) => setAvailabilityFilterValue(e.target.value);

  const handleFilterSubmit = () => {
    // todo redux dispatching
    dispatch(filterByAvailability(availabilityFilterValue));
    setPage(0);
    setShowFilterPopUp(false);
  };
  return (
    <>
      {showFilterPopUp ? (
        <FilterPopUp filterSubmitCallBack={handleFilterSubmit} closeBtnCallback={() => setShowFilterPopUp(false)}>
          <FormControl>
            <InputLabel id="demo-simple-select-label" style={{ zIndex: '4' }}>
              Availability
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={availabilityFilterValue}
              label="Age"
              onChange={handleSelectChange}
              style={{ width: '10rem' }}
            >
              <MenuItem value="available" style={{ zIndex: '200' }}>
                Available
              </MenuItem>
              <MenuItem value="not-available">Not Available</MenuItem>
            </Select>
          </FormControl>
        </FilterPopUp>
      ) : null}
      <div className={`${showFilterPopUp ? 'blur' : null}`}>
        <CustomTable
          title={'Product'}
          searchAttribute={'shopHandle'}
          searchPlaceHolder={'shop'}
          head={TABLE_HEAD}
          items={products}
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
