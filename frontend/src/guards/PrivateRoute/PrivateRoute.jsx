import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing } from '../../redux/auth/selectors';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ element, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const location = useLocation();

  if (isRefreshing) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    console.log('isRefreshing:', isRefreshing, 'isLoggedIn:', isLoggedIn);

    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return element;
};

export default PrivateRoute;
