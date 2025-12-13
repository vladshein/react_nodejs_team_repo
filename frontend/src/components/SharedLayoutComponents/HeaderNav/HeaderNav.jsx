import style from './HeaderNav.module.css';
import { NavLink } from 'react-router-dom';

const navClasses = ({ isActive }) => `${style.headerButtons} ${isActive ? style.active : ''}`;

const HeaderNav = () => {
  return (
    <nav className={style.headernav}>
      <NavLink to="/" className={navClasses}>
        Home
      </NavLink>
      <NavLink to="/catalog" className={navClasses}>
        Add Recipe
      </NavLink>
    </nav>
  );
};

export default HeaderNav;
