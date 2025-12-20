import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/SharedLayoutComponents/Header/Header';
import AddRecipeForm from '../../components/AddRecipePageComponents/AddRecipeForm/AddRecipeForm';
import { selectCategories } from '../../redux/categories/selectors';
import { selectIngredients } from '../../redux/ingredients/selectors';
import { selectAreas } from '../../redux/areas/selectors';
import { fetchAreas } from '../../redux/areas/actions';
import { fetchCategories } from '../../redux/categories/actions';
import { fetchIngredients } from '../../redux/ingredients/actions';
import styles from './AddRecipePage.module.css';
import Breadcrumbs from '../../components/SharedLayoutComponents/Breadcrumbs/Breadcrumbs';

const AddRecipePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
    dispatch(fetchAreas());
  }, [dispatch]);

  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);
  const areas = useSelector(selectAreas);

  const categoriesOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const ingredientsOptions = ingredients.map((ingredient) => ({
    label: ingredient.name,
    value: ingredient.id,
    img: ingredient.img,
  }));

  const areasOptions = areas.map((area) => ({
    label: area.name,
    value: area.id,
  }));

  const breadcrumbs = [
    { name: 'Home', link: '/' },
    { name: 'Add Recipe', link: '/recipe/add' },
  ];

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Breadcrumbs paths={breadcrumbs} />
        <div className={styles.pageWrapper}>
          <h2 className={styles.title}>Add recipe</h2>
          <p className={styles.description}>
            Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces
            with us.
          </p>
          <AddRecipeForm
            categoriesOptions={categoriesOptions}
            ingredientsOptions={ingredientsOptions}
            areasOptions={areasOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default AddRecipePage;
