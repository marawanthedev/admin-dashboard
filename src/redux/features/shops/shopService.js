import { faker } from '@faker-js/faker';
import { selectClasses } from '@mui/material';
import { sample, update } from 'lodash';
import { http } from '../../../utils/restAPI';
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



function extractCollectionInfo(collections) {
  let collectionSummary = '';

  collections.forEach((collection, index) => {
    collectionSummary += collection.name;

    if (index !== collections.length - 1) {
      collectionSummary += ',';
    }
  });

  return collectionSummary;
}

const getShops = async (startingOffset) => {
  const shopsRes = await http.get(`shop/getAll?offset=${startingOffset || 0}&limit=15&getShopDetails`);
  const shopsData = shopsRes.data.data;

  return shopsData.map((shop) => {
    const { _id, address, handle, name, collections } = shop;
    const shopToReturn = {};

    shopToReturn.name = name;
    shopToReturn.collections = extractCollectionInfo(collections);
    shopToReturn.handle = handle;
    shopToReturn.address = Object.values(address).flat();
    // id setting for crud calls
    shopToReturn.id = _id;

    return shopToReturn;
  });
};
const addShop = async (newShop) => {
  const { city, state, country, postalCode, name, handle, select } = newShop;

  const shopToPost = {
    userId: select,
    name,
    handle,
    address: {
      formattedAddress: `${city},${postalCode},${state},${country}`,
      state,
      city,
      country,
      postalCode,
    },
  };
  delete shopToPost.select;
  delete shopToPost.undefined;

  console.log('adding shop')
  console.log(shopToPost);

  const shopAdditionRes = await http.post('shop/create', shopToPost);
  const shopAdditionData = await shopAdditionRes.data.data;


  return shops;
};

const deleteShop = async (shopId) => {
  // todo to be done later
  // const remainingUsers = shops.filter((user) => user.id !== userID);
  console.log(shopId);

  // todo to be activated later
  // const shopResData = http.delete(`shop/delete/${shopId}`);
  // const shopData = shopResData.data.data;

  return shops;
};
const editShopInfo = async ({ handle, name, country, state, city, postalCode, id }) => {
  // edit shop
  // edited shop data here
  // posted to api later
  // invalid api expectations
  const shopToUpdate = {
    name,
    handle,
    address: {
      formattedAddress: `${city},${postalCode},${state},${country}`,
      state,
      city,
      country,
      postalCode,
    },
  };

  console.log('editing shop with id of', id);
  const updateShopRes = await http.put(`shop/update/${id}`, shopToUpdate)
  const updateShopData = updateShopRes.data.data
  console.log(updateShopRes)
};
const filterByDate = async (dateInfo) => {
  const { startDate, endDate } = dateInfo;
  console.log(startDate);
  console.log(endDate);

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
