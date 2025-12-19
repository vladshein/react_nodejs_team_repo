import styles from './MainTitle.module.css';

const MainTitle = ({ title = 'Main Title Component' }) => {
  return (
    <>
      <h1>{title.toUpperCase()}</h1>
    </>
  );
};

export default MainTitle;
