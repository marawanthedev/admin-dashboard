import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CustomDatePicker from '../../components/customDatePicker/customDatePicker';
import CustomTable from '../../components/CustomTable';
import FilterPopUp from '../../components/filterPopUp/filterPopUp';
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

export default function User() {
  const dispatch = useDispatch();
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [showFilterPopUp, setShowFilterPopUp] = useState(false);
  const [roleFilterValue, setRoleFilterValue] = useState();
  const [dateFilterValue, setDateFilterValue] = useState(new Date());
  const [role, setRole] = useState();
  const [currentItem, setCurrentItem] = useState();
  const [page, setPage] = useState(0);

  const TABLE_HEAD = tableHeadService.generateTableHead([
    'name',
    'phoneNumber',
    'email',
    'role',
    'friendsNumber',
    'giftsSentNumber',
    'giftsReceivedNumber',
  ]);

  /* eslint-disable */
  useEffect(() => {
    dispatch(getUsers());
  }, []);
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
      },
    },
  ];

  const topButtons = [
    {
      text: 'Import Users',
      callback: (e) => fileService.handleFileUpload(e, (data) => dispatch(addUsersCSV(data))),
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

  const { users, isLoading } = useSelector((state) => state.user);
  const handleSelectChange = (e) => setRoleFilterValue(e.target.value);

  const handleTasksInOrder = () => {
    dispatch(filterByRole(roleFilterValue));

    const interval = setInterval(() => {
      if (!isLoading) {
        dispatch(filterByDate(dateFilterValue));
        clearInterval(interval);
      }
    }, 200);
  };
  const handleFilterSubmit = () => {
    if (dateFilterValue && roleFilterValue) {
      handleTasksInOrder();
    }
    if (dateFilterValue && !roleFilterValue) {
      dispatch(filterByDate(dateFilterValue));
    }
    if (!dateFilterValue && roleFilterValue) {
      dispatch(filterByRole(roleFilterValue));
    }
    setPage(0);
    setShowFilterPopUp(false);
  };
  return (
    <div>
      {showFilterPopUp ? (
        <FilterPopUp filterSubmitCallBack={handleFilterSubmit} closeBtnCallback={() => setShowFilterPopUp(false)}>
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
          <CustomDatePicker onSelectCallback={(value) => setDateFilterValue(value)} />
        </FilterPopUp>
      ) : null}

      {showEditPopUp ? (
        <div className="edit-role-popup">
          <button className="edit-role-popup__close-btn" type="button" onClick={() => setShowEditPopUp(false)}>
            X
          </button>
          <div className="edit-role-popup__header">Edit Role</div>
          <TextField
            fullWidth
            error={role === '' || role === null}
            onChange={(e) => setRole(e.target.value)}
            placeholder="role"
            size="small"
            label="role"
            className="edit-role-popup__input"
            defaultValue={currentItem.role}
          />
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
          pageCallBack={(value) => setPage(value)}
        />
      </div>
    </div>
  );
}
