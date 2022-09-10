// const BASE_URL = '';
import userService from '../user/userService';

const loginUser = (userCredentials) => {
  const users = userService.getUsers();
  console.log(users);
  console.log(userCredentials);
  //   const user = getMatchingUser({ email: userCredentials.email, password: userCredentials.password, users });

  const user = userCredentials;

  if (user !== null && user !== undefined) {
    return user;
  }
  return null;
};
const getMatchingUser = ({ email, password, users }) => {
  const matchingUser = users.filter((user) => user.email === email && user.password === password);

  return matchingUser;
};

const authService = {
  // functions
  loginUser,
};

export default authService;
