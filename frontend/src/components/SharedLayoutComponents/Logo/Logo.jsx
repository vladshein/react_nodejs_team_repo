import style from './Logo.module.css';
import { NavLink, Link } from 'react-router-dom';
const Logo = ({ variant }) => {
  return (
    <Link to="/">
      <span className={`${style.headerlogo} ${variant === 'dark' ? style.dark : style.light}`}>
        foodies
      </span>
    </Link>
  );
};

export default Logo;
