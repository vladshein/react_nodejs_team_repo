import style from './Logo.module.css';
import { NavLink, Link } from 'react-router-dom';
const Logo = ({ variant }) => {
  return (
    <Link to="/">
      <svg className={`${style.headerlogo} ${variant === 'dark' ? style.dark : style.light}`}>
        <use href={'/icons.svg#icon-logo'}></use>
      </svg>
    </Link>
  );
};

export default Logo;
