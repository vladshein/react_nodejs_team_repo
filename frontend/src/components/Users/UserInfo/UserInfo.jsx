import { useSelector } from 'react-redux';
// import { selectUserInfo } from '../../../redux/auth/selectors';
import { selectedUser } from '../../../redux/users/selectors';
import styles from './UserInfo.module.css';

const UserInfo = () => {
  const user = useSelector(selectedUser);

  // const myAuthData = useSelector(selectUserInfo);

  // 2. Захист від null (поки дані вантажаться)
  if (!user) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  // const isMyProfile = myAuthData?.id === user.id;
  // const isMyProfile = true;

  return (
    <section className={styles.container}>
      <div className={styles.avatarWrapper}>
        <img
          // Фолбек на дефолтну аватарку
          src={user.avatar || 'https://www.gravatar.com/avatar/?d=mp'}
          alt={user.name}
          className={styles.avatar}
        />
      </div>

      <h3 className={styles.name}>{user.name}</h3>
      <p className={styles.bio}>{user.email}</p>

      {/* Статистика (Плоска структура з бекенду) */}
      <div className={styles.statsRow}>
        {/* Recipes */}
        <div className={styles.statItem}>
          <span className={styles.statValue}>{user.recipesCount || 0}</span>
          <span className={styles.statLabel}>Recipes</span>
        </div>

        {/* Favorites */}
        <div className={styles.statItem}>
          <span className={styles.statValue}>{user.favoritesCount || 0}</span>
          <span className={styles.statLabel}>Favorites</span>
        </div>

        {/* Followers */}
        <div className={styles.statItem}>
          <span className={styles.statValue}>{user.followersCount || 0}</span>
          <span className={styles.statLabel}>Followers</span>
        </div>

        {/* Following */}
        <div className={styles.statItem}>
          <span className={styles.statValue}>{user.followingCount || 0}</span>
          <span className={styles.statLabel}>Following</span>
        </div>
      </div>

      {/* 👇 Кнопки дій */}

      {/* ВАРІАНТ 1: Тільки для поточного юзера (Активний зараз) */}
      <button className={styles.editBtn}>Edit Profile</button>

      {/* ВАРІАНТ 2: Універсальний (Закоментований на майбутнє) */}
      {/* {isMyProfile ? (
        <button className={styles.editBtn}>Edit Profile</button>
      ) : (
        <button className={styles.editBtn}>Follow</button>
      )} 
      */}
    </section>
  );
};

export default UserInfo;

// import { useSelector } from 'react-redux';
// import { selectUserInfo } from '../../../redux/auth/selectors';
// import { selectedUser } from '../../../redux/users/selectors';
// import styles from './UserInfo.module.css';

// const UserInfo = () => {
//   const myAuthData = useSelector(selectUserInfo);
//   const user = useSelector(selectedUser);

//   if (!user) {
//     return <div className={styles.loading}>Loading profile...</div>;
//   }

//   const isMyProfile = myAuthData?.id === user.id;

//   return (
//     <section className={styles.container}>
//       <div className={styles.avatarWrapper}>
//         <img
//           src={user.avatar || 'https://www.gravatar.com/avatar/?d=mp'}
//           alt={user.name}
//           className={styles.avatar}
//         />
//       </div>

//       <h3 className={styles.name}>{user.name}</h3>
//       <p className={styles.bio}>{user.email}</p>

//       <div className={styles.statsRow}>
//         {/* Recipes */}
//         <div className={styles.statItem}>
//           <span className={styles.statValue}>{user.recipesCount || 0}</span>
//           <span className={styles.statLabel}>Recipes</span>
//         </div>

//         {/* Favorites */}
//         <div className={styles.statItem}>
//           <span className={styles.statValue}>{user.favoritesCount || 0}</span>
//           <span className={styles.statLabel}>Favorites</span>
//         </div>

//         {/* Followers */}
//         <div className={styles.statItem}>
//           <span className={styles.statValue}>{user.followersCount || 0}</span>
//           <span className={styles.statLabel}>Followers</span>
//         </div>

//         {/* Following */}
//         <div className={styles.statItem}>
//           <span className={styles.statValue}>{user.followingCount || 0}</span>
//           <span className={styles.statLabel}>Following</span>
//         </div>
//       </div>

//       {isMyProfile ? (
//         <button className={styles.editBtn}>Edit Profile</button>
//       ) : (
//         <button className={styles.editBtn}>Follow</button>
//       )}
//     </section>
//   );
// };

// export default UserInfo;
