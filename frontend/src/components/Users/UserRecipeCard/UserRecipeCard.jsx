import IconArrowUpRight from './../../common/icons/IconArrowUpRight';
import IconTrash from './../../common/icons/IconTrash';
import styles from './UserRecipeCard.module.css';

/* Using
<UserRecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            thumb={recipe.thumb || recipe.image}
            onOpen={handleOpenRecipe}
            onDelete={handleRemoveFromFavorites}
            isDeleting={deletingId === recipe.id}
/> */

export default function UserRecipeCard({
  id,
  title,
  description,
  thumb,
  onOpen,
  onDelete,
  isDeleting,
}) {
  console.log(thumb);
  return (
    <article className={styles.row}>
      <img className={styles.thumb} src={thumb} alt={title} />

      <div className={styles.body}>
        <div className={styles.topLine}>
          <h4 className={styles.title}>{title}</h4>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.actionBtn}
              onClick={() => onOpen(id)}
              disabled={isDeleting}
              aria-label="Open recipe">
              <IconArrowUpRight className={styles.icon} width={18} height={18} />
            </button>
            {onDelete && (
              <button
                type="button"
                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                onClick={() => onDelete(id)}
                disabled={isDeleting}
                aria-label="Delete recipe">
                <IconTrash className={styles.icon} width={18} height={18} />
              </button>
            )}
          </div>
        </div>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
    </article>
  );
}
