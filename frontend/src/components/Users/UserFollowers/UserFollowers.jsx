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
      {followers.map((user) => (
        <UserList key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserFollowers;
