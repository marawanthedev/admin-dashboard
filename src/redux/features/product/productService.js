import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { http } from '../../../utils/restAPI';
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
  availability: sample(['available', 'not-available']),
  shippingDetails: faker.random.words(),
}));

// const BASE_URL = '';
const getProducts = async () => {
  const productsRes = await http.get(`product/getAll?offset=0&limit=24&getProductDetails=`);
  const productsData = await productsRes.data.data;

  return productsData.map((product) => {
    const productToReturn = {};
    const shopHandle = 'shop handle';
    // category data fetching
    const category = 'category';
    // already made sure that is product
    productToReturn.title = product.title;
    productToReturn.price = product.price.value;
    productToReturn.quantity = product.quantity;
    productToReturn.category = category;
    productToReturn.availability = product.availability;  
    productToReturn.images = product.images;
    productToReturn.description = product.description;
    productToReturn.shopHandle = shopHandle;
    productToReturn.shippingDetails = product.shippingDetails;

    return productToReturn;
  });

};
const addProduct = async (newProduct) => {
  const newProducts = products.push(newProduct);
  return newProducts;
};
const editProduct = async (updatedProduct) => {
  console.log('edit product');
  console.log(updatedProduct);
  return products;
};

const deleteProduct = async (productId) => {
  const newProducts = products.filter((product) => product.id !== productId);
  return newProducts;
};

const archiveProduct = async (productId) => {
  console.log('archive product');
  console.log(productId);
  return products;
};
const filterByAvailability = async (availability) => {
  const filteredUProducts = products.filter((product) => product.availability === availability);
  return filteredUProducts;
};
const orderService = {
  getProducts,
  archiveProduct,
  addProduct,
  editProduct,
  deleteProduct,
  filterByAvailability,
};

export default orderService;

// if (products) {
//   return products.forEach(async (product) => {
//     const productToPush = {};
//     const { shopId, categoryId } = product;

//     // shop data fetching
//     const shopRes = await http.get(`shop/get/${shopId}`);
//     const shopHandle = shopRes?.data?.data?.handle;

//     // category data fetching
//     const categoryRes = await http.get(`category/get/${categoryId}`);
//     const category = categoryRes?.data?.data?.name;

//     // already made sure that is product
//     productToPush.shopHandle = shopHandle;
//     productToPush.category = category;
//     productToPush.title = product.title;
//     productToPush.description = product.description;
//     productToPush.images = product.images;
//     productToPush.availability = product.availability;
//     productToPush.price = product.price;
//     productToPush.quantity = product.quantity;
//     productToPush.shippingDetails = product.shippingDetails;

//     // return productToPush;
//     productss.push(productToPush);
//   });

//   // products correct population
//   // console.log(productss);
// }
