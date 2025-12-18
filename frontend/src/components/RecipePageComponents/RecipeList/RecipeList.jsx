// pavlo
import styles from './RecipeList.module.css';
import RecipeCard from './../RecipeCard/RecipeCard';

const RecipeList = ({ recipes }) => {
  return (
    <>
      {recipes && recipes.length > 0
        ? recipes.map((recipe, index) => <RecipeCard key={index} recipe={recipe} />)
        : 'There is no result, try something new'}
    </>
  );
};

export default RecipeList;
