import { useNavigate } from 'react-router-dom';

const Protected = ({ children, allowedRoles, unAuthorizedComponent }) => {
  const user = JSON.parse(localStorage.getItem('user')) || undefined;
  const navigate = useNavigate();
  let allow = false;

  // handling allow value
  if (user !== undefined && allowedRoles !== undefined) {
    if (typeof allowedRoles === 'string' && allowedRoles === user.role) {
      allow = true;
    }
    if (typeof allowedRoles === 'object') {
      allowedRoles?.forEach((allowedRole) => {
        if (allowedRole === user?.role) {
          allow = true;
        }
      });
    }
  }

  // handling allow based rendering
  if (allow) return children;
  if (!allow) {
    if (!unAuthorizedComponent) navigate('/login');
    else return unAuthorizedComponent;
  }
};

export default Protected;
