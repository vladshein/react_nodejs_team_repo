import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Hero from '../../components/HomePageComponents/Hero/Hero';
import Categories from '../../components/HomePageComponents/Categories/Categories';
import Testimonials from '../../components/HomePageComponents/Testimonials/Testimonials';
import Loader from '../../components/common/Loader/Loader';
import { selectCategoriesLoading } from '../../redux/categories/selectors';
import styles from './HomePage.module.css';

const HomePage = () => {
  const categoriesLoading = useSelector(selectCategoriesLoading);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);

  const handleTestimonialsLoadingChange = useCallback((isLoading) => {
    setTestimonialsLoading(Boolean(isLoading));
  }, []);

  const showOverlayLoader = categoriesLoading || testimonialsLoading;

  return (
    <div>
      {showOverlayLoader && (
        <div className={styles.spinCenter} aria-busy="true" aria-live="polite">
          <Loader />
        </div>
      )}
      <div className={styles.heroSection}>
        <Hero />
      </div>
      <Categories />
      <Testimonials onLoadingChange={handleTestimonialsLoadingChange} />
    </div>
  );
};

export default HomePage;
