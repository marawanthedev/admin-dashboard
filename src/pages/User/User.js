import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CustomDatePicker from '../../components/common/customDatePicker/customDatePicker';
import CustomTable from '../../components/CustomTable';
import FilterPopUp from '../../components/filterPopUp/filterPopUp';
import CloseButton from '../../components/common/closeButton/closeButton';
import { CustomLoader } from '../../components/common/customLoader/customLoader';

import {
  deleteUser,
  getUsers,
  editUserRole,
  addUsersCSV,
  filterByDate,
  filterByRole,
} from '../../redux/features/user/userSlice';
import fileService from '../../utils/files';
import tableHeadService from '../../utils/tableHead';
import './User.scss';
import Protected from '../../utils/protected';
import compareDates from '../../utils/compareDates';

export default function User() {
  const dispatch = useDispatch();
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [showFilterPopUp, setShowFilterPopUp] = useState(false);
  const [roleFilterValue, setRoleFilterValue] = useState();
  const [dateStartFilterValue, setDateStartFilterValue] = useState();
  const [dateEndFilterValue, setDateEndFilterValue] = useState();

  const [role, setRole] = useState();
  const [currentItem, setCurrentItem] = useState();
  const [page, setPage] = useState(0);
  const { users, isLoading } = useSelector((state) => state.user);
  const [offset, setOffset] = useState(0);
  // keys for table will only be based on received object keys to avoid having column with no value
  const keys = Object.keys(users[0] || {}).filter((key) => key !== 'id');
  const TABLE_HEAD = tableHeadService.generateTableHead(keys.length > 0 ? keys : []);

  /* eslint-disable */
  useEffect(() => {
    dispatch(getUsers(offset));
  }, [offset]);
  /* eslint-enable */

  const sideMenuButtonItems = [
    {
      text: 'Delete',
      callback: (currentItem) => dispatch(deleteUser(currentItem.id)),
    },
    {
      text: 'Edit Role',
      callback: (currentItem) => {
        setCurrentItem(currentItem);
        setShowEditPopUp(true);
        dispatch(editUserRole(currentItem.role));
      },
    },
  ];

  const topButtons = [
    {
      text: 'Import Users',
      callback: (e) => fileService.handleCsvFileUpload(e, (data) => dispatch(addUsersCSV(data))),
    },
    {
      text: 'Export Users',
      callback: () => fileService.handleFileExport('Users', users),
    },
  ];

  const handleEditRoleSubmit = () => {
    if (role !== undefined && role !== null && role !== '') {
      setShowEditPopUp(false);
      dispatch(editUserRole({ currentItemID: currentItem.id, role }));
    }
  };

  const handleSelectChange = (e) => setRoleFilterValue(e.target.value);

  const handleTasksInOrder = () => {
    dispatch(filterByRole(roleFilterValue));

    const interval = setInterval(() => {
      if (!isLoading) {
        if (!compareDates({ startDate: dateStartFilterValue, endDate: dateEndFilterValue })) {
          alert('Start Date Has to be less than end Date');
        } else {
          dispatch(filterByDate({ startDate: dateStartFilterValue, endDate: dateEndFilterValue }));

          setDateStartFilterValue(undefined);
          setDateEndFilterValue(undefined);

          clearInterval(interval);
        }
      }
    }, 200);
  };

  function getRoleSelectMenu() {
    return (
      <FormControl>
        <InputLabel id="demo-simple-select-label" style={{ zIndex: '4' }}>
          Role
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={roleFilterValue}
          label="Age"
          onChange={handleSelectChange}
          style={{ width: '10rem' }}
        >
          <MenuItem value="customer" style={{ zIndex: '200' }}>
            Customer
          </MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="seller">Seller</MenuItem>
        </Select>
      </FormControl>
    );
  }
  const handleFilterSubmit = () => {
    if (dateStartFilterValue && dateEndFilterValue && roleFilterValue) {
      handleTasksInOrder();
    }
    if (dateStartFilterValue && dateEndFilterValue && !roleFilterValue) {
      if (!compareDates({ startDate: dateStartFilterValue, endDate: dateEndFilterValue })) {
        alert('Start Date Has to be less than end Date');
      } else {
        dispatch(filterByDate({ startDate: dateStartFilterValue, endDate: dateEndFilterValue }));
        setDateStartFilterValue(undefined);
        setDateEndFilterValue(undefined);
      }
    }
    if (!dateStartFilterValue && !dateEndFilterValue && roleFilterValue) {
      dispatch(filterByRole(roleFilterValue));
    }
    setPage(0);
    setShowFilterPopUp(false);
  };

  return (
    <>
      {/* loader with its own internal handling */}
      <CustomLoader targetReduxFeature="product" />

      <Protected allowedRoles={['admin']}>
        <div>
          {showFilterPopUp ? (
            <FilterPopUp filterSubmitCallBack={handleFilterSubmit} closeBtnCallback={() => setShowFilterPopUp(false)}>
              {getRoleSelectMenu()}
              <CustomDatePicker
                previous
                text={'Start Date'}
                onSelectCallback={(value) => setDateStartFilterValue(value)}
              />
              <CustomDatePicker text={'End Date'} onSelectCallback={(value) => setDateEndFilterValue(value)} />
            </FilterPopUp>
          ) : null}

          {showEditPopUp ? (
            <div className="edit-role-popup">
              <CloseButton closeBtnCallback={() => setShowEditPopUp(false)} />
              <div className="edit-role-popup__header">Edit Role</div>
              <div className="edit-role-popup__select">{getRoleSelectMenu()}</div>
              <Button
                variant="contained"
                m
                component="label"
                to="#"
                className="edit-role-popup__button"
                onClick={() => handleEditRoleSubmit()}
              >
                Submit
              </Button>
            </div>
          ) : null}
          <div className={`${showEditPopUp || showFilterPopUp ? 'blur' : null}`}>
            <CustomTable
              title={'Users'}
              searchAttribute={'name'}
              searchPlaceHolder={'name'}
              head={TABLE_HEAD}
              items={users}
              sideButtons={sideMenuButtonItems}
              topButtons={topButtons}
              filterButtonCallBack={() => setShowFilterPopUp(true)}
              page={page}
              pageCallBack={(pageNumber, rowsPerPage) => {
                if ((pageNumber + 1) * rowsPerPage >= users.length) {
                  setOffset(() => offset + 1);
                }
                setPage(pageNumber);
              }}
              searchAllSubmitCallback={() => console.log('search in all')}
            />
          </div>
        </div>
      </Protected>
    </>
  );
}
