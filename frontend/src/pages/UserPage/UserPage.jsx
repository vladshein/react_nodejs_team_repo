import { useEffect } from 'react';
import { useParams, Outlet, NavLink, useNavigate } from 'react-router-dom';
import UserInfo from '../../components/Users/UserInfo/UserInfo';
import styles from './UserPage.module.css';
import Breadcrumbs from '../../components/SharedLayoutComponents/Breadcrumbs/Breadcrumbs';

import {
  selectCurrentUser,
  selectSelectedUser,
  selectUserIsLoading,
} from '../../redux/users/selectors';
import { selectUserId } from '../../redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, current, fetchFollowers, fetchFollowing } from '../../redux/users/actions';
import {} from '../../redux/users/selectors';
import TabsList from '../../components/Users/TabsList/TabsList';

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectUserId);
  if (id === currentUserId) {
    navigate('/user/current', { replace: true });
  }

  useEffect(() => {
    dispatch(fetchFollowers(id)).unwrap();
    dispatch(fetchFollowing('current')).unwrap();
    dispatch(current()).unwrap();
    dispatch(fetchUser(id)).unwrap();
  }, [dispatch, id]);

  const select = id === 'current' ? selectCurrentUser : selectSelectedUser;
  const user = useSelector(select);
  const isLoading = useSelector(selectUserIsLoading);

  const breadcrumbs = [
    { name: 'Home', link: '/' },
    { name: 'Profile', link: '/recipe/add' },
  ];

  return isLoading ? (
    <div>Loading user data...</div>
  ) : (
    user && (
      <div className={styles.container}>
        <Breadcrumbs paths={breadcrumbs} />
        <div className={styles.pageContainer}>
          <div className={styles.header}>
            <h2 className={styles.title}>PROFILE</h2>
            <p className={styles.subtitle}>
              Reveal your culinary art, share your favorite recipe and create gastronomic
              masterpieces with us.
            </p>
          </div>
          <div className={styles.heroSection}>
            <aside className={styles.sidebar}>
              <UserInfo user={user} />
            </aside>
            <main className={styles.content}>
              <TabsList />
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    )
  );
};

export default UserPage;
