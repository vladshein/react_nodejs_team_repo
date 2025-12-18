// pavlo
import styles from './RecipePagination.module.css';

const RecipePagination = ({ currentPage, totalPages, onChange }) => {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            className={`pagination__item ${isActive ? 'active' : ''}`}
            onClick={() => onChange(page)}
            disabled={isActive}>
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default RecipePagination;
