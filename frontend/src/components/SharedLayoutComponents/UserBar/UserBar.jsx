import style from './UserBar.module.css';
import Avatar from '../Avatar/Avatar';

const UserBar = ({ onLogOutClick }) => {
  return (
    // get the signin variable and location
    // if location is / - show both "avatar + name + arrow"

    <div className={style.userbar}>
      <Avatar src="/cat_avatar.png" alt="avatar" />
      <button className={style.togglebutton} onClick={onLogOutClick}>
        Log out
      </button>
    </div>
  );
};

export default UserBar;
