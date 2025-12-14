import style from './Header.module.css';
import Logo from '../Logo/Logo';
import HeaderNav from '../HeaderNav/HeaderNav';
import AuthBar from '../AuthBar/AuthBar';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';
import UserBar from '../UserBar/UserBar';

const Header = ({ onLoginClick, onRegisterClick, onLogOutClick }) => {
  const location = useLocation();
  const variant = location.pathname === '/' ? 'dark' : 'light';

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={`${style.headerdiv} ${variant === 'dark' ? style.dark : style.light}`}>
      <Logo variant={variant === 'dark' ? 'light' : 'dark'} />
      <HeaderNav variant={variant === 'dark' ? 'light' : 'dark'} />
      {isLoggedIn ? (
        <UserBar onLogOutClick={onLogOutClick} />
      ) : (
        <AuthBar onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
      )}
    </header>
  );
};

export default Header;
