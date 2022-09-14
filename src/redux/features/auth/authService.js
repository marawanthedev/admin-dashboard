// const BASE_URL = '';
// import userService from '../user/userService';

const loginUser = (userCredentials) => {
  // const users = userService.getUsers();
  //   const user = getMatchingUser({ email: userCredentials.email, password: userCredentials.password, users });

  const user = userCredentials;

  if (user !== null && user !== undefined) {
    return user;
  }
  return null;
};

const authService = {
  // functions
  loginUser,
};

export default authService;
