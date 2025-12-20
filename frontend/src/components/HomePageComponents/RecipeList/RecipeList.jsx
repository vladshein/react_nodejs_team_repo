import RecipeCard from './../../RecipePageComponents/RecipeCard/RecipeCard';
import styles from './RecipeList.module.css';

const RecipeList = ({ recipes }) => {
  return (
    <>
      {recipes && recipes.length > 0
        ? recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} className={styles.recipeCard} />
          ))
        : 'There is no result, try something new'}
    </>
  );
};

export default RecipeList;
