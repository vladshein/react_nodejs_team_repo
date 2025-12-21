import RecipeCard from './../../RecipePageComponents/RecipeCard/RecipeCard';
import styles from './RecipeList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleFavorites } from './../../../redux/recipes/actions';
import { selectIsLoggedIn } from './../../../redux/auth/selectors';

const RecipeList = ({ recipes }) => {
  const dispatch = useDispatch();
  const favClick = (obj) => {
    dispatch(handleFavorites(obj));
  };
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      {recipes && recipes.length > 0
        ? recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              className={styles.recipeCard}
              isAuthed={isLoggedIn}
              // onNeedAuth={openModal}
              onToggleFavorite={(obj) => favClick(obj)}
              isFavorite={Boolean(recipe.favoritesCount)}
            />
          ))
        : 'There are no results, try something new'}
    </>
  );
};

export default RecipeList;
