import style from './Hero.module.css';
import RequireAuthAction from '../../RequireAuthAction/RequireAuthAction.jsx';

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
        <img className={style.rotated1} src="/images/Hero/desert2x.webp" alt="icon" />
        <img className={style.rotated2} src="/images/Hero/hot_dog2x.webp" alt="icon" />
      </div>
    </section>
  );
};

export default Hero;
