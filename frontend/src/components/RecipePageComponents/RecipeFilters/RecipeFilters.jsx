// pavlo
import styles from './RecipeFilters.module.css';
import SelectField from '../../common/SelectField/SelectField';

// handleIngredient, handleArea
const RecipeFilters = ({ callBackFunctions }) => {
  const { handleIngredient, handleArea } = callBackFunctions;
  return (
    <>
      <SelectField
        name="ingredient"
        value="0"
        onChange={(value) => handleIngredient(value)}
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
        onChange={(value) => handleArea(value)}
        onBlur={null}
        options={[
          { value: '6462a6f04c3d0ddd28897f9b', label: 'Ukrainian' },
          { value: '6462a6f04c3d0ddd28897f9c', label: 'Italian' },
          { value: '6462a6f04c3d0ddd28897f9d', label: 'Moroccan' },
        ]}
        placeholder="Area"
      />
    </>
  );
};

export default RecipeFilters;
