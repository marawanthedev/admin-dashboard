import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { http } from '../../../utils/restAPI';
import FlattenObjectArray from '../../../utils/flatenedObjectsArray';

const orders = [...Array(24)].map(() => ({
  id: faker.datatype.number(),
  status: sample(['Delivered', 'picked-up', 'pending']),
  user: sample(['x', 'y', 'z']),
  shop: sample(['x', 'y', 'z']),
  recipientsName: faker.random.word(),
  recipientsAddress: faker.random.word(),
  recipientsType: sample(['me', 'recrave', 'seller']),
  quantity: faker.random.numeric(),
  totalPrice: faker.random.numeric(),
  paid: sample(['yes', 'no']),
  orderNo: faker.random.numeric(),
}));

// const BASE_URL = '';

const getOrders = async () => {
  const res = await http.get('order/getAll?getUserSummary&getShopSummary');
  const orders = res.data.data;

  return orders.map((order) => {
    const orderToReturn = {};
    orderToReturn.status = order.status;
    orderToReturn.user = order.user.firstName;
    orderToReturn.shop = order.shop.name;
    orderToReturn.recipientsName = FlattenObjectArray({ array: order.recipients, targetProp: 'name' });
    orderToReturn.recipientsAddress = FlattenObjectArray({ array: order.recipients, targetProp: 'address' });
    orderToReturn.recipientsType = FlattenObjectArray({ array: order.recipients, targetProp: 'type' });
    orderToReturn.quantity = order.totalQuantity;
    orderToReturn.totalPrice = order.totalPrice;
    orderToReturn.paid = String(order.paid);
    orderToReturn.orderNo = order.orderNo;
    // id setting for crud calls
    orderToReturn.id = order._id;


    return orderToReturn;
  });
};

const orderService = {
  // functions
  getOrders,
};

export default orderService;
