import Header from '../../components/SharedLayoutComponents/Header/Header';
import AddRecipeForm from '../../components/AddRecipePageComponents/AddRecipeForm/AddRecipeForm';
import styles from './AddRecipePage.module.css';

const AddRecipePage = () => {
  return (
    <div>
      <Header />
      <div className={styles.pageWrapper}>
        <h2 className={styles.title}>Add recipe</h2>
        <p className={styles.description}>
          Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces
          with us.
        </p>
        <AddRecipeForm />
      </div>
    </div>
  );
};

export default AddRecipePage;
