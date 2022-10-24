// const BASE_URL = '';
// import userService from '../user/userService';
import { http } from '../../../utils/restAPI';

const loginUser = async (userCredentials) => {
  const user = userCredentials;

  try {
    const data = {
      login: 'jinkunyong',
      password: 'Test123123',
    };
    const res = await http.post('auth/login', data);

    const {
      token,
      user: { firstName, role, email, username },
    } = res.data.data;
    const userInAuth = { token, firstName, role, email, username };

    if (user.remember) {
      localStorage.setItem('user', JSON.stringify({ ...userInAuth }));
    }

    return userInAuth;
  } catch (error) {
    throw new Error(error);
  }
};
const registerUser = async (userInfo) => {
  // todo using api calls later
  const userToPost = {
    username: `${userInfo?.firstName}${userInfo?.lastName}`,
    password: userInfo.password,
    phoneNumber: userInfo.phoneNumber,
  };


  try {
    await http.post('/auth/signup', userToPost);
  } catch (error) {
    throw new Error(error);
  }
  // return users;
};

const logoutUser = () => {
  const currentUser = null;
  localStorage.removeItem('user');
  return currentUser;
};

const authService = {
  // functions
  loginUser,
  logoutUser,
  registerUser,
};

export default authService;
