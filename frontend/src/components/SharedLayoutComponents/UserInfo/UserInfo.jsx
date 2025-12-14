import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../redux/usersSlice';
import styles from './UserInfo.module.css';

const UserInfo = () => {
  const profile = useSelector(selectUserProfile);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.avatarWrapper}>
        <img src={profile.avatar} alt={profile.name} className={styles.bigAvatar} />
      </div>

      <h2 className={styles.name}>{profile.name}</h2>
      <p className={styles.bio}>{profile.bio}</p>

      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <strong>{profile.stats.recipes}</strong>
          <span>Recipes</span>
        </div>
        <div className={styles.statItem}>
          <strong>{profile.stats.followers}</strong>
          <span>Followers</span>
        </div>
        <div className={styles.statItem}>
          <strong>{profile.stats.favorites}</strong>
          <span>Favorites</span>
        </div>
      </div>

      <button className={styles.editBtn}>Edit Profile</button>
    </div>
  );
};

export default UserInfo;