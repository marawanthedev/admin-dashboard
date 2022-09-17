import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// import { http } from '../../../utils/restAPI';
// import assert from '../../../utils/assertion';
import users from '../../../_mock/user';

const usersName = users.map((user) => user.name);

const shops = [...Array(24)].map(() => ({
  id: faker.datatype.uuid(),
  user: sample([...usersName]),
  name: faker.name.findName(),
  handle: faker.random.word(),
  collection: faker.random.words(),
  description: faker.random.words(),
  tagline: faker.random.word(),
  address: faker.address.city(),
}));

// const BASE_URL = '';

const getShops = async () => shops;
const addShop = async (newShop) => {
  console.log('adding shop');
  const updatedShops = shops.push(newShop);
  return updatedShops;
};

const deleteShop = async (userID) => {
  const remainingUsers = shops.filter((user) => user.id !== userID);
  return remainingUsers;
};
const editShopInfo = async (data) => {
  // edit shop
  // edited shop data here
  // posted to api later
  console.log(data);
  console.log('editing shop');
};
const filterByDate = async (date) => {
  console.log(`filtering by date of ${date}`);
  // todo filter by api call
  return users;
};

const shopService = {
  // functions
  addShop,
  getShops,
  deleteShop,
  editShopInfo,
  filterByDate,
};

export default shopService;
