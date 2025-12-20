import { useDispatch, useSelector } from 'react-redux';
import styles from './UserInfo.module.css';
import {
  selectCurrentUser,
  selectSelectedUser,
  selectUserIsLoading,
} from '../../../redux/users/selectors';
import { openModal } from '../../../redux/modal/modalSlice';

const UserInfo = ({ id }) => {
  // 1. Додаємо favorites у Mock Data
  // const user = {
  //   id: 1,
  //   name: 'Harry Potter',
  //   avatar: 'https://i.pravatar.cc/300?img=68',
  //   email: 'victoria28682@gmai.com',
  //   stats: {
  //     recipes: 24,
  //     favorites: 42,
  //     followers: 1200,
  //     following: 15,
  //   },
  // };
  const dispatch = useDispatch();
  const select = id === 'current' ? selectCurrentUser : selectSelectedUser;
  const user = useSelector(select);
  const isLoading = useSelector(selectUserIsLoading);
  console.log(user);

  return isLoading || !user ? (
    <div>Loading user info...</div>
  ) : (
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
          <span className={styles.statValue}>{user.count_user_recipes}</span>
          <span className={styles.statLabel}>Recipes</span>
        </div>

        {/* --- Favorites */}
        {id === 'current' && (
          <div className={styles.statItem}>
            <span className={styles.statValue}>{user.count_favorite_recipes}</span>
            <span className={styles.statLabel}>Favorites</span>
          </div>
        )}

        {/* Followers */}
        <div className={styles.statItem}>
          <span className={styles.statValue}>{user.count_followers}</span>
          <span className={styles.statLabel}>Followers</span>
        </div>

        {/* Following */}
        {id === 'current' && (
          <div className={styles.statItem}>
            <span className={styles.statValue}>{user.count_following}</span>
            <span className={styles.statLabel}>Following</span>
          </div>
        )}
      </div>

      {id === 'current' ? (
        <button
          className={styles.editBtn}
          onClick={() => dispatch(openModal({ modalType: 'logout' }))}>
          LOG OUT
        </button>
      ) : (
        <button className={styles.editBtn}>FOLLOW</button>
      )}
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
