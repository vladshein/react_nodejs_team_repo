import Header from '../../components/SharedLayoutComponents/Header/Header';
import Hero from '../../components/HomePageComponents/Hero/Hero';
import Categories from '../../components/HomePageComponents/Categories/Categories';
import Testimonials from '../../components/HomePageComponents/Testimonials/Testimonials';
import Footer from '../../components/SharedLayoutComponents/Footer/Footer';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div>
      <div className={styles.heroSection}>
        <Header />
        <Hero />
      </div>
      <Categories />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
