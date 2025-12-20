import styles from './RecipeMainInfo.module.css';

const RecipeMainInfo = ({ recipe }) => {
  return (
    <div className={styles.container}>
      <h1>{recipe.title}</h1>
      <div className={styles.badgesBlock}>
        <div className={styles.badge}>{recipe.category.name}</div>
        <div className={styles.badge}>{recipe.time} min</div>
      </div>
      <div className={styles.recipeDescriptionContainer}>
        <span className={styles.recipeDescriptionText}>{recipe.description}</span>
      </div>
      <div className={styles.ownerContainer}>
        <img src="/favicon.png" alt="NULL" className={styles.ownerAvatar} />{' '}
        {/* src={recipe.owner.avatar} */}
        <div className={styles.ownerBlock}>
          <span className={styles.ownerCreatedBy}>Created by:</span>
          <p>{recipe.owner.name}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeMainInfo;
