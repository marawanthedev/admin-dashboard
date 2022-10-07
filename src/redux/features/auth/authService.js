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
      user: { firstName, role, email },
    } = res.data.data;
    const userInAuth = { token, firstName, role, email };

    if (user.remember) {
      localStorage.setItem('user', JSON.stringify({ ...userInAuth }));
    }

    return userInAuth;
  } catch (error) {
    throw new Error(error);
  }
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
};

export default authService;
