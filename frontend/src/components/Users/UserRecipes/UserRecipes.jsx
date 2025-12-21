import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMyRecipes, fetchUserRecipes } from './../../../redux/recipes/actions';
// import { deleteRecipe } from './../../../redux/recipes/actions';
import { selectMyRecipes, selectUserRecipes } from './../../../redux/recipes/selectors';
import UserRecipeCard from '../UserRecipeCard/UserRecipeCard';
import styles from './UserRecipes.module.css';

const UserRecipes = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipes } = useSelector(id === 'current' ? selectMyRecipes : selectUserRecipes);

  console.log('UserRecipes render:', recipes);

  useEffect(() => {
    if (id === 'current') {
      dispatch(fetchMyRecipes());
      return;
    }
    dispatch(fetchUserRecipes(id));
  }, [dispatch, id]);

  const handleOpenRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      console.log('Deleting recipe with id:', id);
      // dispatch(deleteRecipe(id));
    }
  };

  return (
    <div className={styles.container}>
      {recipes && recipes.length > 0 ? (
        <ul className={styles.list}>
          {recipes.map((recipe) => (
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
