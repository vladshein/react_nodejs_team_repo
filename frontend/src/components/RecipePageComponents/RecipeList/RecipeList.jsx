import styles from './RecipeList.module.css';

import RecipeCard from './../RecipeCard/RecipeCard';

const RecipeList = ({ recipes }) => {
  return (
    <div className={styles.layout}>
      <section className={styles.grid}>
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => <RecipeCard recipe={recipe} />)
        ) : (
          <h1>No found.</h1>
        )}
      </section>
    </div>
  );
};

export default RecipeList;

{
  /* <article className={styles.card}>
  <img src={recipe.thumb} alt="Bakewell Tart" />
  <div className={styles.cardBody}>
    <div className={styles.cardTitle}>{recipe.title}</div>
    <div className={styles.cardDesc}>{recipe.description}</div>
    <div className={styles.cardFooter}>
      <div className={styles.author}>
        <img src={recipe.owner.avatar} alt="" />
        <span>{recipe.owner.name}</span>
      </div>
      <div className="actions">
        <button className={styles.iconBtn}>♡</button>
        <button className={styles.iconBtn}>↗</button>
      </div>
    </div>
  </div>
</article> */
}
