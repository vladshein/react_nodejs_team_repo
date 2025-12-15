<<<<<<< HEAD
import style from './UserBar.module.css';

const UserBar = ({ onLogOutClick }) => {
  return (
    <div className={style.formContainer}>
      <h3 className={style.togglebutton}>User Bar</h3>
      <button className={style.togglebutton} onClick={onLogOutClick}>
        Log out
      </button>
=======
import Avatar from '../Avatar/Avatar';
import style from './UserBar.module.css';

// get the signin variable and location
// if location is / - show both "avatar + name + arrow"

// const isLoggedIn = useSelector(selectIsLoggedIn);

const UserBar = () => {
  return (
    <div className={style.userbar}>
      <Avatar src="/cat_avatar.png" alt="avatar" />
>>>>>>> main
    </div>
  );
};

export default UserBar;
