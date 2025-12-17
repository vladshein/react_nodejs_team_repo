import { Link } from 'react-router-dom';
import style from './Hero.module.css';
import Header from '../../SharedLayoutComponents/Header/Header';
import mainstyles from '../../../components/App.module.css';

const Hero = () => {
  return (
    <section className={style.heroContainer}>
      <Header />

      <h1 className={style.heroText}>Improve Your Culinary Talents</h1>
      <p className={style.heroTextSmall}>
        Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and
        tastes of various cuisines.
      </p>

      <Link to="/recipe/add" className={style.heroButton}>
        Add recipe
      </Link>

      <div className={style.heropicture}>
        <img className={style.rotated1} src="./images/Hero/desert2x.webp" alt="icon" />
        <img className={style.rotated2} src="./images/Hero/hot_dog2x.webp" alt="icon" />
      </div>
    </section>
  );
};

export default Hero;
