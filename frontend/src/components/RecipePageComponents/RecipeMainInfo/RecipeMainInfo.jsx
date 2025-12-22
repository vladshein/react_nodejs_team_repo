import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './RecipeMainInfo.module.css';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';
import { openModal } from '../../../redux/modal/modalSlice';

const RecipeMainInfo = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleOwnerClick = () => {
    if (!isLoggedIn) {
      dispatch(
        openModal({
          modalType: 'auth',
          modalProps: { view: 'signIn' },
        })
      );
      return;
    }

    if (recipe?.owner?.id) {
      navigate(`/user/${recipe.owner.id}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1>{recipe.title}</h1>

      <div className={styles.badgesBlock}>
        <div className={styles.badge}>{recipe.category.name}</div>
        <div className={styles.badge}>{recipe.time} min</div>
      </div>

      <div className={styles.recipeDescriptionContainer}>
        <span className={styles.recipeDescriptionText}>{recipe.description}</span>
      </div>

      {/* Owner */}
      <button
        className={styles.ownerContainer}
        onClick={handleOwnerClick}
        type="button"
        aria-label={`Open ${recipe.owner.name} profile`}>
        <img
          src={recipe.owner.avatar || '/favicon.png'}
          alt={recipe.owner.name}
          className={styles.ownerAvatar}
        />
        <div className={styles.ownerBlock}>
          <span className={styles.ownerCreatedBy}>Created by:</span>
          <p>{recipe.owner.name}</p>
        </div>
      </button>
    </div>
  );
};

export default RecipeMainInfo;
