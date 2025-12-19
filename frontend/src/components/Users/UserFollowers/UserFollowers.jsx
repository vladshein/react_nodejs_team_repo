import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // 1. Імпортуємо хук
import { fetchFollowers } from './../../../redux/users/actions';
import { selectFollowers } from './../../../redux/users/selectors';

import styles from './UserFollowers.module.css';
import UserList from '../UserList/UserList';

const UserFollowers = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // 2. Дістаємо id з адресної стрічки (наприклад, з /user/6432...)
  const followers = useSelector(selectFollowers);

  useEffect(() => {
    // 3. Передаємо id в екшн, тільки якщо він існує
    if (id) {
      // dispatch(fetchFollowers(id));
      console.log('Followers fetch is disabled for now');
    }
  }, [dispatch, id]); // Додаємо id в залежності

  return (
    <div className={styles.listContainer}>
      {/* 4. Не роби map тут! UserList сам зробить map. 
          Просто передай йому масив users. */}
      {followers && followers.length > 0 ? (
        <UserList users={followers} />
      ) : (
        <p>No followers yet.</p>
      )}
    </div>
  );
};

export default UserFollowers;
