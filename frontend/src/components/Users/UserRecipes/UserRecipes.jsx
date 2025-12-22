import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteRecipe, fetchMyRecipes, fetchUserRecipes } from './../../../redux/recipes/actions';
// import { deleteRecipe } from './../../../redux/recipes/actions';
import { selectMyRecipes, selectUserRecipes } from './../../../redux/recipes/selectors';
import UserRecipeCard from '../UserRecipeCard/UserRecipeCard';
import styles from './UserRecipes.module.css';
import Pagination from './../../common/Pagination/Pagination';

const UserRecipes = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipes, pagination } = useSelector(
    id === 'current' ? selectMyRecipes : selectUserRecipes
  );
  // console.log(pagination);

  // filters - id, limit, page
  const [filters, setFilters] = useState({
    id: null,
    limit: 9,
    page: 1,
  });

  useEffect(() => {
    if (id === 'current') {
      dispatch(fetchMyRecipes(filters));
      return;
    }
    dispatch(fetchUserRecipes({ ...filters, id }));
  }, [dispatch, id, filters]);

  const handleOpenRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      // console.log('Deleting recipe with id:', id);
      dispatch(deleteRecipe(id));
    }
  };

  // handlers
  const callbackFuncions = {
    // pagination
    handlePagination: (value) => {
      // console.log(value);
      setFilters((prev) => ({ ...prev, page: value }));
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.recipes}>
        {recipes && recipes.length > 0 ? (
          <ul className={styles.list}>
            {recipes.map((recipe) => (
              <li key={recipe.id} className={styles.item}>
                <UserRecipeCard
                  id={recipe.id}
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
      <div className={styles.recipePagination}>
        {pagination ? (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onChange={callbackFuncions.handlePagination}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default UserRecipes;
