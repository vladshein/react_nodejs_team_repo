import { useParams, Outlet, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import UserInfo from '../../components/Users/UserInfo/UserInfo';
import styles from './UserPage.module.css';

import {
  selectCurrentUser,
  selectSelectedUser,
  selectUserIsLoading,
} from '../../redux/users/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, current } from '../../redux/users/actions';
import {} from '../../redux/users/selectors';
import TabsList from '../../components/Users/TabsList/TabsList';

const UserPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id === 'current') {
      dispatch(current()).unwrap(); // Correct usage: dispatch the action
      return;
    }
    dispatch(fetchUser(id)).unwrap();
  }, [dispatch, id]);

  const select = id === 'current' ? selectCurrentUser : selectSelectedUser;

  const user = useSelector(select);
  const isLoading = useSelector(selectUserIsLoading);
  console.log(user);

  return isLoading ? (
    <div>Loading user data...</div>
  ) : (
    user && (
      <div className={styles.pageContainer}>
        <aside className={styles.sidebar}>
          <UserInfo user={user} />
        </aside>

        <main className={styles.content}>
          <TabsList />
          <Outlet />
        </main>
      </div>
    )
  );
};

export default UserPage;
