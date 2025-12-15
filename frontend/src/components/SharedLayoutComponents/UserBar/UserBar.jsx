import Avatar from '../Avatar/Avatar';
import style from './UserBar.module.css';

// get the signin variable and location
// if location is / - show both "avatar + name + arrow"

// const isLoggedIn = useSelector(selectIsLoggedIn);

const UserBar = () => {
  return (
    <div className={style.userbar}>
      <Avatar src="/cat_avatar.png" alt="avatar" />
    </div>
  );
};

export default UserBar;
