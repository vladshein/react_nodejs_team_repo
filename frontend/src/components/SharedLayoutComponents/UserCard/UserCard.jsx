import React from 'react';
import { useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../redux/users/actions';
// import styles from "./UserCard.module.css"

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleToggleFollow = () => {
    if (user.isFollowed) {
      dispatch(unfollowUser(user.id));
    } else {
      dispatch(followUser(user.id));
    }
  };

  return (
    <div className="user-card">
      <img src={user.avatar || '/default-avatar.png'} alt={user.name} />
      
      <div className="info">
        <h4>{user.name}</h4>
        {/* Додаткова інфа, якщо є в дизайні */}
        <span>User stats...</span> 
      </div>

      <button onClick={handleToggleFollow} className={user.isFollowed ? 'active' : ''}>
        {user.isFollowed ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};

export default UserCard;