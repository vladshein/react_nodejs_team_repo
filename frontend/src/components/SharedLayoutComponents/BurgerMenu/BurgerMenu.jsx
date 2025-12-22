import { NavLink } from 'react-router-dom';
import RequireAuthAction from '../../RequireAuthAction/RequireAuthAction';
import IconClose from '../../common/icons/IconClose';
import Logo from '../Logo/Logo';
import styles from './BurgerMenu.module.css';

const BurgerMenu = ({ isOpen, variant = 'dark', onNavigate }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="Menu">
      <div className={styles.panel}>
        <div className={styles.topBar}>
          <Logo variant="light" width={83} height={28} />
          <button
            type="button"
            className={styles.closeButton}
            onClick={onNavigate}
            aria-label="Close menu">
            <IconClose className={styles.closeIcon} />
          </button>
        </div>

        <nav className={styles.menuNav}>
          <NavLink
            to="/"
            onClick={onNavigate}
            className={({ isActive }) =>
              `${styles.primaryButton} ${isActive ? styles.active : ''}`
            }>
            Home
          </NavLink>

          <RequireAuthAction to="/recipe/add">
            <NavLink
              to="/recipe/add"
              onClick={onNavigate}
              className={({ isActive }) =>
                `${styles.secondaryLink} ${isActive ? styles.linkActive : ''}`
              }>
              Add Recipe
            </NavLink>
          </RequireAuthAction>
        </nav>

        <div className={styles.pictures} aria-hidden="true">
          <img className={styles.rotated1} src="./images/Hero/desert2x.webp" alt="" />
          <img className={styles.rotated2} src="./images/Hero/hot_dog2x.webp" alt="" />
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
