import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing } from '../../redux/auth/selectors';
import { openModal } from '../../redux/modal/modalSlice';
import { Navigate, redirect, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const PrivateRoute = ({ component: Component }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isRefreshing && !isLoggedIn) {
      dispatch(
        openModal({
          modalType: 'auth',
          modalProps: { view: 'signIn', redirectTo: location.pathname },
        })
      );
    }
  }, [isLoggedIn, isRefreshing, dispatch, location.pathname]);

  if (isRefreshing) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? Component : <Navigate to="/" />;
};

export default PrivateRoute;
