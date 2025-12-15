import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate, redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, onAuthRequest }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? Component : onAuthRequest(true);
};

export default PrivateRoute;
