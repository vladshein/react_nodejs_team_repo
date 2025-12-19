// pavlo
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onChange }) => {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
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
