import { NavLink, useParams } from 'react-router-dom';
import styles from './TabsList.module.css';

const TabsList = () => {
  const { id } = useParams();
  return (
    <nav className={styles.navMenu}>
      <NavLink
        to="recipes"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
        My Recipes
      </NavLink>
      {id === 'current' && (
        <NavLink
          to="favorites"
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          Favorites
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
