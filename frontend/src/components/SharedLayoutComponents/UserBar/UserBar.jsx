import { useState } from 'react';
import Avatar from '../Avatar/Avatar';
import style from './UserBar.module.css';
import IconChevronDown from '../../common/icons/IconChevronDown';
import IconChevronUp from '../../common/icons/IconChevronUp';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../redux/auth/selectors';
import { Link } from 'react-router-dom';

const navigateToProfile = () => {};
const auth = true;

const UserBar = ({ onLogOutClick }) => {
  const [open, setOpen] = useState(false);
  const user = useSelector(selectUserInfo);
  console.log(user);

  return (
    <div className={style.userBar}>
      <div className={style.userBarTop}>
        {/* avatar fallback */}
        <Avatar src={user?.avatar || '/cat_avatar.png'} alt="avatar" />

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
          <Link to={`/user`} className={style.profile}>
            {/* <Link to={`/user/${user?.id}`} className={style.profile}> */}
            PROFILE
          </Link>
          <div>
            <span className={style.profile} onClick={onLogOutClick}>
              Log out
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBar;
