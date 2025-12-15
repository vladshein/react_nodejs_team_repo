import styles from "./UserCard.module.css";

const UserCard = ({ user }) => {
  // Тимчасова функція-заглушка
  const handleToggleFollow = () => {
    console.log(`Click follow/unfollow on user: ${user.name}`);
  };

  return (
    <div className={styles.card}>
      <img 
        src={user.avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} 
        alt={user.name} 
        className={styles.avatar} 
      />
      
      <div className={styles.info}>
        <h4 className={styles.name}>{user.name}</h4>
        <span className={styles.subtext}>Foodie member</span> 
      </div>

      <button 
        onClick={handleToggleFollow} 
        className={`${styles.btn} ${user.isFollowed ? styles.following : ''}`}
      >
        {user.isFollowed ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};

export default UserCard;