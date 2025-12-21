import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserInfo.module.css';
import { openModal } from '../../../redux/modal/modalSlice';
import { selectIsFollowing } from '../../../redux/users/selectors';
import { followUser, unfollowUser } from '../../../redux/users/actions';

const UserInfo = ({ user }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const isFollowing = useSelector(selectIsFollowing(id));

  const handleFollow = (userId) => {
    dispatch(followUser(userId)).unwrap();
  };

  const handleUnfollow = (userId) => {
    dispatch(unfollowUser(userId)).unwrap();
  };

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.avatarWrapper}>
          <img
            src={user.avatar || 'https://www.gravatar.com/avatar/?d=mp'}
            alt={user.name}
            className={styles.avatar}
          />
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
        <button
          className={styles.editBtn}
          onClick={() => dispatch(openModal({ modalType: 'logout' }))}>
          LOG OUT
        </button>
      ) : (
        <button
          className={styles.editBtn}
          onClick={(e) => {
            e.stopPropagation();
            if (isFollowing) {
              handleUnfollow(id);
            } else {
              handleFollow(id);
            }
          }}>
          {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
        </button>
      )}
    </section>
  );
};

export default UserInfo;
