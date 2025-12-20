// pavlo
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { recipes, pagination } = useSelector(selectAllRecipes);
  const spin = useSelector(selectIsLoading);

  // Get category from URL params
  const categoryIdFromUrl = searchParams.get('category') || '';
  const categoryNameFromUrl = searchParams.get('name') || 'All Recipes';

  // Other filters (URL is the source of truth)
  const ingredientFromUrl = searchParams.get('ingredient') || '';
  const areaFromUrl = searchParams.get('area') || '';
  const pageFromUrlRaw = Number.parseInt(searchParams.get('page') || '1', 10);
  const pageFromUrl = Number.isFinite(pageFromUrlRaw) && pageFromUrlRaw > 0 ? pageFromUrlRaw : 1;

  const effectiveFilters = useMemo(
    () => ({
      category: categoryIdFromUrl,
      ingredient: ingredientFromUrl,
      area: areaFromUrl,
      page: pageFromUrl,
      limit: 12,
    }),
    [categoryIdFromUrl, ingredientFromUrl, areaFromUrl, pageFromUrl]
  );

  // get data from backend
  useEffect(() => {
    dispatch(fetchRecipes(effectiveFilters));
  }, [dispatch, effectiveFilters]);

  const updateUrlParams = (updates) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });

    setSearchParams(next, { replace: true });
  };

  // handlers
  const callbackFuncions = {
    // ingredient
    handleIngredient: (value) => {
      updateUrlParams({ ingredient: value, page: 1 });
    },
    // area
    handleArea: (value) => {
      updateUrlParams({ area: value, page: 1 });
    },
    // pagination
    handlePagination: (value) => {
      updateUrlParams({ page: value });
    },
  };

  return (
    <section>
      <div className={styles.recipeContainer}>
        <Button onClick={() => navigate(-1)}>Back</Button>
        <MainTitle text={categoryNameFromUrl} />
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
