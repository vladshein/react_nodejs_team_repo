import { useSelector } from 'react-redux';
import {
  selectFollowers,
  selectSelectedUserFollowers,
  selectUserIsLoading,
} from './../../../redux/users/selectors';
import styles from './UserFollowers.module.css';
import UserList from '../UserList/UserList';
import { useParams } from 'react-router-dom';

const UserFollowers = () => {
  const { id } = useParams();
  const select = id === 'current' ? selectFollowers : selectSelectedUserFollowers;
  const followers = useSelector(select);
  const isLoading = useSelector(selectUserIsLoading);
  // console.log('id', id, 'followers', followers);

  return isLoading ? (
    <div>Loading...</div>
  ) : followers.length === 0 ? (
    <div>No followers found.</div>
  ) : (
    <div className={styles.listContainer}>
      {followers && followers.length > 0 ? (
        <ul className={styles.list}>
          {followers.map((follower) => (
            <UserList key={follower.id} user={follower} />
          ))}
        </ul>
      ) : (
        <p className={styles.emptyText}>No followers yet.</p>
      )}
    </div>
  );
};

export default UserFollowers;
