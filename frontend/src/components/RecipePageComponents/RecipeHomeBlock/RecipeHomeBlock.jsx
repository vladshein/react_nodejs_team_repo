import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from './../../../redux/recipes/actions';
import { selectAllRecipes } from './../../../redux/recipes/selectors';

import styles from './RecipeHomeBlock.module.css';
import Button from './../../common/button/Button';
import MainTitle from './../../common/MainTitle/MainTitle';
import SubTitle from './../../common/SubTitle/SubTitle';
import RecipeFilters from './../RecipeFilters/RecipeFilters';
import RecipeList from '../RecipeList/RecipeList';
import RecipePagination from './../RecipePagination/RecipePagination';

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
        <Button />
        <MainTitle text="desserts" />
        <SubTitle
          text="Go on a taste journey, where every sip is a sophisticated creative chord, every dessert is
          an expression of the most refined gastronomic desires."
        />
        <RecipeFilters callBackFunctions={[handleIngredient, handleArea]} />
        <RecipeList recipes={recipes} />
        <RecipePagination pagination={pagination} />
      </div>
    </section>
  );
};

export default RecipeHomeBlock;
