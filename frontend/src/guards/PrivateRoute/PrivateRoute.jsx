import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { openModal } from '../../redux/modal/modalSlice';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  const openLoginModal = () => {
    dispatch(openModal({ modalType: 'auth', modalProps: { view: 'signIn' } }));
  };

  if (!isLoggedIn) {
    openLoginModal();
    return <Navigate to="/" />;
  }
  return Component;
};

export default PrivateRoute;
