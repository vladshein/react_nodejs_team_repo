import styles from './UserCard.module.css';

const UserCard = ({ user }) => {
  const { avatar, name, recipesCount, isFollowing, id } = user;

  const defaultAvatar = '/cat_avatar.png';

  return (
    <li className={styles.card}>
      <div className={styles.avatarWrapper}>
        <img
          src={avatar || defaultAvatar}
          alt={name}
          className={styles.avatar}
          width="60"
          height="60"
          loading="lazy"
        />
      </div>

      <div className={styles.inner}>
        {' '}
        {/* card__inner */}
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.recipesInfo}>Own recipes: {recipesCount}</p>

          <button
            className={isFollowing ? styles.unfollowBtn : styles.followBtn}
            type="button"
            aria-label={isFollowing ? `Unfollow ${name}` : `Follow ${name}`}>
            {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
          </button>
        </div>
        <div className={styles.actions}>
          <a
            href={`/user/${id}`}
            className={styles.arrowLink}
            aria-label={`Go to ${name}'s profile`}>
            <svg className={styles.iconArrow} width="18" height="18">
              <use href="/icons.svg#icon-arrow-up-right" />
            </svg>
          </a>
        </div>
      </div>
    </li>
  );
};

export default UserCard;

//     <li className={styles.card}>
//       <div className={styles.avatarWrapper}>
//         <img
//           src={avatar || defaultAvatar}
//           alt={name}
//           className={styles.avatar}
//           width="60"
//           height="60"
//           loading="lazy"
//         />
//       </div>

//       <div className={styles.content}>
//         <div className={styles.header}>
//           <h3 className={styles.name}>{name}</h3>
//           <p className={styles.recipesInfo}>Own recipes: {recipesCount}</p>

//           <button
//             className={isFollowing ? styles.unfollowBtn : styles.followBtn}
//             type="button"
//             aria-label={isFollowing ? `Unfollow ${name}` : `fOLLOW ${name}`}>
//             {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
//           </button>
//         </div>

//         <div className={styles.content}>
//           <a
//             href={`/user/${id}`}
//             className={styles.arrowLink}
//             aria-label={`Go to ${name}'s profile`}>
//             <svg className={styles.iconArrow} width="18" height="18">
//               <use href="/icons.svg#icon-arrow-up-right" />
//             </svg>
//           </a>
//         </div>
//       </div>
//     </li>
//   );
// };

// export default UserCard;
