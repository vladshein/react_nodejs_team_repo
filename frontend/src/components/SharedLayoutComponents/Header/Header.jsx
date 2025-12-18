import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';

import style from './Header.module.css';
import Logo from '../Logo/Logo';
import HeaderNav from '../HeaderNav/HeaderNav';
import AuthBar from '../AuthBar/AuthBar';
import UserBar from '../UserBar/UserBar';
import IconBurgerMenu from '../../common/icons/IconBurgerMenu';
import { openModal } from '../../../redux/modal/modalSlice';
import { useEffect, useState } from 'react';

function useBreakpoint() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

const Header = ({ onBurgerClick }) => {
  const location = useLocation();
  const variant = location.pathname === '/' ? 'dark' : 'light';
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const width = useBreakpoint();
  const isDesktop = width >= 1440;
  const isTablet = width >= 768 && width < 1440;

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
        {/* <HeaderNav variant={variant === 'dark' ? 'light' : 'dark'} /> */}

        {/* Always show on desktop, only if logged in on tablet */}
        <div className={style.headerNavWrapper}>
          {(isDesktop || (isTablet && isLoggedIn)) && (
            <HeaderNav variant={variant === 'dark' ? 'light' : 'dark'} />
          )}
        </div>

        {isLoggedIn ? (
          // <div className={style.userAndBurger}>
          <>
            <UserBar onLogOutClick={handleLogOutClick} />
            <IconBurgerMenu className={style.burger} onClick={onBurgerClick} />
          </>
        ) : (
          //
          <AuthBar onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
        )}
      </header>
    </>
  );
};

export default Header;
