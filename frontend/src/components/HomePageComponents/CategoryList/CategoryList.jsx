import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategories,
  selectCategoriesLoading,
  selectCategoriesError,
} from '../../../redux/categories/selectors';
import { fetchCategories } from '../../../redux/categories/actions';
import styles from './CategoryList.module.css';

const CategoryList = ({}) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const getSrc = (name) => `/images/Categories_1x/${name}.webp`;
  const getSrcSet = (name) =>
    `/images/Categories_1x/${name}.webp 1x, /images/Categories_2x/${name}.jpg 2x`;

  return (
    <ul className={styles.grid}>
      {categories.map((cat) => (
        <li key={cat.id} className={styles.card}>
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
              <span className={styles.name}>{cat.name}</span>
              <button type="button" className={styles.arrowBtn}>
                →
              </button>
            </figcaption>
          </figure>
        </li>
      ))}

      <li className={`${styles.card} ${styles.allCard}`}>
        <button type="button" className={styles.allButton}>
          ALL CATEGORIES
        </button>
      </li>
    </ul>
  );
};

export default CategoryList;
