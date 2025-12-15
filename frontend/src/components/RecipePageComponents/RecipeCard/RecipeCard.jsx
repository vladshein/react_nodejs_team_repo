import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RecipeCard.module.css';
import IconHeart from '../../common/icons/IconHeart';
import IconArrowUpRight from '../../common/icons/IconArrowUpRight'; 

/* Using:
<RecipeCard
    recipe={{
      id: '123',
      title: 'Chocolate Cake',
      description: 'Delicious homemade chocolate cake',
      image: '../images/Hero/desert2x.webp',
      author: {
        id: '456',
        name: 'John Chef',
        avatar: '../images/Hero/desert2x.webp'
      }
    }}
    isAuthed="false"
    onNeedAuth={() => openSignInModal()}
    onToggleFavorite={async (id) => await toggleFavorite(id)}
    isFavorite={true}
/> */

export default function RecipeCard({
  recipe,
  isAuthed = false,
  onNeedAuth,
  onToggleFavorite,
  isFavorite: favoriteFromParent,
}) {
  const navigate = useNavigate();
  const {
    id,
    title,
    description,
    image,
    thumb,
    author = { id: null, name: 'User', avatar: '../../../images/favicon.png' },
  } = recipe || {};

  const [localFav, setLocalFav] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [viewPressed, setViewPressed] = useState(false);

  const isFavorite = favoriteFromParent ?? localFav;

  const requireAuth = fn => {
    if (isAuthed) return fn();
    if (onNeedAuth) onNeedAuth();
  };

  const handleFavoriteToggle = () => {
    requireAuth(async () => {
      setFavLoading(true);
      try {
        if (onToggleFavorite) await onToggleFavorite(id);
        else setLocalFav(v => !v);
      } finally {
        setFavLoading(false);
      }
    });
  };

  const handleAuthorClick = () => {
    requireAuth(() => {
      if (author?.id) navigate(`/user/${author.id}`);
    });
  };

  const handleNavigateToRecipe = () => {
    setViewPressed(true);
    setTimeout(() => setViewPressed(false), 180);
    navigate(`/recipe/${id}`);
  };

  return (
    <div className={styles.card}>
      {/* Image */}
      <div
        className={styles.imageContainer}
        style={{ backgroundImage: `url(${image || thumb || '../../../images/favicon.png'})` }}
        aria-label={title}
        role="img"
        onClick={handleNavigateToRecipe}
      />

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.descSlot}>
            <p className={styles.description}>{description}</p>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.author}>
            <button
              onClick={handleAuthorClick}
              className={styles.authorButton}
              type="button"
              title={author?.name}
              aria-label={`Open ${author?.name} profile`}
            >
              <div
                className={styles.authorImage}
                style={{
                  backgroundImage: `url(${author?.avatar || '../../../images/favicon.png'})`,
                }}
              />
              <span className={styles.authorName}>{author?.name}</span>
            </button>
          </div>

          <div className={styles.actions}>
            <button
              onClick={handleFavoriteToggle}
              className={`${styles.iconButton} ${styles.favoriteButton} ${isFavorite ? styles.isFavorite : ''} ${favLoading ? styles.isLoading : ''}`}
              aria-pressed={isFavorite}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              type="button"
              disabled={favLoading}
            >
              {favLoading ? (
                <div className={styles.loader}>...</div>
              ) : (
                <IconHeart className={styles.icon} />
              )}
            </button>

            <button
              onClick={handleNavigateToRecipe}
              className={`${styles.iconButton} ${styles.viewButton} ${viewPressed ? styles.isPressed : ''}`}
              title="View recipe"
              type="button"
            >
              <IconArrowUpRight className={styles.icon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}