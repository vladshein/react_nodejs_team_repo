import style from './AuthBar.module.css';

const AuthBar = () => {
  return (
    <div>
      <button className={style.signin}>SIGN IN</button>
      <button className={style.signup}>SIGN UP</button>
    </div>
  );
};

export default AuthBar;
