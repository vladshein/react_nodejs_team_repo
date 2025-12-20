import styles from './RecipePage.module.css';
import RecipeInfo from '../../components/RecipePageComponents/RecipeInfo/RecipeInfo';
import PopularRecipes from '../../components/RecipePageComponents/PopularRecipes/PopularRecipes';
import RecipeMainInfo from '../../components/RecipePageComponents/RecipeMainInfo/RecipeMainInfo';
import RecipePreparation from '../../components/RecipePageComponents/RecipePreparation/RecipePreparation';
import RecipeIngredients from '../../components/RecipePageComponents/RecipeIngredients/RecipeIngredients';
import Header from '../../components/SharedLayoutComponents/Header/Header';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../../components/common/button/Button';
import RequireAuthAction from '../../components/RequireAuthAction/RequireAuthAction';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../redux/auth/selectors';

const RecipePage = () => {
  const { id } = useParams(); // recipe id from URL
  const [recipe, setRecipe] = useState(null);
  const [popular, setPopular] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = useSelector(selectUserInfo);
  const [isFavorite, setIsFavorite] = useState(false);

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

  useEffect(() => {
    if (!user?.token) return;

    const checkFavorite = async () => {
      try {
        const res = await fetch(`${API_BASE}recipes/favorites`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to load favorites');

        const data = await res.json();
        console.log('checkFAv', data);

        const exists = data.some((item) => item.id === id);
        setIsFavorite(exists);
        console.log(isFavorite);
      } catch (error) {
        console.error(error);
      }
    };

    checkFavorite();
  }, [id, API_BASE, user?.token, isFavorite]);

  const toggleFavorite = async () => {
    if (!user?.token) return;
    console.log('trying to fetch!');

    try {
      const res = await fetch(`${API_BASE}recipes/favorites/${id}`, {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res.ok) throw new Error('Favorite action failed');

      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <>
      <Header />
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
      <PopularRecipes popular={popular} />
    </>
  );
};

export default RecipePage;
