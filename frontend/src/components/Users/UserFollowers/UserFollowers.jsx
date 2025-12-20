import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFollowers } from './../../../redux/users/actions';
import { selectFollowers } from './../../../redux/users/selectors';
import styles from './UserFollowers.module.css';
import UserList from '../UserList/UserList';
import { useParams } from 'react-router-dom';

const UserFollowers = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFollowers(id)).unwrap();
  }, [dispatch, id]);

  const followers = useSelector(selectFollowers);

  return followers.length === 0 ? (
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
