import style from './Header.module.css';
import Logo from '../Logo/Logo';
import HeaderNav from '../HeaderNav/HeaderNav';
import AuthBar from '../AuthBar/AuthBar';
import { useLocation } from 'react-router-dom';

const Header = ({ onLoginClick, onRegisterClick }) => {
  const location = useLocation();
  const variant = location.pathname === '/' ? 'dark' : 'light';

  return (
    <header className={`${style.headerdiv} ${variant === 'dark' ? style.dark : style.light}`}>
      <Logo variant={variant === 'dark' ? 'light' : 'dark'} />
      <HeaderNav variant={variant === 'dark' ? 'light' : 'dark'} />
      <AuthBar onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
    </header>
  );
};

export default Header;
