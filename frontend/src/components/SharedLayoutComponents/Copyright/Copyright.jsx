import styles from './Copyright.module.css';

const Copyright = () => {
  const currentYear = new Date().getFullYear();
  return <p className={styles.copyright}>@{currentYear}, Foodies. All rights reserved</p>;
};

export default Copyright;
