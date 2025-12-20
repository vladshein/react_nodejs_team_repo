import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { fetchFollowing } from './../../../redux/users/actions';
import { selectFollowing } from './../../../redux/users/selectors';

// import styles from './UserFollowers.module.css';
import UserList from '../UserList/UserList';

const UserFollowing = () => {
  const dispatch = useDispatch();
  // const { id } = useParams();
  const following = useSelector(selectFollowing);

  console.log('const following = useSelector(selectFollowing): ', following);

  useEffect(() => {
    // if (id) {
    //   console.log('Followers fetch is disabled for now');
    // }
    dispatch(fetchFollowing);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {following.map((user) => (
        <UserList key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserFollowing;
