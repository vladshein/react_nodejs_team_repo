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
      {pickedIngredients.map((item) => (
        <li key={item.id} className={styles.ingredientItem}>
          <Button
            onClick={() => handleRemoveIngredient(item.id)}
            className={styles.removeButton}
            variant="outlined">
            <IconClose width={16} height={16} />
          </Button>
          <img src="" alt="" className={styles.ingredientImage} />
          <div className={styles.ingredientInfo}>
            <p>{ingredientsOptions.find((opt) => opt.id === item.id)?.label || 'Unknown'}</p>
            <p className={styles.quantity}>{item.quantity}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PickedIngredientsList;
