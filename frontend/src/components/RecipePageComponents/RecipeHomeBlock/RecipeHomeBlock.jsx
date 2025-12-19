// pavlo
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from './../../../redux/recipes/actions';
import { selectAllRecipes, selectIsLoading } from './../../../redux/recipes/selectors';

import styles from './RecipeHomeBlock.module.css';
import Button from './../../common/button/Button';
import MainTitle from './../../common/MainTitle/MainTitle';
import SubTitle from './../../common/SubTitle/SubTitle';
import RecipeFilters from './../RecipeFilters/RecipeFilters';
import RecipeList from '../RecipeList/RecipeList';
import Pagination from './../../common/Pagination/Pagination';
import Spinner from './../../common/Loader/Loader';

const RecipeHomeBlock = () => {
  const dispatch = useDispatch();
  const { recipes, pagination } = useSelector(selectAllRecipes);
  const spin = useSelector(selectIsLoading);

  // filters
  const [filters, setFilters] = useState({
    category: '6462a6cd4c3d0ddd28897f8a', // Seafood
    ingredient: '',
    area: '',
    page: 1, // pagination
  });
  // get data from backend
  useEffect(() => {
    dispatch(fetchRecipes(filters));
  }, [filters]);

  // handlers
  const callbackFuncions = {
    // ingredient
    handleIngredient: (value) => {
      setFilters((prev) => ({
        ...prev,
        ingredient: value,
      }));
    },
    // area
    handleArea: (value) => {
      setFilters((prev) => ({
        ...prev,
        area: value,
      }));
    },
    // pagination
    handlePagination: (value) => {
      setFilters((prev) => ({
        ...prev,
        page: value,
      }));
    },
  };

  return (
    <section>
      <div className={styles.recipeContainer}>
        <Button>Back</Button>
        <MainTitle text="desserts" />
        <SubTitle
          text="Go on a taste journey, where every sip is a sophisticated creative chord, every dessert is
          an expression of the most refined gastronomic desires."
        />
        <div className={styles.recipes}>
          <aside className={styles.recipeFilters}>
            <RecipeFilters callBackFunctions={callbackFuncions} />
          </aside>
          <div className={styles.resipesCardsBlock}>
            <div className={styles.resipesCards}>
              {!spin && recipes ? (
                <RecipeList recipes={recipes} />
              ) : (
                <div className={styles.spinCenter}>
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.recipePagination}>
          {!spin && pagination ? (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onChange={callbackFuncions.handlePagination}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </section>
  );
};

export default RecipeHomeBlock;
