import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { http } from '../../../utils/restAPI';

const categories = [...Array(24)].map(() => ({
  id: faker.datatype.number(),
  name: faker.random.word(),
  parent: faker.random.word(),
  tree: faker.random.word(),
  subCategories: sample(['burger', 'chicken', 'fries']),
}));

// const BASE_URL = '';

const getCategories = async () => {
  const res = await http.get(`category/getAll`);
  const categories = res.data.data;
  return categories;
};

const addCategory = async (newCategory) => {
  console.log(`newely added category object is ${newCategory}`);
  categories.push(newCategory);
  return categories;
};
const editCategory = async (categoryId, updatedCategoryData) => {
  console.log('editing category data down below  id then data');
  console.log(categoryId);
  console.log(updatedCategoryData);
  return categories;
};
const deleteCategory = async (categoryId) => {
  console.log('deleting category');
  console.log(categoryId);

  return categories;
};

const categoryService = {
  // functions
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
};

export default categoryService;
