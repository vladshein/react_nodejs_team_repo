import styles from './RecipePreparation.module.css';

const RecipePreparation = ({ instructions }) => {
  return (
    <div className={styles.section}>
      <h1 className={styles.sectionTitle}>Recipe Preparation</h1>
      <div className={styles.sectionText}>{instructions}</div>
    </div>
  );
};

export default RecipePreparation;
