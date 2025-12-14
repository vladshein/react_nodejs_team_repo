import style from './Logo.module.css';
import { NavLink, Link } from 'react-router-dom';
const Logo = () => {
  return (
    <Link to="/">
      <svg className={style.headerlogo}>
        <use href={'/icons.svg#icon-logo'}></use>
      </svg>
    </Link>
  );
};

export default Logo;
