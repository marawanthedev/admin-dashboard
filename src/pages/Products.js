// redux
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../components/CustomTable';
import FilterPopUp from '../components/filterPopUp/filterPopUp';
import ImageSliderPopUp from '../components/form/imageSliderPopup/imageSliderPopup';
import { CustomLoader } from '../components/common/customLoader/customLoader';

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
  const [currentProduct, setCurrentProduct] = useState();
  const [page, setPage] = useState(0);
  const { products } = useSelector((state) => state.product);
  // keys for table will only be based on recieved object keys to avoid having column with no value or mapping values to wrong columns
  const keys = Object.keys(products[0] || {});
  const TABLE_HEAD = tableHeadService.generateTableHead(keys.length > 0 ? keys : []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  /* eslint-disable */
  useEffect(() => {
    dispatch(getProducts());
    const keys = products[0]?.keys;
  }, []);
  /* eslint-enable */

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
    const extractedImage = currentProduct?.images.map((image) => image.full);
    if (showImageSlider && extractedImage) {
      return (
        <ImageSliderPopUp
          closeBtnCallback={() => setShowImageSlider(false)}
          images={extractedImage}
          header={currentProduct.title}
        />
      );
    }
    return null;
  };
  return (
    <>
      {/* loader with its own internal handling */}
      <CustomLoader targetReduxFeature="product" />
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
              setCurrentProduct(product);
              setShowImageSlider(true);
            }}
          />
        </div>
      </Protected>
    </>
  );
}
