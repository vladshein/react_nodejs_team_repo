import React from 'react';
import { useSelector } from 'react-redux';
import { selectFollowers } from '../redux/usersSlice';
import UserInfo from '../components/Shared/UserInfo';
import UserCard from '../components/Shared/UserCard';

const ProfileFollowersPage = () => {
  const followers = useSelector(selectFollowers);

  return (
    <div className="page-container" style={{ display: 'flex', gap: '20px' }}>

      <aside style={{ width: '300px' }}>
        <UserInfo />
      </aside>

      <main style={{ flex: 1 }}>
        <h1>My Followers</h1>
        <div className="followers-list">
          {followers.map((follower) => (
            <UserCard key={follower.id} user={follower} />
          ))}
        </div>
      </main>

    </div>
  );
};

export default ProfileFollowersPage;