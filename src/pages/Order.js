// redux
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
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
  const [page, setPage] = useState(0);

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
      title={'Order'}
      searchAttribute={'shop'}
      head={TABLE_HEAD}
      items={orders}
      sideButtons={sideMenuButtonItems}
      topButtons={topButtons}
      showId
      page={page}
      pageCallBack={(value) => setPage(value)}
    />
  );
}
