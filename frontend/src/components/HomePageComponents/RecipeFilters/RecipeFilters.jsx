// pavlo
import styles from './RecipeFilters.module.css';
import SelectField from '../../common/SelectField/SelectField';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from './../../../redux/ingredients/actions';
import { selectIngredients } from './../../../redux/ingredients/selectors';
import { fetchAreas } from './../../../redux/areas/actions';
import { selectAreas } from './../../../redux/areas/selectors';

// handleIngredient, handleArea
const RecipeFilters = ({ callBackFunctions }) => {
  const dispatch = useDispatch();
  const ingredient = useSelector(selectIngredients);
  const area = useSelector(selectAreas);

  const newIngredient = ingredient.map(({ id, name, ...rest }) => ({
    ...rest,
    value: id,
    label: name,
  }));

  const newArea = area.map(({ id, name, ...rest }) => ({
    ...rest,
    value: id,
    label: name,
  }));
  // get data from backend
  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchAreas());
  }, []);

  const [ind, setInd] = useState();
  const [are, setAre] = useState();

  return (
    <div className={styles.filters}>
      <SelectField
        name="ingredient"
        value={ind}
        onChange={(value) => {
          setInd(value);
          callBackFunctions.handleIngredient(value);
        }}
        onBlur={false}
        options={newIngredient}
        placeholder="Ingredients"
      />
      <SelectField
        name="area"
        value={are}
        onChange={(value) => {
          setAre(value);
          callBackFunctions.handleArea(value);
        }}
        onBlur={false}
        options={newArea}
        placeholder="Area"
      />
    </div>
  );
};

export default RecipeFilters;
