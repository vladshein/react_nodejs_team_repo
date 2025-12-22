import styles from './RecipeInfo.module.css';

const RecipeInfo = ({ children }) => {
  return <div className={styles.infoWrapper}>{children}</div>;
};

export default RecipeInfo;
