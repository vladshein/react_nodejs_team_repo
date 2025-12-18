import styles from './SubTitle.module.css';

const SubTitle = ({ text = 'SubTitle component' }) => {
  return (
    <>
      <p className={styles.subtitle}>{text}</p>
    </>
  );
};

export default SubTitle;
