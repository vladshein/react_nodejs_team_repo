import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFollowers } from './../../../redux/users/actions';
import { selectFollowers } from './../../../redux/users/selectors';

import styles from './UserFollowers.module.css';
import UserList from '../UserList/UserList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchFollowers } from '../../../redux/users/actions';
import { selectFollowers } from '../../../redux/users/selectors';

const UserFollowers = () => {
  // Тимчасові дані (імітація відповіді сервера)
  // const followers = [
  //   { id: 1, name: 'Maria K.', avatar: '', isFollowed: false },
  //   { id: 2, name: 'John D.', avatar: '', isFollowed: true },
  //   { id: 3, name: 'Anna S.', avatar: '', isFollowed: false },
  //   { id: 4, name: 'Mike T.', avatar: '', isFollowed: true },
  // ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFollowers());
  }, [dispatch]);

  const followers = useSelector(selectFollowers);

  // Replace with actual data from Redux store
  return followers.length === 0 ? (
    <div>No followers found.</div>
  ) : (
    <div className={styles.listContainer}>
      {followers && followers.length > 0 ? (
        <ul className={styles.list}>
          {followers.map((follower) => (
            <UserList key={follower._id || follower.id} user={follower} />
          ))}
        </ul>
      ) : (
        <p className={styles.emptyText}>No followers yet.</p>
      )}
    </div>
  );
};

export default UserFollowers;

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import { useParams } from 'react-router-dom';
// import { fetchFollowers } from './../../../redux/users/actions';
// import { selectFollowers } from './../../../redux/users/selectors';

// import styles from './UserFollowers.module.css';
// import UserList from '../UserList/UserList';

// const UserFollowers = () => {
//   const dispatch = useDispatch();
//   // const { id } = useParams();
//   const followers = useSelector(selectFollowers);

//   console.log('const followers = useSelector(selectFollowers): ', followers);

//   useEffect(() => {
//     // if (id) {
//     //   console.log('Followers fetch is disabled for now');
//     // }
//     dispatch(fetchFollowers);
//   }, []);

//   return (
//     <div className={styles.listContainer}>
//       {followers && followers.length > 0 ? (
//         <ul className={styles.list}>
//           {followers.map((follower) => (
//             <li key={follower._id || follower.id} className={styles.item}>
//               <UserList user={follower} />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className={styles.emptyText}>No followers yet.</p>
//       )}
//     </div>
//   );
// };

// export default UserFollowers;
