import styles from './UserInfo.module.css';

const UserInfo = () => {
  // ТИМЧАСОВІ ДАНІ (Mock Data)
  // Коли підключимо Redux, тут буде: const user = useSelector(selectSelectedUser);
  const user = {
    id: 1,
    name: "Harry Potter",
    avatar: "https://i.pravatar.cc/300?img=68", // Випадкова картинка
    bio: "Cooking is my passion! Creating magic in the kitchen every day.",
    stats: {
      recipes: 24,
      followers: 1200,
      following: 15
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatarWrapper}>
        <img 
          src={user.avatar} 
          alt={user.name} 
          className={styles.avatar} 
        />
      </div>

      <h3 className={styles.name}>{user.name}</h3>
      <p className={styles.role}>Master Chef</p> 

      <p className={styles.bio}>{user.bio}</p>

      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{user.stats.recipes}</span>
          <span className={styles.statLabel}>Recipes</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{user.stats.followers}</span>
          <span className={styles.statLabel}>Followers</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{user.stats.following}</span>
          <span className={styles.statLabel}>Following</span>
        </div>
      </div>

      <button className={styles.editBtn}>
        Edit Profile
      </button>
    </div>
  );
};

export default UserInfo;