import { useId, useState } from 'react';
import { useFormik } from 'formik';
import SelectField from '../../common/SelectField/SelectField';
import toast, { Toaster } from 'react-hot-toast';
import IconCamera from '../../common/icons/IconCamera';
import TimeInputField from '../TimeInputField/TimeInputField';
import Button from '../../common/button/Button';
import IconPlus from '../../common/icons/IconPlus';
import IconTrash from '../../common/icons/IconTrash';
import TextAreaField from '../TextAreaField/TextAreaField';
import styles from './AddRecipeForm.module.css';
import UploadPhoto from '../UploadPhoto/UploadPhoto';

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

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = formik.values.ingredients.filter((_, i) => i !== index);
    formik.setFieldValue('ingredients', updatedIngredients);
  };

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.photoUploadWrapper}>
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
      <div>
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

      <TextAreaField
        name="description"
        value={formik.values.description}
        onChange={handleDescriptionChange}
        onBlur={formik.handleBlur}
        maxLength={maxDescriptionLength}
        currentLength={descriptionLength}
        placeholder="Enter a description of the dish"
      />
      <h3 className={styles.categoryTitle}>Category</h3>
      <div className={styles.selectCategoryWrapper}>
        <SelectField
          name="category"
          options={categoryOptions}
          value={formik.values.category}
          onChange={(val) => formik.setFieldValue('category', val)}
          onBlur={() => formik.setFieldTouched('category', true)}
          placeholder="Select a category"
        />
      </div>
      <h3 className={styles.timeTitle}>Cooking Time</h3>
      <TimeInputField
        name="time"
        value={formik.values.time}
        onChange={(newValue) => formik.setFieldValue('time', newValue)}
      />
      <h3 className={styles.areaTitle}>Area</h3>
      <div className={styles.selectAreaWrapper}>
        <SelectField
          name="area"
          options={areaOptions}
          value={formik.values.area}
          onChange={(val) => formik.setFieldValue('area', val)}
          onBlur={() => formik.setFieldTouched('area', true)}
          placeholder="Area"
        />
      </div>
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
        <Button
          variant="outlined"
          onClick={handleAddIngredient}
          className={styles.addIngredientButton}>
          <span>Add ingredient</span>
          <IconPlus className={styles.addIngredientIcon} />
        </Button>
      </div>

      {formik.values.ingredients.length > 0 && (
        <div className={styles.ingredientsList}>
          <ul className={styles.ingredientsListItems}>
            {formik.values.ingredients.map((item) => (
              <li key={item.id} className={styles.ingredientItem}>
                <span>
                  {ingredientsOptions.find((opt) => opt.id === item.id)?.label || 'Unknown'} -{' '}
                  {item.quantity}
                </span>
                <Button
                  onClick={() => handleRemoveIngredient(item.id)}
                  className={styles.removeButton}
                  variant="outlined">
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

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
    </form>
  );
};

export default AddRecipeForm;
