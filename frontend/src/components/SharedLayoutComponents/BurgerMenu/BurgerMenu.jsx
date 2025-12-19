import { NavLink } from 'react-router-dom';
import RequireAuthAction from '../../RequireAuthAction/RequireAuthAction';
import styles from './BurgerMenu.module.css';

const BurgerMenu = ({ isOpen, variant = 'dark' }) => {
  if (!isOpen) return null;

  return (
    <nav className={styles.burgernav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${styles.burgerButtons} ${isActive ? styles.active : ''} ${
            variant === 'light' ? styles.dark : styles.light
          }`
        }>
        Home
      </NavLink>

      <RequireAuthAction to="/recipe/add">
        <NavLink
          to="/recipe/add"
          className={({ isActive }) =>
            `${styles.burgerButtons} ${isActive ? styles.active : ''} ${
              variant === 'light' ? styles.dark : styles.light
            }`
          }>
          Add Recipe
        </NavLink>
      </RequireAuthAction>
    </nav>
  );
};

export default BurgerMenu;
