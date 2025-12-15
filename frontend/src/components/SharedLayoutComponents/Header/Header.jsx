import style from './Header.module.css';
import Logo from '../Logo/Logo';
import HeaderNav from '../HeaderNav/HeaderNav';
import AuthBar from '../AuthBar/AuthBar';
import { useLocation } from 'react-router-dom';
import UserBar from '../UserBar/UserBar';

const Header = () => {
  const location = useLocation();
  const variant = location.pathname === '/' ? 'dark' : 'light';
  const authorized = true;
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={`${style.headerdiv} ${variant === 'dark' ? style.dark : style.light}`}>
      <Logo variant={variant === 'dark' ? 'light' : 'dark'} />
      <HeaderNav variant={variant === 'dark' ? 'light' : 'dark'} />
      {authorized ? <UserBar /> : <AuthBar />}
    </header>
  );
};

export default Header;
