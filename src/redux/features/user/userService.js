import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { http } from '../../../utils/restAPI';
import assert from '../../../utils/assertion';
// import users from '../../../_mock/user';

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  phoneNumber: faker.phone.number(),
  role: sample(['Admin', 'Customer', 'Seller']),
  email: 'tmarawan11@gmail.com',
  friendsNumber: faker.random.numeric(),
  giftsSentNumber: faker.random.numeric(),
  giftsReceivedNumber: faker.date.past().getFullYear(),
}));
console.log(faker.date.past().getFullYear());
// const users = [];

// const BASE_URL = '';

const getUsers = async () => {
  return users;
};
const addUsersCSV = async (_users) => {
  return _users;
};
const deleteUser = async (userID) => {
  const remainingUsers = users.filter((user) => user.id !== userID);
  return remainingUsers;
};
const editUserRole = async (data) => {
  const usersCopy = [...users];
  for (let i = 0; i < usersCopy.length; i += 1) {
    if (usersCopy[i].id === data.currentItemID) {
      usersCopy[i].role = data.role;
      return;
    }
  }
  return usersCopy;
};
const userService = {
  // functions
  getUsers,
  deleteUser,
  editUserRole,
  addUsersCSV,
};

export default userService;
