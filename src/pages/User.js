import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CustomTable from '../components/CustomTable';
import { deleteUser, getUsers, editUserRole, addUsersCSV } from '../redux/features/user/userSlice';
import fileService from '../utils/files';
import tableHeadService from '../utils/tableHead';

export default function User() {
  const dispatch = useDispatch();
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
      callback: (currentItem) => dispatch(editUserRole({ currentItemID: currentItem.id, role: 'Customer' })),
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

  const { users } = useSelector((state) => state.user);

  console.log(users);
  return (
    <CustomTable
      title={'Users'}
      searchAttribute={'name'}
      head={TABLE_HEAD}
      items={users}
      sideButtons={sideMenuButtonItems}
      topButtons={topButtons}
    />
  );
}
