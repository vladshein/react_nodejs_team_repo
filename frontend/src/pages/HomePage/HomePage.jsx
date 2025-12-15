import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import mainstyles from '../../components/App.module.css';
import Hero from '../../components/HomePageComponents/Hero/Hero';
import Testimonials from '../../components/HomePageComponents/Testimonials/Testimonials';

<<<<<<< HEAD

const HomePage = ({ onLoginClick, onRegisterClick, onLogOutClick }) => {
=======
const HomePage = () => {
>>>>>>> main
  const navigate = useNavigate();
  return (
    <div>
      <Hero
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogOutClick={onLogOutClick}
      />
      {/* categories */}
      <Testimonials />
      {/* footer */}
    </div>
  );
};

export default HomePage;
