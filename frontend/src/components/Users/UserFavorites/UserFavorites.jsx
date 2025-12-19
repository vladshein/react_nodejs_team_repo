import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteRecipes } from './../../../redux/recipes/actions';
import { selectFavorites } from './../../../redux/recipes/selectors';
// import { selectFavorites, selectIsLoading } from './../../../redux/recipes/selectors';

import styles from './UserFavorites.module.css';

const UserFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  // const spin = useSelector(selectIsLoading);
  console.log('const favorites = useSelector(selectFavorites): ', favorites);

  useEffect(() => {
    dispatch(fetchFavoriteRecipes());
  }, []);

  return (
    <div className={styles.container}>
      {favorites.length > 0 ? (
        <ul className={styles.list}>
          {favorites.map((recipe) => (
            <li key={recipe.id} className={styles.cardItem}>
              {/* Тут пізніше буде <RecipeCard recipe={recipe} /> */}
              <div className={styles.cardStub}>
                <img src={recipe.image} alt={recipe.title} className={styles.image} />
                <div className={styles.info}>
                  <h4 className={styles.title}>{recipe.title}</h4>
                  <span className={styles.time}>⏱ {recipe.time}</span>
                  <button className={styles.deleteBtn}>Remove</button>
                </div>
              </div>
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
