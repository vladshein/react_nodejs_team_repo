import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectIsLoggedIn, selectIsRefreshing } from '../../redux/auth/selectors';
import { openModal } from '../../redux/modal/modalSlice';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const PrivateRoute = ({ component: Component }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoading = useSelector(selectIsLoading); // Додайте логіку для визначення стану завантаження, якщо потрібно
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading || isRefreshing) return;

    if (!isLoggedIn) {
      dispatch(
        openModal({
          modalType: 'auth',
          modalProps: {
            view: 'signIn',
            redirectTo: location.pathname,
            from: location,
          },
        })
      );
    }
  }, [isLoggedIn, isRefreshing, isLoading, dispatch, location]);

  if (isRefreshing) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return null;
  }

  return Component;
};

export default PrivateRoute;
