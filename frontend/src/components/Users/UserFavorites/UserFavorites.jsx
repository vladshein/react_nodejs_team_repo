import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFavoriteRecipes, removeFromFavorites } from './../../../redux/recipes/actions';
import { selectFavorites } from './../../../redux/recipes/selectors';
import UserRecipeCard from '../UserRecipeCard/UserRecipeCard';
import styles from './UserFavorites.module.css';
import { selectIsLoading } from '../../../redux/recipes/selectors';
import Pagination from './../../common/Pagination/Pagination';

const UserFavorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favorites, pagination } = useSelector(selectFavorites);
  const isLoading = useSelector(selectIsLoading);

  // ------------- paginator ----------------
  const [filters, setFilters] = useState({
    id: null,
    limit: 9,
    page: 1,
  });
  useEffect(() => {
    dispatch(fetchFavoriteRecipes(filters)).unwrap();
  }, [dispatch, filters]);
  const callbackFuncions = {
    // pagination
    handlePagination: (value) => {
      setFilters((prev) => ({ ...prev, page: value }));
    },
  };
  // ------------- end paginator ----------------

  const handleOpenRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleRemoveFromFavorites = (id) => {
    dispatch(removeFromFavorites(id)).unwrap();
  };

  return isLoading ? (
    <div>Loading favorite recipes...</div>
  ) : (
    <div className={styles.container}>
      <div className={styles.favorites}>
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
      <div className={styles.paginator}></div>
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
  );
};

export default UserFavorites;
