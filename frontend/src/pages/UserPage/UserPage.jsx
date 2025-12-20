import { useParams, Outlet, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UserInfo from '../../components/Users/UserInfo/UserInfo';
import styles from './UserPage.module.css';
import { fetchUser, current } from '../../redux/users/actions';
import {} from '../../redux/users/selectors';

const UserPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id === 'current') {
      dispatch(current()).unwrap();
      return;
    }
    dispatch(fetchUser(id)).unwrap();
  }, [dispatch, id]);

  return (
    <div className={styles.pageContainer}>
      <aside className={styles.sidebar}>
        <UserInfo id={id} />

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
