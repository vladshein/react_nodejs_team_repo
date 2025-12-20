import { useParams, Outlet, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UserInfo from '../../components/Users/UserInfo/UserInfo';
import styles from './UserPage.module.css';
import { fetchUser, current } from '../../redux/users/actions';
import {} from '../../redux/users/selectors';
import TabsList from '../../components/Users/TabsList/TabsList';

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
      </aside>

      <main className={styles.content}>
        <TabsList />
        <Outlet />
      </main>
    </div>
  );
};

export default UserPage;
