import { NavLink, Link } from 'react-router-dom';
import style from './Header.module.css';
import Logo from '../Logo/Logo';
import HeaderNav from '../HeaderNav/HeaderNav';
import AuthBar from '../AuthBar/AuthBar';

const Header = () => {
  return (
    <header className={style.headerdiv}>
      <Link to="/">
        <Logo />
      </Link>
      <HeaderNav />
      <AuthBar />
    </header>
  );
};

export default Header;
