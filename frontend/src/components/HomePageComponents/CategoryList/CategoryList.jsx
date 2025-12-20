import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import IconArrowUpRight from '../../common/icons/IconArrowUpRight';
import {
  selectCategories,
  selectCategoriesLoading,
  selectCategoriesError,
} from '../../../redux/categories/selectors';
import { fetchCategories } from '../../../redux/categories/actions';
import styles from './CategoryList.module.css';

const CategoryList = ({ limit = 11, showAllCard = true }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const hasLimit = typeof limit === 'number';
  const canExpand = showAllCard && hasLimit && categories.length > limit;
  const displayedCategories = isExpanded || !hasLimit ? categories : categories.slice(0, limit);

  const getSrc = (name) => `/images/Categories_1x/${name}.webp`;
  const getSrcSet = (name) =>
    `/images/Categories_1x/${name}.webp 1x, /images/Categories_2x/${name}.jpg 2x`;

  return (
    <ul className={styles.grid}>
      {displayedCategories.map((cat) => (
        <li key={cat.id} className={styles.card}>
          <Link to={`/recipes?category=${cat.id}&name=${cat.name}`} className={styles.cardLink}>
            <figure className={styles.figure}>
              <img
                src={getSrc(cat.name)}
                srcSet={getSrcSet(cat.name)}
                loading="lazy"
                decoding="async"
                alt={cat.name}
                className={styles.image}
              />
              <figcaption className={styles.caption}>
                <span className={styles.namePill}>{cat.name}</span>
                <span className={styles.arrowPill} aria-hidden="true">
                  <IconArrowUpRight className={styles.arrowIcon} />
                </span>
              </figcaption>
            </figure>
          </Link>
        </li>
      ))}

      {canExpand && !isExpanded && (
        <li className={`${styles.card} ${styles.allCard}`}>
          <button type="button" className={styles.allButton} onClick={() => setIsExpanded(true)}>
            ALL CATEGORIES
          </button>
        </li>
      )}
    </ul>
  );
};

export default CategoryList;
