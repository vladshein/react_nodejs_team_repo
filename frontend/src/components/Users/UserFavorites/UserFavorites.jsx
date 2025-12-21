import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFavoriteRecipes, removeFromFavorites } from './../../../redux/recipes/actions';
import { selectFavorites } from './../../../redux/recipes/selectors';
// import { removeFromFavorites } from './../../../redux/recipes/actions';

import UserRecipeCard from '../UserRecipeCard/UserRecipeCard';
import styles from './UserFavorites.module.css';

const UserFavorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector(selectFavorites);

  console.log('Favorites list:', favorites);

  useEffect(() => {
    dispatch(fetchFavoriteRecipes());
  }, [dispatch]);

  const handleOpenRecipe = (id) => {
    navigate(`/recipes/${id}`);
  };

  const handleRemoveFromFavorites = (id) => {
    dispatch(removeFromFavorites(id));
    dispatch(fetchFavoriteRecipes());
    console.log('Removing from favorites:', id);
  };

  return (
    <div className={styles.container}>
      {favorites && favorites.length > 0 ? (
        <ul className={styles.list}>
          {favorites.map((recipe) => (
            <li key={recipe._id || recipe.id} className={styles.cardItem}>
              <UserRecipeCard
                id={recipe._id || recipe.id}
                title={recipe.title}
                description={recipe.description}
                thumb={recipe.thumb || recipe.image || recipe.preview}
                onOpen={handleOpenRecipe}
                onDelete={handleRemoveFromFavorites}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyText}>You haven't added any favorite recipes yet.</p>
      )}
    </div>
  );
};

export default UserFavorites;
