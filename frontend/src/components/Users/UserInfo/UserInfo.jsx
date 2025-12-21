import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './UserInfo.module.css';
import { openModal } from '../../../redux/modal/modalSlice';
import Button from '../../common/button/Button';

const UserInfo = ({ user }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

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
          // Тут можна додати логіку підписки
          onClick={() => console.log('Follow clicked')}>
          FOLLOW
        </Button>
      )}
    </section>
  );
};

export default UserInfo;
