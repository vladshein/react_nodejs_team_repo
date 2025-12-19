import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../redux/auth/selectors';
import { selectedUser } from '../../../redux/users/selectors';
import styles from './UserInfo.module.css';

const UserInfo = () => {
  const myAuthData = useSelector(selectUserInfo);
  const user = useSelector(selectedUser);

  // 3. Захист від null
  if (!user) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  // 4. Логіка: Це мій профіль?
  const isMyProfile = myAuthData?.id === user.id;

  return (
    <section className={styles.container}>
      <div className={styles.avatarWrapper}>
        <img
          // Додав безпечний фолбек, якщо аватарки немає
          src={user.avatar || 'https://www.gravatar.com/avatar/?d=mp'}
          alt={user.name}
          className={styles.avatar}
        />
      </div>

      <h3 className={styles.name}>{user.name}</h3>
      <p className={styles.bio}>{user.email}</p>

      {/* 🔥 ВИПРАВЛЕННЯ ТУТ: Прибрали .stats, беремо дані напряму */}
      <div className={styles.statsRow}>
        {/* Recipes */}
        <div className={styles.statItem}>
          {/* Бекенд надсилає recipesCount */}
          <span className={styles.statValue}>{user.recipesCount || 0}</span>
          <span className={styles.statLabel}>Recipes</span>
        </div>

        {/* Favorites */}
        <div className={styles.statItem}>
          {/* Якщо бекенд ще не надсилає це поле, покажемо 0, щоб не впало */}
          <span className={styles.statValue}>{user.favoritesCount || 0}</span>
          <span className={styles.statLabel}>Favorites</span>
        </div>

        {/* Followers */}
        <div className={styles.statItem}>
          {/* Бекенд надсилає followersCount */}
          <span className={styles.statValue}>{user.followersCount || 0}</span>
          <span className={styles.statLabel}>Followers</span>
        </div>

        {/* Following */}
        <div className={styles.statItem}>
          {/* Якщо бекенд ще не надсилає це поле, покажемо 0 */}
          <span className={styles.statValue}>{user.followingCount || 0}</span>
          <span className={styles.statLabel}>Following</span>
        </div>
      </div>

      {/* Кнопка змінюється залежно від того, чий це профіль */}
      {isMyProfile ? (
        <button className={styles.editBtn}>Edit Profile</button>
      ) : (
        <button className={styles.editBtn}>Follow</button>
        // Тут краще використати твій компонент <Button> пізніше
      )}
    </section>
  );
};

export default UserInfo;
