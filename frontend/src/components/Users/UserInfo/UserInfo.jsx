import styles from './UserInfo.module.css';

const UserInfo = () => {
  // 1. Додаємо favorites у Mock Data
  const user = {
    id: 1,
    name: 'Harry Potter',
    avatar: 'https://i.pravatar.cc/300?img=68',
    email: 'victoria28682@gmai.com',
    stats: {
      recipes: 24,
      favorites: 42,
      followers: 1200,
      following: 15,
    },
  };

  return (
    <section className={styles.container}>
      <div className={styles.avatarWrapper}>
        <img src={user.avatar} alt={user.name} className={styles.avatar} />
      </div>

      <h3 className={styles.name}>{user.name}</h3>
      <p className={styles.bio}>{user.email}</p>

      <div className={styles.statsRow}>
        {/* Recipes */}
        <div className={styles.statItem}>
          <span className={styles.statValue}>{user.stats.recipes}</span>
          <span className={styles.statLabel}>Recipes</span>
        </div>

        {/* --- Favorites */}
        <div className={styles.statItem}>
          <span className={styles.statValue}>{user.stats.favorites}</span>
          <span className={styles.statLabel}>Favorites</span>
        </div>

        {/* Followers */}
        <div className={styles.statItem}>
          <span className={styles.statValue}>{user.stats.followers}</span>
          <span className={styles.statLabel}>Followers</span>
        </div>

        {/* Following */}
        <div className={styles.statItem}>
          <span className={styles.statValue}>{user.stats.following}</span>
          <span className={styles.statLabel}>Following</span>
        </div>
      </div>

      <button className={styles.editBtn}>Edit Profile</button>
    </section>
  );
};

export default UserInfo;
