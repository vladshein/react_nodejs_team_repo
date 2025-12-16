import { useState } from 'react';
import style from './Header.module.css';
import Logo from '../Logo/Logo';
import HeaderNav from '../HeaderNav/HeaderNav';
import AuthBar from '../AuthBar/AuthBar';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';

import UserBar from '../UserBar/UserBar';
import AuthModal from '../../Modals/AuthModal/AuthModal';
import LogOutModal from '../../Modals/LogOutModal/LogOutModal';

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState('signIn');
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  const location = useLocation();
  const variant = location.pathname === '/' ? 'dark' : 'light';
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const auth = true;

  const handleLoginClick = () => {
    setAuthModalView('signIn');
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthModalView('signUp');
    setIsAuthModalOpen(true);
  };

  const handleLogOutClick = () => {
    setIsLogOutModalOpen(true);
  };

  return (
    <>
      <header className={`${style.headerdiv} ${variant === 'dark' ? style.dark : style.light}`}>
        <Logo variant={variant === 'dark' ? 'light' : 'dark'} />
        <HeaderNav variant={variant === 'dark' ? 'light' : 'dark'} />

        {auth ? (
          <UserBar onLogOutClick={handleLogOutClick} />
        ) : (
          <AuthBar onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
        )}
      </header>
      <AuthModal
        isOpen={isAuthModalOpen}
        onRequestClose={() => setIsAuthModalOpen(false)}
        view={authModalView}
        setView={setAuthModalView}
      />
      <LogOutModal isOpen={isLogOutModalOpen} onRequestClose={() => setIsLogOutModalOpen(false)} />
    </>
  );
};

export default Header;
