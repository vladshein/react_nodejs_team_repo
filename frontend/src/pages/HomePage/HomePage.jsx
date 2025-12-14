import { Navigate, useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import Hero from '../../components/HomePageComponents/Hero/Hero';

const HomePage = ({ onLoginClick, onRegisterClick }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Hero onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
      {/* categories */}
      {/* testimonials */}
      {/* footer */}
    </div>
  );
};

export default HomePage;
