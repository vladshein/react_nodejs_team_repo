import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';

import style from './Header.module.css';
import Logo from '../Logo/Logo';
import HeaderNav from '../HeaderNav/HeaderNav';
import AuthBar from '../AuthBar/AuthBar';
import UserBar from '../UserBar/UserBar';
import IconBurgerMenu from '../../common/icons/IconBurgerMenu';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
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

const Header = () => {
  const location = useLocation();
  const isHeroPage = location.pathname === '/' || location.pathname === '/recipes';
  const variant = isHeroPage ? 'dark' : 'light';
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const width = useBreakpoint();
  const isDesktop = width >= 1440;
  const isTablet = width >= 768 && width < 1440;
  const isMobile = width < 768;

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
    <HeaderContent
      key={`${location.pathname}:${isMobile ? 'm' : 'd'}`}
      isHeroPage={isHeroPage}
      variant={variant}
      isLoggedIn={isLoggedIn}
      isDesktop={isDesktop}
      isTablet={isTablet}
      onLoginClick={handleLoginClick}
      onRegisterClick={handleRegisterClick}
      onLogOutClick={handleLogOutClick}
    />
  );
};

const HeaderContent = ({
  isHeroPage,
  variant,
  isLoggedIn,
  isDesktop,
  isTablet,
  onLoginClick,
  onRegisterClick,
  onLogOutClick,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [menuOpen]);

  const handleBurgerClick = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`${style.headerdiv} ${isHeroPage ? style.overlay : ''} ${
          variant === 'dark' ? style.dark : style.light
        }`}>
        <Logo variant={variant === 'dark' ? 'light' : 'dark'} width={83} height={28} />

        {/* Always show on desktop, only if logged in on tablet */}
        <div className={style.headerNavWrapper}>
          {(isDesktop || (isTablet && isLoggedIn)) && (
            <HeaderNav variant={variant === 'dark' ? 'light' : 'dark'} />
          )}
        </div>

        {isLoggedIn ? (
          <div className={style.userAndBurger}>
            <UserBar onLogOutClick={onLogOutClick} />
            <IconBurgerMenu
              className={style.burger}
              onClick={handleBurgerClick}
              stroke={variant === 'dark' ? '#fff' : '#000'}
            />
          </div>
        ) : (
          <AuthBar onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
        )}
      </header>

      <BurgerMenu isOpen={menuOpen} variant={variant === 'dark' ? 'light' : 'dark'} onNavigate={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;
