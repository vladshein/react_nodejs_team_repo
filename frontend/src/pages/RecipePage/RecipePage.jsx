import styles from './RecipePage.module.css';
import RecipeInfo from '../../components/RecipePageComponents/RecipeInfo/RecipeInfo';
import PopularRecipes from '../../components/RecipePageComponents/PopularRecipes/PopularRecipes';
import RecipeMainInfo from '../../components/RecipePageComponents/RecipeMainInfo/RecipeMainInfo';
import RecipePreparation from '../../components/RecipePageComponents/RecipePreparation/RecipePreparation';
import RecipeIngredients from '../../components/RecipePageComponents/RecipeIngredients/RecipeIngredients';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../../components/common/button/Button';
import RequireAuthAction from '../../components/RequireAuthAction/RequireAuthAction';
import { useFavoriteRecipe } from '../../services/useFavoriteRecipes';

const RecipePage = () => {
  const { id } = useParams(); // recipe id from URL
  const [recipe, setRecipe] = useState(null);
  const [popular, setPopular] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isFavorite, toggleFavorite } = useFavoriteRecipe(id);

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`${API_BASE}recipes/${id}`);
        if (!res.ok) throw new Error('Failed to load recipe');

        const data = await res.json();
        setRecipe(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, API_BASE]);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch(`${API_BASE}recipes/popular`);
        if (!res.ok) throw new Error('Failed to load popular recipes');

        const data = await res.json();

        const limitedData = data.slice(0, 4);
        setPopular(limitedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPopular();
  }, [API_BASE]);

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <>
      <div className={styles.catalogContainer}>
        <RecipeInfo>
          <div className={styles.columnContainerLeft}>
            {' '}
            {recipe && <img src={recipe.thumb} className={styles.recipeImage} />}
          </div>
          <div className={styles.columnContainerRight}>
            <RecipeMainInfo recipe={recipe} />
            <RecipeIngredients ingredients={recipe.ingredients} />
            <RecipePreparation instructions={recipe.instructions} />
            <RequireAuthAction>
              <Button
                variant="outlined"
                onClick={toggleFavorite}
                className={styles.addToFavoritesButton}>
                <span>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
              </Button>
            </RequireAuthAction>
          </div>
        </RecipeInfo>
      </div>
      <PopularRecipes popular={popular} isFavorite={isFavorite} />
    </>
  );
};

export default RecipePage;
