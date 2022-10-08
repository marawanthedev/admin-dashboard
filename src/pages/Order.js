// redux
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CustomTable from '../components/CustomTable';
// components
import { getOrders } from '../redux/features/order/orderSlice';
import fileService from '../utils/files';
import tableHeadService from '../utils/tableHead';
import Protected from '../utils/protected';
import { CustomLoader } from '../components/common/customLoader/customLoader';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Orders() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const { orders } = useSelector((state) => state.order);

  const keys = Object.keys(orders[0] || {});
  const TABLE_HEAD = tableHeadService.generateTableHead(keys.length > 0 ? keys : []);

  /* eslint-disable */
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  /* eslint-enable */

  const sideMenuButtonItems = [];

  const topButtons = [
    {
      text: 'Export Orders',
      callback: () => fileService.handleFileExport('Orders', orders),
    },
  ];
  return (
    <>
      {/* loader with its own internal handling */}
      <CustomLoader targetReduxFeature="product" />

      <Protected allowedRoles={['admin']}>
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
      </Protected>
    </>
  );
}
