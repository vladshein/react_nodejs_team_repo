import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from './../../../redux/recipes/actions';
import { selectAllRecipes } from './../../../redux/recipes/selectors';

import styles from './RecipeHomeBlock.module.css';
import MainTitle from './../../common/MainTitle/MainTitle';
import SubTitle from './../../common/SubTitle/SubTitle';
import RecipeFilters from './../RecipeFilters/RecipeFilters';

const RecipeHomeBlock = () => {
  const dispatch = useDispatch();
  const { recipes, pagination } = useSelector(selectAllRecipes);
  // filters
  const [filters, setFilters] = useState({
    category: '6462a6cd4c3d0ddd28897f8a', // Seafood
    ingredient: '',
    area: '',
  });
  // get data from backend
  useEffect(() => {
    dispatch(fetchRecipes(filters));
  }, [filters]);
  // filter handlers
  const handleIngredient = (value) => {
    setFilters((prev) => ({
      ...prev,
      ingredient: value,
    }));
  };
  // area hendlers
  const handleArea = (value) => {
    setFilters((prev) => ({
      ...prev,
      area: value,
    }));
  };

  return (
    <section>
      <div className={styles.recipeContainer}>
        <a href="#" className={styles.back}>
          ← Back
        </a>
        <MainTitle text="desserts" />
        <SubTitle
          text="Go on a taste journey, where every sip is a sophisticated creative chord, every dessert is
          an expression of the most refined gastronomic desires."
        />
        <RecipeFilters callBackFunctions={[handleIngredient, handleArea]} />
        <div className={styles.layout}>
          {/* Cards */}
          <section className={styles.grid}>
            {recipes && recipes.length > 0 ? (
              recipes.map((recipe) => (
                <article className={styles.card}>
                  <img src={recipe.thumb} alt="Bakewell Tart" />
                  <div className={styles.cardBody}>
                    <div className={styles.cardTitle}>{recipe.title}</div>
                    <div className={styles.cardDesc}>{recipe.description}</div>
                    <div className={styles.cardFooter}>
                      <div className={styles.author}>
                        <img src={recipe.owner.avatar} alt="" />
                        <span>{recipe.owner.name}</span>
                      </div>
                      <div className="actions">
                        <button className={styles.iconBtn}>♡</button>
                        <button className={styles.iconBtn}>↗</button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <>No found.</>
            )}
          </section>
        </div>
      </div>
    </section>
  );
};

export default RecipeHomeBlock;
