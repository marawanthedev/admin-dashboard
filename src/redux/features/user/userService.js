import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { http } from '../../../utils/restAPI';

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

const getUsers = async (startingOffset) => {
  const usersRes = await http.get(`profile/getAll/?limit=15&offset=${startingOffset}`);
  const usersData = usersRes.data.data;

  const usersDataToReturn = await Promise.all(
    usersData.map(async (user) => {
      const userToReturn = {};
      userToReturn.name = user.username;
      userToReturn.phoneNumber = user.phoneNumber;
      userToReturn.role = user.role;
      userToReturn.email = user.email;
      userToReturn.giftsReceived = user.metrics?.giftReceived;
      userToReturn.giftSent = user.metrics?.giftSent;

      // messed up a bit
      // userToReturn.friendsNox = user.metrics?.friends;

      const usersFriendsRes = await http.get(`/friend/friendFriendList/${user._id}`);
      const usersFriendsData = usersFriendsRes.data.data;
      userToReturn.friendsNo = usersFriendsData.length;

    // id setting for crud calls
      userToReturn.id = user._id;

      
      return userToReturn;
    })
  );

  return usersDataToReturn;
};
const addUsersCSV = async (_users) => {
  console.log(_users);
  return users;
};

const deleteUser = async (userID) => {
  const remainingUsers = users.filter((user) => user.id !== userID);
  return remainingUsers;
};
const editUserRole = async (role) => {
  console.log('editing user role');
  const { username } = JSON.parse(localStorage.getItem('user'));
  let url;
  if (role === 'seller') url = '/profile/upgradeToSeller';
  else url = `/profile/role/${username}?role=${role}`;

  console.log(url);
  const editRoleRes = await http.post(url);
  const editRoleData = editRoleRes.data.data;
  console.log(editRoleRes);
  // still to be modified
  return users;
};

const filterByRole = (role) => {
  const filteredUsers = users.filter((user) => user.role.toLowerCase() === role.toLowerCase());
  return filteredUsers;
};

const filterByDate = async (dateInfo) => {
  // console.log(`filtering by date of ${dateInfo}`);
  console.log(dateInfo);

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
