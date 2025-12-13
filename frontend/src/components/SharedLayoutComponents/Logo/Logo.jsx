import style from './Logo.module.css';

const Logo = () => {
  return (
    <svg className={style.headerlogo}>
      <use href={'/icons.svg#icon-logo'}></use>
    </svg>
  );
};

export default Logo;
