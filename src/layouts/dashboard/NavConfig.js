// component
import StoreIcon from '../../assets/store.png';
import UserIcon from '../../assets/user.png';
import RegisterIcon from '../../assets/add-user.png';
import OrderIcon from '../../assets/order.png';
import CategoryIcon from '../../assets/category.png';
import ProductIcon from '../../assets/cubes.png';
import DashboardIcon from '../../assets/dashboard.png';
import NotFoundIcon from '../../assets/warning.png';
import LoginIcon from '../../assets/login.png';

// ----------------------------------------------------------------------

const getIcon = (link) => {
  // if (name !== null) {
  //   return <Iconify icon={name} width={22} height={22} />;
  // }
  if (link) {
    return (
      <div
        className="side-nav-custom-icon"
        style={{
          width: '22px',
          height: '22px',
          backgroundImage: `url(${link})`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          filter: 'grayscale(100%)',
        }}
      />
    );
  }
};

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(DashboardIcon),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(UserIcon),
  },
  {
    title: 'shop',
    path: '/dashboard/shop',
    icon: getIcon(StoreIcon),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon(ProductIcon),
  },
  {
    title: 'category',
    path: '/dashboard/category',
    icon: getIcon(CategoryIcon),
  },
  {
    title: 'orders',
    path: '/dashboard/orders',
    icon: getIcon(OrderIcon),
  },

  {
    title: 'login',
    path: '/login',
    icon: getIcon(LoginIcon),
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon(RegisterIcon),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon(NotFoundIcon),
  },
];

export default navConfig;
