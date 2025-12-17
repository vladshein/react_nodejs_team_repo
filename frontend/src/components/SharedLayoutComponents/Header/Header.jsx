import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';

import style from './Header.module.css';
import Logo from '../Logo/Logo';
import HeaderNav from '../HeaderNav/HeaderNav';
import AuthBar from '../AuthBar/AuthBar';
import UserBar from '../UserBar/UserBar';
import { openModal } from '../../../redux/modal/modalSlice';

const Header = () => {
  const location = useLocation();
  const variant = location.pathname === '/' ? 'dark' : 'light';
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    dispatch(openModal({ modalType: 'auth', modalProps: { view: 'signIn' } }));
  };

  const handleRegisterClick = () => {
    dispatch(openModal({ modalType: 'auth', modalProps: { view: 'signUp' } }));
  };

  const handleLogOutClick = () => {
    dispatch(openModal({ modalType: 'logout' }));
  };

  return (
    <>
      <header className={`${style.headerdiv} ${variant === 'dark' ? style.dark : style.light}`}>
        <Logo variant={variant === 'dark' ? 'light' : 'dark'} />
        <HeaderNav variant={variant === 'dark' ? 'light' : 'dark'} />

        {isLoggedIn ? (
          <UserBar onLogOutClick={handleLogOutClick} />
        ) : (
          <AuthBar onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
        )}
      </header>
    </>
  );
};

export default Header;
