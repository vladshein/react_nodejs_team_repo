import style from './UserBar.module.css';
import Avatar from '../Avatar/Avatar';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../redux/auth/selectors';

const UserBar = ({ onLogOutClick }) => {
  const user = useSelector(selectUserInfo);

  return (
    // get the signin variable and location
    // if location is / - show both "avatar + name + arrow"
    <div className={style.userbar}>
      {<Avatar src={user?.avatar} alt="avatar" />}
      <span className={style.username}>{user?.name}</span>
      <button className={style.togglebutton} onClick={onLogOutClick}>
        Log out
      </button>
    </div>
  );
};

export default UserBar;
