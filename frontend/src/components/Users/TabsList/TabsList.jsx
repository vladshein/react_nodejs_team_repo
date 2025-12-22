import { NavLink, useLocation, useParams } from 'react-router-dom';
import styles from './TabsList.module.css';
import { useEffect, useRef } from 'react';

const TabsList = () => {
  const { id } = useParams();
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const activeTab = navRef.current?.querySelector(`.${styles.active}`);
    if (activeTab) {
      activeTab.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [location.pathname]);
  return (
    <nav className={styles.navMenu} ref={navRef}>
      <NavLink
        to="recipes"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
        {id === 'current' ? 'My Recipes' : 'Recipes'}
      </NavLink>
      {id === 'current' && (
        <NavLink
          to="favorites"
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          My Favorites
        </NavLink>
      )}

      <NavLink
        to="followers"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
        Followers
      </NavLink>

      {id === 'current' && (
        <NavLink
          to="following"
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          Following
        </NavLink>
      )}
    </nav>
  );
};

export default TabsList;
