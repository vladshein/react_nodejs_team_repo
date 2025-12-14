import style from './HeaderNav.module.css';
import { NavLink } from 'react-router-dom';

const navClasses = ({ isActive }) => `${style.headerButtons} ${isActive ? style.active : ''}`;

const HeaderNav = () => {
  return (
    <nav className={style.headernav}>
      <NavLink to="/" className={navClasses}>
        Home
      </NavLink>
      {/* check if user authorized. if authorized go to the 
      recipe/add else show message that user is not authorized*/}
      <NavLink to="/recipe/add" className={navClasses}>
        Add Recipe
      </NavLink>
    </nav>
  );
};

export default HeaderNav;
