import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { http } from '../../../utils/restAPI';
import shops from '../../../_mock/shops';
import FlattenObjectArray from '../../../utils/flatenedObjectsArray';

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
const getProducts = async (startingOffset) => {
  const productsRes = await http.get(`product/getAll?offset=${startingOffset}&limit=14&getProductDetails=&getCategory`);
  const productsData = await productsRes.data.data;

  return productsData.map(
    ({ _id, title, price, quantity, availability, images, description, shippingDetails, category }) => {
      const productToReturn = {};
      const shopHandle = 'shop handle';

      productToReturn.title = title;
      productToReturn.price = price.value;
      productToReturn.quantity = quantity;
      productToReturn.category = FlattenObjectArray({ array: category, targetProp: 'name' });
      productToReturn.availability = availability;
      productToReturn.images = images;
      productToReturn.description = description;
      productToReturn.shopHandle = shopHandle;
      productToReturn.shippingDetails = shippingDetails;
    // id setting for crud calls
      productToReturn.id = _id;

      return productToReturn;
    }
  );
};
const addProduct = async (newProduct) => {
  const newProducts = products.push(newProduct);
  const productRes = http.post('product/add', newProduct);
  const productData = productRes.data.data;

  console.log(productRes);
  console.log(productData);
  return newProducts;
};
const editProduct = async (updatedProduct) => {
  console.log(updatedProduct);
  return products;
};

const deleteProduct = async (productId) => {
  console.log('deleting product with id of:', productId);
  const deletedProductRes = await http.delete(`product/${productId}`)
  const deletedProductData = deletedProductRes.data.data
  console.log(deletedProductData)
  // return newProducts;
};

const archiveProduct = async (productId) => {
  console.log('archiving product with id of:', productId);
  const archivedProductRes = await http.put(`product/update/${productId}`, { status: "archived" })
  const archivedProductData = archivedProductRes.data.data
  console.log(archivedProductData)

  return products;
};

const orderService = {
  getProducts,
  archiveProduct,
  addProduct,
  editProduct,
  deleteProduct,
};

export default orderService;
