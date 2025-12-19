import { useSelector } from 'react-redux';
import { selectMyRecipes } from '../../../redux/recipes/selectors';

const UserRecipes = () => {
  const recipes = useSelector(selectMyRecipes);
  const recipesList = recipes.recipes || [];
  console.log(recipes);

  return recipesList.length === 0 ? (
    <div>Here will be the list of user's recipes...</div>
  ) : (
    <div>
      <h3>My Recipes</h3>
      <ul>
        {recipesList.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserRecipes;
