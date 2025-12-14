import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate, redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, setIsSignInModalOpen }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? Component : setIsSignInModalOpen(true) && redirect('/');
};

export default PrivateRoute;
