import { useEffect } from 'react';
import { useParams, Outlet, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UserInfo from '../../components/Users/UserInfo/UserInfo';
import styles from './UserPage.module.css';
import { fetchUser } from '../../redux/users/actions';

const UserPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [dispatch, id]);

  return (
    <div className={styles.pageContainer}>
      <aside className={styles.sidebar}>
        <UserInfo />

        <nav className={styles.navMenu}>
          <NavLink to="recipes" className={({ isActive }) => (isActive ? styles.active : '')}>
            My Recipes
          </NavLink>
          <NavLink to="favorites" className={({ isActive }) => (isActive ? styles.active : '')}>
            Favorites
          </NavLink>
          <NavLink to="followers" className={({ isActive }) => (isActive ? styles.active : '')}>
            Followers
          </NavLink>
          <NavLink to="following" className={({ isActive }) => (isActive ? styles.active : '')}>
            Following
          </NavLink>
        </nav>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default UserPage;
