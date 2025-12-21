import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserInfo.module.css';
import { openModal } from '../../../redux/modal/modalSlice';
import Button from '../../common/button/Button';
import IconPlus from '../../common/icons/IconPlus';
import { followUser, unfollowUser, updateAvatar } from '../../../redux/users/actions';
import { selectIsFollowing } from '../../../redux/users/selectors';

const API_URL = import.meta.env.VITE_API_URL;
const SERVER_URL = API_URL.replace('/api', '');

const UserInfo = ({ user }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isCurrentUser = id === 'current';
  const isFollowing = useSelector(selectIsFollowing(user.id));

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    console.log('Upload modal');
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large. Max 5MB.');
        return;
      }

      dispatch(updateAvatar(file));
    }
  };

  const handleFollow = () => {
    dispatch(followUser(user.id));
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(user.id));
  };

  let avatarUrl = user.avatar || 'https://www.gravatar.com/avatar/?d=mp';

  if (user.avatar && !user.avatar.startsWith('http')) {
    avatarUrl = `${SERVER_URL}/${user.avatar}`;
  }

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.avatarWrapper}>
          <img src={avatarUrl} alt={user.name} className={styles.avatar} />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />

          {isCurrentUser && (
            <button
              className={styles.uploadBtn}
              type="button"
              onClick={handleUploadClick}
              aria-label="Upload avatar">
              <IconPlus width={20} height={20} className={styles.iconPlus} />
            </button>
          )}
        </div>

        <h3 className={styles.name}>{user.name}</h3>

        <div className={styles.statsCard}>
          <p className={styles.statItem}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{user.email}</span>
          </p>

          <div className={styles.statItem}>
            <span className={styles.statLabel}>Recipes</span>
            <span className={styles.statValue}>{user.count_user_recipes}</span>
          </div>

          {id === 'current' && (
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Favorites</span>
              <span className={styles.statValue}>{user.count_favorite_recipes}</span>
            </div>
          )}

          <div className={styles.statItem}>
            <span className={styles.statLabel}>Followers</span>
            <span className={styles.statValue}>{user.count_followers}</span>
          </div>

          {id === 'current' && (
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Following</span>
              <span className={styles.statValue}>{user.count_following}</span>
            </div>
          )}
        </div>
      </div>

      {id === 'current' ? (
        <Button
          type="button"
          variant="filled" // Чорна кнопка
          className={styles.actionBtn} // Додатковий клас для розмірів
          onClick={() => dispatch(openModal({ modalType: 'logout' }))}>
          LOG OUT
        </Button>
      ) : (
        <Button
          type="button"
          variant="filled"
          className={styles.actionBtn}
          // Тут можна додати логіку підпискиq
          onClick={isFollowing ? handleUnfollow : handleFollow}>
          {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
        </Button>
      )}
    </section>
  );
};

export default UserInfo;
