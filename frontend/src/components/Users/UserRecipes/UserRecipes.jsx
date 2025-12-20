import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMyRecipes } from './../../../redux/recipes/actions';
// import { deleteRecipe } from './../../../redux/recipes/actions';
import { selectMyRecipes } from './../../../redux/recipes/selectors';
import UserRecipeCard from '../UserRecipeCard/UserRecipeCard';
import styles from './UserRecipes.module.css';

const UserRecipes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myRecipes = useSelector(selectMyRecipes);

  console.log('UserRecipes render:', myRecipes);

  useEffect(() => {
    dispatch(fetchMyRecipes());
  }, [dispatch]);

  const handleOpenRecipe = (id) => {
    navigate(`/recipes/${id}`);
  };

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      console.log('Deleting recipe with id:', id);
      // dispatch(deleteRecipe(id));
    }
  };

  return (
    <div className={styles.container}>
      {myRecipes && myRecipes.length > 0 ? (
        <ul className={styles.list}>
          {myRecipes.map((recipe) => (
            <li key={recipe._id || recipe.id} className={styles.item}>
              <UserRecipeCard
                id={recipe._id || recipe.id}
                title={recipe.title}
                description={recipe.description}
                thumb={recipe.thumb || recipe.preview || 'https://via.placeholder.com/343'}
                onOpen={handleOpenRecipe}
                onDelete={handleRemove}
                // isDeleting={deletingId === recipe._id}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyText}>You haven't created any recipes yet.</p>
      )}
    </div>
  );
};

export default UserRecipes;
