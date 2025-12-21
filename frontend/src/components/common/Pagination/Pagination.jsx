// pavlo
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onChange }) => {
  const visibleCount = 3;
  const middle = Math.floor(visibleCount / 2);
  let start = currentPage - middle;
  let end = currentPage + middle;
  // <-
  if (start < 1) {
    start = 1;
    end = Math.min(visibleCount, totalPages);
  }
  // ->
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, totalPages - visibleCount + 1);
  }
  return (
    <div className={styles.pagination}>
      {Array.from({ length: end - start + 1 }, (_, i) => {
        const page = start + i;
        const isActive = page === currentPage;
        let actClass = isActive ? 'paginationItemActive' : 'paginationItem';
        return (
          <button
            key={page}
            className={styles[actClass]}
            onClick={() => onChange(page)}
            disabled={false}>
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
