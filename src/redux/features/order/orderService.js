import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import userService from '../user/userService';
import shopService from '../shops/shopService';

const orders = [...Array(24)].map(() => ({
  id: faker.datatype.number(),
  status: sample(['Delivered', 'picked-up', 'pending']),
  user: sample(['x', 'y', 'z']),
  shop: sample(['x', 'y', 'z']),
  recipientsName: faker.random.word(),
  recipientsAddress: faker.random.word(),
  recipientsType: sample['me,recrave,offline'],
  quantity: faker.random.numeric(),
  totalPrice: faker.random.numeric(),
  paid: sample[('yes', 'no')],
  orderNo: faker.random.numeric(),
}));

// const BASE_URL = '';

const getOrders = async () => orders;

const orderService = {
  // functions
  getOrders,
};

export default orderService;
