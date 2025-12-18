import styles from './RecipeFilters.module.css';
import SelectField from '../../common/SelectField/SelectField';

const RecipeFilters = ({ handleIngredient, handleArea }) => {
  return (
    <aside className={styles.filters}>
      <SelectField
        name="ingredient"
        value="0"
        onChange={handleIngredient}
        onBlur={null}
        options={[
          { value: '640c2dd963a319ea671e37aa', label: 'Squid' },
          { value: '640c2dd963a319ea671e37f5', label: 'Cabbage' },
          { value: '640c2dd963a319ea671e3665', label: 'Baking Powder' },
        ]}
        placeholder="Ingredients"
      />
      <SelectField
        name="area"
        value="0"
        onChange={handleArea}
        onBlur={null}
        options={[
          { value: '6462a6f04c3d0ddd28897f9b', label: 'Ukrainian' },
          { value: '6462a6f04c3d0ddd28897f9c', label: 'Italian' },
          { value: '6462a6f04c3d0ddd28897f9d', label: 'Moroccan' },
        ]}
        placeholder="Area"
      />
    </aside>
  );
};

export default RecipeFilters;
