import style from './HeaderNav.module.css';
import { NavLink } from 'react-router-dom';

const HeaderNav = ({ variant }) => {
  return (
    <nav className={style.headernav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${style.headerButtons} ${isActive ? style.active : ''} ${
            variant === 'dark' ? style.dark : style.light
          }`
        }>
        Home
      </NavLink>

      <NavLink
        to="/recipe/add"
        className={({ isActive }) =>
          `${style.headerButtons} ${isActive ? style.active : ''} ${
            variant === 'dark' ? style.dark : style.light
          }`
        }>
        Add Recipe
      </NavLink>
    </nav>
  );
};

export default HeaderNav;
