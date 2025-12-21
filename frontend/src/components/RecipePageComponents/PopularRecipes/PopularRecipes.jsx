import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './PopularRecipes.module.css';

const PopularRecipes = ({ popular, isFavorite }) => {
  return (
    <section className={styles.popular}>
      <h2 className={styles.title}>Popular recipes</h2>

      <div className={styles.cards}>
        {popular
          ? popular.map((recipe) => {
              return <RecipeCard recipe={recipe} isFavorite={isFavorite} />;
            })
          : null}
      </div>
    </section>
  );
};

export default PopularRecipes;
