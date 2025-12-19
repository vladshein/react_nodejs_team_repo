import Button from '../../common/button/Button';
import IconClose from '../../common/icons/IconClose';
import styles from './PickedIngredientsList.module.css';

const PickedIngredientsList = ({
  pickedIngredients,
  ingredientsOptions,
  handleRemoveIngredient,
}) => {
  return (
    <ul className={styles.ingredientsList}>
      {pickedIngredients.map((item) => {
        const ingredient = ingredientsOptions.find((opt) => opt.value === item.id);

        return (
          <li key={item.id} className={styles.ingredientItem}>
            <Button
              onClick={() => handleRemoveIngredient(item.id)}
              className={styles.removeButton}
              variant="outlined">
              <IconClose width={16} height={16} />
            </Button>
            <div className={styles.imageContainer}>
              <img
                src={ingredient.img}
                alt={ingredient.label || 'Ingredient'}
                className={styles.ingredientImage}
              />
            </div>

            <div className={styles.ingredientInfo}>
              <p>{ingredient?.label || 'Unknown'}</p>
              <p className={styles.quantity}>{item.quantity}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PickedIngredientsList;
