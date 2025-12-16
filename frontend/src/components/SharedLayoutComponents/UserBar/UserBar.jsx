import { useState } from 'react';
import Avatar from '../Avatar/Avatar';
import style from './UserBar.module.css';
import IconChevronDown from '../../common/icons/IconChevronDown';
useState;

// get the signin variable and location
// if location is / - show both "avatar + name + arrow"

const UserBar = () => {
  return (
    <div className={style.userBar}>
      {/* add condition if avatar is present set it otherwise default */}
      <Avatar src="/cat_avatar.png" alt="avatar" />
      {/* add correct name from user structure*/}
      <div className={style.nameSvgDiv}>
        <p className={style.userName}>klsdfsdfsdf</p>
        <IconChevronDown width={18} height={18} className="arrowDown" onClick={() => {}} />
      </div>
    </div>
  );
};

export default UserBar;
