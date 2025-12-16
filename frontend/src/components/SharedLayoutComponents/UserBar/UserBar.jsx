import { useState } from 'react';
import Avatar from '../Avatar/Avatar';
import style from './UserBar.module.css';
import IconChevronDown from '../../common/icons/IconChevronDown';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../redux/auth/selectors';

const UserBar = ({ onLogOutClick }) => {
  const user = useSelector(selectUserInfo);
  return (
    <div className={style.userBar}>
      {/* add condition if avatar is present set it otherwise default */}
      <Avatar src="/cat_avatar.png" alt="avatar" />
      {/* add correct name from user structure*/}
      <div className={style.nameSvgDiv}>
        <p className={style.userName}>{user?.name}</p>
        <IconChevronDown width={18} height={18} className="arrowDown" onClick={() => {}} />
        {/* <span className={style.username}>{user?.name}</span> */}
        <button className={style.togglebutton} onClick={onLogOutClick}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserBar;
