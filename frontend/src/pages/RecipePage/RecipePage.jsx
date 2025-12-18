import styles from './RecipePage.module.css';
import RecipeInfo from '../../components/RecipePageComponents/RecipeInfo/RecipeInfo';
import PopularRecipes from '../../components/RecipePageComponents/PopularRecipes/PopularRecipes';
import RecipeMainInfo from '../../components/RecipePageComponents/RecipeMainInfo/RecipeMainInfo';
import RecipePreparation from '../../components/RecipePageComponents/RecipePreparation/RecipePreparation';
import RecipeIngredients from '../../components/RecipePageComponents/RecipeIngredients/RecipeIngredients';
import Header from '../../components/SharedLayoutComponents/Header/Header';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const RecipePage = () => {
  const { id } = useParams(); // recipe id from URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/recipes/${id}`);
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
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <>
      <Header />
      <div className={styles.catalogContainer}>
        <RecipeInfo>
          <div className="columnContainerLeft">
            {' '}
            {recipe && <img src={recipe.thumb} className={styles.recipeImage} />}
          </div>
          <div className="columnContainerRight">
            <RecipeMainInfo recipe={recipe} />
            <RecipeIngredients ingredients={recipe.ingredients} />
            <RecipePreparation instructions={recipe.instructions} />
          </div>
        </RecipeInfo>
        <PopularRecipes />
      </div>
    </>
  );
};

export default RecipePage;
