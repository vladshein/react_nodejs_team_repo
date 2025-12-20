import style from './Hero.module.css';
import Header from '../../SharedLayoutComponents/Header/Header';
import RequireAuthAction from '../../RequireAuthAction/RequireAuthAction.jsx';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

function useBreakpoint() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

const Hero = () => {
  return (
    <section className={style.heroContainer}>
      <h1 className={style.heroText}>Improve Your Culinary Talents</h1>
      <p className={style.heroTextSmall}>
        Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and
        tastes of various cuisines.
      </p>
      <RequireAuthAction to="/recipe/add">
        <button type="button" className={style.heroButton}>
          Add Recipe
        </button>
      </RequireAuthAction>
      <div className={style.heropicture}>
        <img className={style.rotated1} src="./images/Hero/desert2x.webp" alt="icon" />
        <img className={style.rotated2} src="./images/Hero/hot_dog2x.webp" alt="icon" />
      </div>
    </section>
  );
};

export default Hero;
