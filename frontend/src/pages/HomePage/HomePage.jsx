import Hero from '../../components/HomePageComponents/Hero/Hero';
import Testimonials from '../../components/HomePageComponents/Testimonials/Testimonials';
import Footer from '../../components/SharedLayoutComponents/Footer/Footer';

const HomePage = () => {
  return (
    <div>
      <Hero />
      {/* categories */}
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
