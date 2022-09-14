import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import shops from '../../../_mock/shops';

const shopsHandle = shops.map((shop) => shop.handle);

const products = [...Array(24)].map(() => ({
  id: faker.datatype.number(),
  title: faker.random.word(),
  description: faker.random.word(),
  images: faker.datatype.number(),
  price: faker.datatype.number(),
  quantity: faker.datatype.number(),
  category: sample(['food', 'fashion', 'homemade']),
  shopHandle: sample([...shopsHandle]),
  availability: sample(['available', 'not available']),
  shippingDetails: faker.random.words(),
}));

// const BASE_URL = '';
const getProducts = async () => products;
const addProduct = async (newProduct) => {
  console.log('add product');
  const newProducts = products.push(newProduct);
  return newProducts;
};
const editProduct = async (editedProduct) => {
  console.log('edit product');
};

const deleteProduct = async (productId) => {
  const newProducts = products.filter((product) => product.id !== productId);
  return newProducts;
};

const archiveProduct = async (productId) => {
  console.log('archive product');
};
const orderService = {
  getProducts,
  archiveProduct,
  addProduct,
  editProduct,
  deleteProduct,
};

export default orderService;
