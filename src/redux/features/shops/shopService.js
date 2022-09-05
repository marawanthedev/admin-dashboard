import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { http } from '../../../utils/restAPI';
import assert from '../../../utils/assertion';
// import users from '../../../_mock/user';

const shops = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  handle: faker.random.word(),
  collection: faker.random.words(),
  description: faker.random.words(),
  tagline: faker.random.word(),
  address: faker.address.city(),
}));

// const BASE_URL = '';

const getShops = async () => {
  return shops;
};

const addShop = async () => {
  // http call
  // new shop data here
  // posted  to api later
  return shops;
};
const deleteShop = async (userID) => {
  const remainingUsers = shops.filter((user) => user.id !== userID);
  return remainingUsers;
};
const editShopInfo = async (data) => {
  // edit shop
  // edited shop data here
  // posted to api later
};
const shopService = {
  // functions
  addShop,
  getShops,
  deleteShop,
  editShopInfo,
};

export default shopService;
