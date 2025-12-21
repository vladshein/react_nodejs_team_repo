import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFollowing } from '../../../redux/users/actions';
import { selectFollowing } from '../../../redux/users/selectors';
import UserList from '../UserList/UserList';
import { useParams } from 'react-router-dom';

const UserFollowing = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFollowing(id)).unwrap();
  }, [dispatch, id]);

  const following = useSelector(selectFollowing);
  console.log(following);

  return following.length === 0 ? (
    <div>No following users found.</div>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {following.map((user) => (
        <UserList key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserFollowing;
