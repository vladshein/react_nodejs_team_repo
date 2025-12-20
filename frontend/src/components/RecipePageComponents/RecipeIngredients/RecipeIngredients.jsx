import styles from './RecipeIngredients.module.css';

const RecipeIngredients = ({ ingredients }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.ingredientsTitle}>Ingredients</h1>
      <div className={styles.ingredientsContainer}>
        {ingredients
          ? ingredients.map((ingredient) => {
              return (
                <div className={styles.ingredientItem}>
                  <img
                    src={ingredient.img}
                    alt="Ingredient image"
                    className={styles.ingredientImage}
                  />
                  <div className={styles.ingredientBlock}>
                    <span className="">{ingredient.name}</span>
                    <p>{ingredient.recipeIngredient.measure}</p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default RecipeIngredients;
