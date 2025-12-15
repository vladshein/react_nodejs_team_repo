import styles from './UserFollowers.module.css';
import UserCard from '../UserCard/UserCard'; 

const UserFollowers = () => {
  // Тимчасові дані (імітація відповіді сервера)
  const followers = [
    { id: 1, name: "Maria K.", avatar: "", isFollowed: false },
    { id: 2, name: "John D.", avatar: "", isFollowed: true },
    { id: 3, name: "Anna S.", avatar: "", isFollowed: false },
    { id: 4, name: "Mike T.", avatar: "", isFollowed: true },
  ];

  return (
    <div className={styles.listContainer}>
      {followers.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserFollowers;