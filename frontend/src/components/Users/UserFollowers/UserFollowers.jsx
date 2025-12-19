import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { fetchFollowers } from './../../../redux/users/actions';
import { selectFollowers } from './../../../redux/users/selectors';

import styles from './UserFollowers.module.css';
import UserList from '../UserList/UserList';

const UserFollowers = () => {
  const dispatch = useDispatch();
  // const { id } = useParams();
  const followers = useSelector(selectFollowers);

  console.log('const followers = useSelector(selectFollowers): ', followers);

  useEffect(() => {
    // if (id) {
    //   console.log('Followers fetch is disabled for now');
    // }
    dispatch(fetchFollowers);
  }, []);

  return (
    <div className={styles.listContainer}>
      {followers && followers.length > 0 ? (
        <ul className={styles.list}>
          {followers.map((follower) => (
            <li key={follower._id || follower.id} className={styles.item}>
              <UserList user={follower} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyText}>No followers yet.</p>
      )}
    </div>
  );
};

export default UserFollowers;
