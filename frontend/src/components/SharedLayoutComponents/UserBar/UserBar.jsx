import { useState } from 'react';
import Avatar from '../Avatar/Avatar';
import style from './UserBar.module.css';
import IconChevronDown from '../../common/icons/IconChevronDown';
import IconChevronUp from '../../common/icons/IconChevronUp';
import IconArrowUpRight from '../../common/icons/IconArrowUpRight';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../redux/auth/selectors';
import { Link } from 'react-router-dom';
import noimage from './../../../images/no-image.png';

const UserBar = ({ onLogOutClick }) => {
  const [open, setOpen] = useState(false);
  const user = useSelector(selectUserInfo);
  const API_URL = import.meta.env.VITE_API_URL;
  const SERVER_URL = API_URL.replace('/api', '');

  let avatarUrl = noimage;

  // if (user) {
  // avatarUrl = user.avatar;
  // const defaultAvatar = '/cat_avatar.png';

  // let avatarUrl = defaultAvatar;

  if (user?.avatar) {
    if (user.avatar.startsWith('http')) {
      avatarUrl = user.avatar;
    } else {
      const normalizedPath = user.avatar.startsWith('/') ? user.avatar : `/${user.avatar}`;
      avatarUrl = `${SERVER_URL}${normalizedPath}`;
    }
  }

  // if (user.avatar && !user.avatar.startsWith('http')) {
  //   avatarUrl = `${SERVER_URL}${user.avatar}`;
  // }

  return (
    <div className={style.userBar}>
      <div className={style.userBarTop}>
        {/* avatar fallback */}
        <Avatar src={avatarUrl} alt="avatar" />

        <div className={style.nameSvgDiv}>
          <p className={style.userName}>{user?.name || 'Guest'}</p>

          {/* toggle chevron */}
          <div onClick={() => setOpen(!open)}>
            {open ? (
              <IconChevronUp width={18} height={18} className={style.arrow} />
            ) : (
              <IconChevronDown width={18} height={18} className={style.arrow} />
            )}
          </div>
        </div>
      </div>

      {/* dropdown box */}
      {open && (
        <div className={style.userBarBottom}>
          <Link to={`/user/current`} className={style.profile} onClick={() => setOpen(false)}>
            {/* <Link to={`/user/${user?.id}`} className={style.profile}> */}
            PROFILE
          </Link>
          <div className={style.logoutArrow}>
            <span className={style.profile} onClick={onLogOutClick}>
              Log out
            </span>
            <IconArrowUpRight
              className={style.arrow2}
              stroke="#FFFFFF"
              width={18}
              height={18}
              onClick={onLogOutClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBar;
