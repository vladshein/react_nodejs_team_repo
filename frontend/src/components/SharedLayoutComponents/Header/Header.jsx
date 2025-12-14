import style from './Header.module.css';
import Logo from '../Logo/Logo';
import HeaderNav from '../HeaderNav/HeaderNav';
import AuthBar from '../AuthBar/AuthBar';

const Header = () => {
  return (
    <header className={style.headerdiv}>
      <Logo />
      <HeaderNav />
      <AuthBar />
    </header>
  );
};

export default Header;
