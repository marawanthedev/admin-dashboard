// redux
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../components/CustomTable';
import FilterPopUp from '../components/filterPopUp/filterPopUp';
import ImageSliderPopUp from '../components/imageSliderPopup/imageSliderPopup';
import sampleProduct from '../assets/airpdos.jfif';

// components
import {
  getProducts,
  deleteProduct,
  archiveProduct,
  filterByAvailability,
} from '../redux/features/product/productSlice';
import tableHeadService from '../utils/tableHead';
import fileService from '../utils/files';
import Protected from '../utils/protected';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Product() {
  const [showFilterPopUp, setShowFilterPopUp] = useState(false);
  const [availabilityFilterValue, setAvailabilityFilterValue] = useState();
  const [showImageSlider, setShowImageSlider] = useState(false);
  const [currentProductName, setCurrentProductName] = useState();
  const [page, setPage] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  // keys for table will only be based on recieved object keys to avoid having column with no value or mapping values to wrong columns
  const keys = Object.keys(products[0] || {});
  const TABLE_HEAD = tableHeadService.generateTableHead(keys.length > 0 ? keys : []);

  /* eslint-disable */
  useEffect(() => {
    dispatch(getProducts());
    const keys = products[0]?.keys;
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
    // {
    //   text: 'Import Products',
    //   // todo add to redux state
    //   callback: (e) => fileService.handleFileUpload(e, (data) => console.log(data)),
    // },
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
  const handleFilterPopUpRendering = () => {
    if (showFilterPopUp) {
      return (
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
      );
    }
    return null;
  };
  const handleImageSliderPopUpRendering = () => {
    if (showImageSlider) {
      return (
        <ImageSliderPopUp
          closeBtnCallback={() => setShowImageSlider(false)}
          images={[sampleProduct, sampleProduct]}
          header={currentProductName}
        />
      );
    }
    return null;
  };
  return (
    <>
      <Protected allowedRoles={['admin', 'seller']}>
        {handleFilterPopUpRendering()}
        {handleImageSliderPopUpRendering()}
        <div className={`${showFilterPopUp || showImageSlider ? 'blur' : null}`}>
          <CustomTable
            title={'Products'}
            searchAttribute={'title'}
            searchPlaceHolder={'title'}
            head={TABLE_HEAD}
            items={products}
            sideButtons={sideMenuButtonItems}
            topButtons={topButtons}
            filterButtonCallBack={() => setShowFilterPopUp(true)}
            page={page}
            pageCallBack={(value) => setPage(value)}
            imageThumbnailCallBack={(product) => {
              setCurrentProductName(product.title);
              setShowImageSlider(true);
            }}
          />
        </div>
      </Protected>
    </>
  );
}
