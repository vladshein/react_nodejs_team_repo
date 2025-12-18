import Hero from '../../components/HomePageComponents/Hero/Hero';
import Testimonials from '../../components/HomePageComponents/Testimonials/Testimonials';
import Footer from '../../components/SharedLayoutComponents/Footer/Footer';
import RecipeHomeBlock from '../../components/RecipePageComponents/RecipeHomeBlock/RecipeHomeBlock';

const HomePage = () => {
  return (
    <div>
      <Hero />
      {/* categories */}
      <RecipeHomeBlock />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
