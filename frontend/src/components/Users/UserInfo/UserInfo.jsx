import styles from './UserInfo.module.css';
import { openModal } from '../../../redux/modal/modalSlice';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const UserInfo = ({ user }) => {
  console.log(user);

  const dispatch = useDispatch();
  const { id } = useParams();

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
