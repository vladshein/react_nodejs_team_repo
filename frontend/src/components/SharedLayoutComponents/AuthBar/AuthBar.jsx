import style from './AuthBar.module.css';
import React, { useState } from 'react';
import './AuthBar.module.css'; // Optional: move styles to a separate file

const AuthBar = ({ onLoginClick, onRegisterClick }) => {
  console.log('AuthBar');
  const [active, setActive] = useState('signup'); // default active

  return (
    <div className={style.toggleGroup}>
      <button
        className={`${style.togglebutton} ${active === 'signin' ? style.active : style.inactive}`}
        onClick={() => {
          setActive('signin');
          onLoginClick();
        }}>
        SIGN IN
      </button>
      <button
        className={`${style.togglebutton} ${active === 'signup' ? style.active : style.inactive}`}
        onClick={() => {
          setActive('signup');
          onRegisterClick();
        }}>
        SIGN UP
      </button>
    </div>
  );
};

export default AuthBar;
