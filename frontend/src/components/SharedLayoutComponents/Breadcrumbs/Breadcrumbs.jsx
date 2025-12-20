import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = ({ paths }) => {
  return (
    <nav className={styles.breadcrumbs}>
      <ol className={styles.breadcrumbsList}>
        {paths.map((path, index) => (
          <li key={`${index}_${path}`} className={styles.breadcrumbsItem}>
            {index < paths.length - 1 ? (
              <>
                <Link to={path.link} className={styles.breadcrumbLink}>
                  {path.name}
                </Link>
                <span className={styles.separator}>/</span>
              </>
            ) : (
              <span className={styles.breadcrumbCurrent}>{path.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
