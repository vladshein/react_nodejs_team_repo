import { NavLink } from 'react-router-dom';
import styles from './TabsList.module.css';

const TabsList = () => {
  return (
    <nav className={styles.navMenu}>
      <NavLink
        to="recipes"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
        My Recipes
      </NavLink>
      <NavLink
        to="favorites"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
        Favorites
      </NavLink>
      <NavLink
        to="followers"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
        Followers
      </NavLink>
      <NavLink
        to="following"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
        Following
      </NavLink>
    </nav>
  );
};

export default TabsList;
