import { useNavigate } from 'react-router-dom';
import IconArrowUpRight from '../../common/icons/IconArrowUpRight';
import Button from '../../common/button/Button';
import styles from './UserList.module.css';

const UserList = ({ user }) => {
  const navigate = useNavigate();
  const { avatar, name, recipesCount, isFollowing, id, recipes = [] } = user;

  const defaultAvatar = '/cat_avatar.png';

  const handleGoToProfile = () => {
    navigate(`/user/${id}`);
  };

  return (
    <li className={styles.card}>
      <div
        className={styles.avatarWrapper}
        onClick={handleGoToProfile}
        style={{ cursor: 'pointer' }}>
        <img
          src={avatar || defaultAvatar}
          alt={name}
          className={styles.avatar}
          width="60"
          height="60"
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name} onClick={handleGoToProfile} style={{ cursor: 'pointer' }}>
            {name}
          </h3>
          <p className={styles.recipesInfo}>Own recipes: {recipesCount}</p>

          <Button
            type="button"
            variant={isFollowing ? 'outlined' : 'filled'}
            className={styles.actionBtn}
            onClick={(e) => {
              e.stopPropagation();
              console.log('Toggle follow logic');
            }}>
            {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
          </Button>
        </div>

        {recipes.length > 0 && (
          <ul className={styles.recipePreviews}>
            {recipes.slice(0, 3).map((recipe) => (
              <li key={recipe.id || recipe._id} className={styles.recipeItem}>
                <img
                  src={recipe.image || recipe.thumb || recipe.preview}
                  alt={recipe.title}
                  className={styles.recipeImage}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        )}

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={handleGoToProfile}
            aria-label="Go to profile">
            <IconArrowUpRight className={styles.iconArrow} width={18} height={18} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default UserList;

// import IconArrowUpRight from '../../common/icons/IconArrowUpRight';
// import Button from '../../common/button/Button';
// import styles from './UserList.module.css';

// const UserList = ({ user }) => {
//   // const { avatar, name, recipesCount, isFollowing, id, recipes = [] } = user;  // повернути після підключення комп
//   const { avatar, name, recipesCount, isFollowing, id } = user;

//   const recipes = [
//     {
//       id: 1,
//       title: 'Spaghetti Carbonara',
//       time: '40 min',
//       image:
//         'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=300&q=80',
//     },
//     {
//       id: 2,
//       title: 'Avocado Toast',
//       time: '15 min',
//       image:
//         'https://images.unsplash.com/photo-1588137372308-15f75323ca8d?auto=format&fit=crop&w=300&q=80',
//     },
//     {
//       id: 3,
//       title: 'Berry Smoothie',
//       time: '10 min',
//       image:
//         'https://images.unsplash.com/photo-1553530666-ba11a90696f9?auto=format&fit=crop&w=300&q=80',
//     },
//     {
//       id: 4,
//       title: 'Chicken Curry',
//       time: '60 min',
//       image:
//         'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=300&q=80',
//     },
//   ];

//   const defaultAvatar = '/cat_avatar.png';

//   return (
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

//           <Button
//             type="button"
//             variant={isFollowing ? 'outlined' : 'filled'}
//             className={styles.actionBtn}
//             onClick={() => console.log('Toggle follow logic')}>
//             {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
//           </Button>
//         </div>

//         <ul className={styles.recipePreviews}>
//           {recipes.slice(0, 3).map((recipe) => (
//             <li key={recipe.id} className={styles.recipeItem}>
//               <img
//                 src={recipe.image}
//                 alt={recipe.title}
//                 className={styles.recipeImage}
//                 loading="lazy"
//               />
//             </li>
//           ))}
//         </ul>

//         <div className={styles.content}>
//           <a
//             href={`/user/${id}`}
//             className={styles.arrowLink}
//             aria-label={`Go to ${name}'s profile`}>
//             <IconArrowUpRight className={styles.iconArrow} width={18} height={18} />
//           </a>
//         </div>
//       </div>
//     </li>
//   );
// };

// export default UserList;
