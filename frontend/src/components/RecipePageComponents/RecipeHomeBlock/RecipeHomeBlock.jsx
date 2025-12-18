import styles from './RecipeHomeBlock.module.css';
import SelectField from './../../common/SelectField/SelectField';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from './../../../redux/recipes/actions';
import { selectAllRecipes } from './../../../redux/recipes/selectors';

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
        <h1>DESSERTS</h1>
        <p className={styles.subtitle}>
          Go on a taste journey, where every sip is a sophisticated creative chord, every dessert is
          an expression of the most refined gastronomic desires.
        </p>
        <div className={styles.layout}>
          {/* Filters */}
          <aside className={styles.filters}>
            <SelectField
              name="ingredient"
              value="0"
              onChange={handleIngredient}
              onBlur={null}
              options={[
                { value: '640c2dd963a319ea671e37aa', label: 'Squid' },
                { value: '640c2dd963a319ea671e37f5', label: 'Cabbage' },
                { value: '640c2dd963a319ea671e3665', label: 'Baking Powder' },
              ]}
              placeholder="Ingredients"
            />
            <SelectField
              name="area"
              value="0"
              onChange={handleArea}
              onBlur={null}
              options={[
                { value: '6462a6f04c3d0ddd28897f9b', label: 'Ukrainian' },
                { value: '6462a6f04c3d0ddd28897f9c', label: 'Italian' },
                { value: '6462a6f04c3d0ddd28897f9d', label: 'Moroccan' },
              ]}
              placeholder="Area"
            />
          </aside>

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
