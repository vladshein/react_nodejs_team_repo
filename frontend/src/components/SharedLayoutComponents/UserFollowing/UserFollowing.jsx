import UserCard from '../UserCard/UserCard'; 

const UserFollowing = () => {
  const following = [
    { id: 10, name: "Gordon Ramsay", avatar: "", isFollowed: true },
    { id: 11, name: "Jamie Oliver", avatar: "", isFollowed: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {following.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserFollowing;