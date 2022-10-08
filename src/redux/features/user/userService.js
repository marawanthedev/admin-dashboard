import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// import users from '../../../_mock/user';

const users = [...Array(24)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  phoneNumber: faker.phone.number(),
  role: sample(['Admin', 'Customer', 'Seller']),
  email: 'tmarawan11@gmail.com',
  password: '1234',
  friendsNumber: faker.random.numeric(),
  giftsSentNumber: faker.random.numeric(),
  giftsReceivedNumber: faker.date.past().getFullYear(),
}));
// const users = [];

// const BASE_URL = '';

const getUsers = async () => users;
const addUsersCSV = async (_users) => {
  console.log(_users);
  return users;
};

const deleteUser = async (userID) => {
  const remainingUsers = users.filter((user) => user.id !== userID);
  return remainingUsers;
};
const editUserRole = async (data) => {
  console.log('editing user role');
  console.log(data);
  return users;
};

const filterByRole = (role) => {
  const filteredUsers = users.filter((user) => user.role.toLowerCase() === role.toLowerCase());
  return filteredUsers;
};

const filterByDate = async (date) => {
  console.log(`filtering by date of ${date}`);
  // todo filter by api call
  return users;
};

const userService = {
  // functions
  getUsers,
  deleteUser,
  editUserRole,
  addUsersCSV,
  filterByDate,
  filterByRole,
};

export default userService;
