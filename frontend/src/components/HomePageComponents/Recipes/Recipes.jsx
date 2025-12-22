// pavlo
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchRecipes } from './../../../redux/recipes/actions';
import { selectAllRecipes, selectIsLoading } from './../../../redux/recipes/selectors';
import MainTitle from './../../common/MainTitle/MainTitle';
import SubTitle from './../../common/SubTitle/SubTitle';
import RecipeFilters from './../RecipeFilters/RecipeFilters';
import RecipeList from '../RecipeList/RecipeList';
import Pagination from './../../common/Pagination/Pagination';
import Spinner from './../../common/Loader/Loader';
// import icons from './../../../images/icons.svg';
import styles from './Recipes.module.css';

const Recipes = () => {
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
    <section className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.recipeBackBtn}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.3029 9.0005L3.6963 8.99935"
            stroke="#050505"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.99902 14.3032L3.6963 8.99935L9.00017 3.69662"
            stroke="#050505"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.btnTxt}>back</span>
      </button>
      <MainTitle text={categoryNameFromUrl} align="left" />
      <SubTitle
        text="Go on a taste journey, where every sip is a sophisticated creative chord, every dessert is
          an expression of the most refined gastronomic desires."
        align="left"
      />
      <div className={styles.recipes}>
        <aside className={styles.recipeFilters}>
          <RecipeFilters callBackFunctions={callbackFuncions} />
        </aside>
        <div className={styles.recipesCardsBlock}>
          <div className={styles.recipesCards}>
            {!spin && recipes ? (
              <RecipeList recipes={recipes} />
            ) : (
              <div className={styles.spinCenter}>
                <Spinner />
              </div>
            )}
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
      </div>
    </section>
  );
};

export default Recipes;
