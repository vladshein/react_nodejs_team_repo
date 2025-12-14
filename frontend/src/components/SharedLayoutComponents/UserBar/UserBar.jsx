import style from './UserBar.module.css';

const UserBar = ({ onLogOutClick }) => {
  return (
    <div className={style.formContainer}>
      <h3 className={style.togglebutton}>User Bar</h3>
      <button className={style.togglebutton} onClick={onLogOutClick}>
        Log out
      </button>
    </div>
  );
};

export default UserBar;
