import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './RecipeCard.module.css';
import IconHeart from '../../common/icons/IconHeart';
import IconArrowUpRight from '../../common/icons/IconArrowUpRight';

import { selectIsLoggedIn } from '../../../redux/auth/selectors';
import { openModal } from '../../../redux/modal/modalSlice';
import { useFavoriteRecipe } from '../../../services/useFavoriteRecipes';

import noimage from './../../../images/no-image.png';

export default function RecipeCard({ recipe, className = '' }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { id, title, description, image, thumb, owner } = recipe;

  const author = {
    id: owner?.id,
    name: owner?.name || 'User',
    // avatar: owner?.avatar || '../../../images/favicon.png',
    avatar: owner?.avatar || noimage,
  };

  const { isFavorite, toggleFavorite, loading } = useFavoriteRecipe(id);

  const [viewPressed, setViewPressed] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      dispatch(
        openModal({
          modalType: 'auth',
          modalProps: { view: 'signIn', redirectTo: '/' },
        })
      );
      return;
    }

    toggleFavorite();
  };

  const handleNavigateToRecipe = () => {
    setViewPressed(true);
    setTimeout(() => setViewPressed(false), 180);
    navigate(`/recipe/${id}`);
  };

  const handleAuthorClick = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      dispatch(
        openModal({
          modalType: 'auth',
          modalProps: { view: 'signIn', redirectTo: '/' },
        })
      );
      return;
    }
    if (author.id) navigate(`/user/${author.id}/recipes`);
  };

  return (
    <div className={`${styles.card} ${className}`.trim()}>
      {/* Image */}
      <div
        className={styles.imageContainer}
        style={{
          // backgroundImage: `url(${image || thumb || '../../../images/favicon.png'})`,
          backgroundImage: `url(${image || thumb || noimage})`,
        }}
        onClick={handleNavigateToRecipe}
        role="img"
        aria-label={title}
      />

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.authorButton} onClick={handleAuthorClick} type="button">
            <div
              className={styles.authorImage}
              style={{ backgroundImage: `url(${author.avatar})` }}
            />
            <span className={styles.authorName}>{author.name}</span>
          </button>

          <div className={styles.actions}>
            <button
              onClick={handleFavoriteClick}
              className={`${styles.iconButton} ${styles.favoriteButton} ${
                isFavorite ? styles.isFavorite : ''
              }`}
              disabled={loading}
              aria-pressed={isFavorite}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              type="button">
              <IconHeart className={styles.icon} />
            </button>

            <button
              onClick={handleNavigateToRecipe}
              className={`${styles.iconButton} ${styles.viewButton} ${
                viewPressed ? styles.isPressed : ''
              }`}
              title="View recipe"
              type="button">
              <IconArrowUpRight className={styles.icon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
