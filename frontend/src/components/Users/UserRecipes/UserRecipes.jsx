import { useDispatch, useSelector } from 'react-redux';
import { selectMyRecipes } from '../../../redux/recipes/selectors';
import { useEffect } from 'react';
import { fetchMyRecipes } from '../../../redux/recipes/actions';

const UserRecipes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMyRecipes()).unwrap();
  }, [dispatch]);

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
