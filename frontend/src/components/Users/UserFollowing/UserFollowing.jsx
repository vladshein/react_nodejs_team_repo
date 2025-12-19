import { useEffect } from 'react';
import UserList from '../UserList/UserList';
import { fetchFollowing } from '../../../redux/users/actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectFollowing } from '../../../redux/users/selectors';

const UserFollowing = () => {
  // const following = [
  //   { id: 10, name: 'Gordon Ramsay', avatar: '', isFollowed: true },
  //   { id: 11, name: 'Jamie Oliver', avatar: '', isFollowed: true },
  // ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFollowing());
  }, [dispatch]);

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
