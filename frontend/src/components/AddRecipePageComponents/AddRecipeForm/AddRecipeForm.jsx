import { useState } from 'react';
import { useFormik } from 'formik';
import Button from '../../common/button/Button';
import SelectField from '../../common/SelectField/SelectField';
import TimeInputField from '../TimeInputField/TimeInputField';
import TextAreaField from '../TextAreaField/TextAreaField';
import UploadPhoto from '../UploadPhoto/UploadPhoto';
import IconPlus from '../../common/icons/IconPlus';
import IconTrash from '../../common/icons/IconTrash';
import styles from './AddRecipeForm.module.css';
import PickedIngredientsList from '../PickedIngredientsList/PickedIngredientsList';

const initialValues = {
  title: '',
  description: '',
  category: '',
  time: 0,
  area: '',
  ingredients: [],
  instructions: '',
  thumb: '',
};

const AddRecipeForm = () => {
  const [thumbPreview, setThumbPreview] = useState(null);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState('');

  const categoryOptions = [
    { label: 'Breakfast', value: 'Breakfast' },
    { label: 'Beef', value: 'Beef' },
    { label: 'Chicken', value: 'Chicken' },
    { label: 'Dessert', value: 'Dessert' },
    { label: 'Goat', value: 'Goat' },
  ];

  const areaOptions = [
    { id: '1', value: 'American', label: 'American' },
    { id: '2', value: 'British', label: 'British' },
    { id: '3', value: 'Canadian', label: 'Canadian' },
    { id: '4', value: 'Ukrainian', label: 'Ukrainian' },
  ];

  const ingredientsOptions = [
    { id: '1', value: 'Chicken', label: 'Chicken' },
    { id: '2', value: 'Beef', label: 'Beef' },
    { id: '3', value: 'Carrot', label: 'Carrot' },
    { id: '4', value: 'Potato', label: 'Potato' },
  ];

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue('thumb', file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const autoResize = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const handleDescriptionChange = (e) => {
    formik.handleChange(e);
    autoResize(e.target);
  };

  const handleInstructionsChange = (e) => {
    formik.handleChange(e);
    autoResize(e.target);
  };

  const maxDescriptionLength = 200;
  const descriptionLength = formik.values.description.length;
  const maxInstructionsLength = 1000;
  const instructionsLength = formik.values.instructions.length;

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (currentIngredient && currentQuantity) {
      const selectedOption = ingredientsOptions.find((opt) => opt.value === currentIngredient);
      const newIngredient = {
        id: selectedOption?.id,
        quantity: currentQuantity,
      };
      formik.setFieldValue('ingredients', [...formik.values.ingredients, newIngredient]);
      setCurrentIngredient('');
      setCurrentQuantity('');
    }
  };

  const handleRemoveIngredient = (id) => {
    const updatedIngredients = formik.values.ingredients.filter((item) => item.id !== id);
    formik.setFieldValue('ingredients', updatedIngredients);
  };

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.uploadPhotoWrapper}>
        <UploadPhoto
          name="thumb"
          onChange={handleFileChange}
          onBlur={formik.handleBlur}
          thumbPreview={thumbPreview}
        />
        {formik.touched.thumb && formik.errors.thumb && (
          <div className={styles.uploadPhotoError}>{formik.errors.thumb}</div>
        )}
      </div>
      <div className={styles.recipeInfo}>
        <div className={styles.inputTitleWrapper}>
          <input
            type="text"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            placeholder="The name of the recipe"
            className={styles.inputTitle}
          />
          {formik.touched.title && formik.errors.title && (
            <div className={styles.inputError}>{formik.errors.title}</div>
          )}
        </div>
        <div className={styles.descriptionWrapper}>
          <TextAreaField
            name="description"
            value={formik.values.description}
            onChange={handleDescriptionChange}
            onBlur={formik.handleBlur}
            maxLength={maxDescriptionLength}
            currentLength={descriptionLength}
            placeholder="Enter a description of the dish"
          />
        </div>
        <div className={styles.categoryAndTimeWrapper}>
          <div className={styles.selectCategoryWrapper}>
            <h3 className={styles.categoryTitle}>Category</h3>
            <div className={styles.selectCategory}>
              <SelectField
                name="category"
                options={categoryOptions}
                value={formik.values.category}
                onChange={(val) => formik.setFieldValue('category', val)}
                onBlur={() => formik.setFieldTouched('category', true)}
                placeholder="Select a category"
              />
            </div>
          </div>
          <div className={styles.timeInputWrapper}>
            <h3 className={styles.timeTitle}>Cooking Time</h3>
            <div className={styles.timeInput}>
              <TimeInputField
                name="time"
                value={formik.values.time}
                onChange={(newValue) => formik.setFieldValue('time', newValue)}
              />
            </div>
          </div>
        </div>
        <div className={styles.selectAreaWrapper}>
          <h3 className={styles.areaTitle}>Area</h3>
          <div className={styles.selectArea}>
            <SelectField
              name="area"
              options={areaOptions}
              value={formik.values.area}
              onChange={(val) => formik.setFieldValue('area', val)}
              onBlur={() => formik.setFieldTouched('area', true)}
              placeholder="Area"
            />
          </div>
        </div>
        <div className={styles.ingredientsWrapper}>
          <h3 className={styles.ingredientsTitle}>Ingredients</h3>
          <div className={styles.ingredientFieldset}>
            <SelectField
              name="currentIngredient"
              options={ingredientsOptions}
              value={currentIngredient}
              onChange={(val) => setCurrentIngredient(val)}
              placeholder="Add the ingredient"
            />
            <input
              type="text"
              name="currentQuantity"
              placeholder="Enter quantity"
              value={currentQuantity}
              onChange={(e) => setCurrentQuantity(e.target.value)}
              className={styles.quantityInput}
            />
          </div>
          <Button
            variant="outlined"
            onClick={handleAddIngredient}
            className={styles.addIngredientButton}>
            <span>Add ingredient</span>
            <IconPlus className={styles.addIngredientIcon} />
          </Button>
        </div>
        {formik.values.ingredients.length > 0 && (
          <PickedIngredientsList
            pickedIngredients={formik.values.ingredients}
            ingredientsOptions={ingredientsOptions}
            handleRemoveIngredient={handleRemoveIngredient}
          />
        )}
        <div className={styles.recipePreparationWrapper}>
          <h3 className={styles.preparationTitle}>Recipe preparation</h3>
          <TextAreaField
            name="instructions"
            value={formik.values.instructions}
            onChange={handleInstructionsChange}
            onBlur={formik.handleBlur}
            maxLength={maxInstructionsLength}
            currentLength={instructionsLength}
            placeholder="Enter recipe"
          />
        </div>
        <div className={styles.buttonsBlock}>
          <Button
            type="reset"
            variant="outlined"
            className={styles.resetButton}
            onClick={formik.handleReset}>
            <IconTrash className={styles.trashIcon} />
          </Button>
          <Button type="submit" className={styles.submitButton}>
            Publish
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddRecipeForm;
