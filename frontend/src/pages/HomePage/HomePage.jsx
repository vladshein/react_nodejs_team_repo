import { Navigate, useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import Hero from '../../components/HomePageComponents/Hero/Hero';
import Testimonials from '../../components/HomePageComponents/Testimonials/Testimonials';


const HomePage = ({ onLoginClick, onRegisterClick, onLogOutClick }) => {
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
