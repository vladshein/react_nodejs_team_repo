import { useParams, Outlet, NavLink } from 'react-router-dom';
import UserInfo from '../../components/Users/UserInfo/UserInfo';
import styles from './UserPage.module.css';

import {
  selectCurrentUser,
  selectSelectedUser,
  selectUserIsLoading,
} from '../../redux/users/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser, current } from '../../redux/users/actions';

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
    <div className={styles.pageContainer}>
      <aside className={styles.sidebar}>
        {user && <UserInfo user={user} />}

        <nav className={styles.navMenu}>
          <NavLink to="recipes" className={({ isActive }) => (isActive ? styles.active : '')}>
            {id === 'current' ? 'My Recipes' : 'Recipes'}
          </NavLink>
          {id === 'current' && (
            <NavLink to="favorites" className={({ isActive }) => (isActive ? styles.active : '')}>
              Favorites
            </NavLink>
          )}
          <NavLink to="followers" className={({ isActive }) => (isActive ? styles.active : '')}>
            Followers
          </NavLink>
          {id === 'current' && (
            <NavLink to="following" className={({ isActive }) => (isActive ? styles.active : '')}>
              Following
            </NavLink>
          )}
        </nav>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default UserPage;
