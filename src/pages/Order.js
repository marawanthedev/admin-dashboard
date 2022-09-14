// redux
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CustomTable from '../components/CustomTable';
// components
import { getOrders } from '../redux/features/order/orderSlice';
import fileService from '../utils/files';
import tableHeadService from '../utils/tableHead';
// ----------------------------------------------------------------------

const TABLE_HEAD = tableHeadService.generateTableHead([
  'id',
  'status',
  'user',
  'shop',
  'recipientsName',
  'recipientsAddress',
  'recipientsType',
  'quantity',
  'totalPrice',
  'paid',
  'orderNo',
]);

// ----------------------------------------------------------------------

export default function Orders() {
  const dispatch = useDispatch();

  /* eslint-disable */
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  /* eslint-enable */

  const { orders } = useSelector((state) => state.order);

  const sideMenuButtonItems = [];

  const topButtons = [
    {
      text: 'Import Orders',
      callback: (e) =>
        fileService.handleFileUpload(e, (data) => {
          // todo add to redux state
          console.log(data);
        }),
    },
  ];
  return (
    <CustomTable
      title={'test'}
      searchAttribute={'status'}
      head={TABLE_HEAD}
      items={orders}
      sideButtons={sideMenuButtonItems}
      topButtons={topButtons}
      showId
    />
  );
}
