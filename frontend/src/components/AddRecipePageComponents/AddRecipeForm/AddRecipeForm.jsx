import { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { PublishRecipeSchema } from '../../../validation/recipe';
import { publishRecipe } from '../../../redux/recipes/actions';
import { selectRecipesError } from '../../../redux/recipes/selectors';
import Button from '../../common/button/Button';
import SelectField from '../../common/SelectField/SelectField';
import TimeInputField from '../TimeInputField/TimeInputField';
import TextAreaField from '../TextAreaField/TextAreaField';
import UploadPhoto from '../UploadPhoto/UploadPhoto';
import IconPlus from '../../common/icons/IconPlus';
import IconTrash from '../../common/icons/IconTrash';
import PickedIngredientsList from '../PickedIngredientsList/PickedIngredientsList';
import styles from './AddRecipeForm.module.css';

const initialValues = {
  title: '',
  description: '',
  categoryId: '',
  time: 0,
  areaId: '',
  ingredients: [],
  instructions: '',
  thumb: '',
};

const AddRecipeForm = ({ categoriesOptions, ingredientsOptions, areasOptions }) => {
  const objectUrlRef = useRef(null);
  const [thumbPreview, setThumbPreview] = useState(null);
  const dispatch = useDispatch();
  const recipeErrorState = useSelector(selectRecipesError);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState('');

  useEffect(() => {
    if (recipeErrorState) {
      toast.error(recipeErrorState);
    }
  }, [recipeErrorState]);

  const formik = useFormik({
    initialValues,
    validationSchema: PublishRecipeSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('categoryId', values.categoryId);
      formData.append('time', String(values.time));
      formData.append('areaId', values.areaId);
      formData.append('instructions', values.instructions);

      if (values.thumb instanceof File) {
        formData.append('thumb', values.thumb);
      }

      formData.append('ingredients', JSON.stringify(values.ingredients));

      dispatch(publishRecipe(formData));
      formik.resetForm();
      setThumbPreview(null);
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    formik.setFieldValue('thumb', file);

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    const previewUrl = URL.createObjectURL(file);
    objectUrlRef.current = previewUrl;
    setThumbPreview(previewUrl);
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
      if (formik.values.ingredients.some((item) => item.id === currentIngredient)) {
        toast.error('This ingredient already added');
        return;
      }

      const selectedOption = ingredientsOptions.find((opt) => {
        return opt.value === currentIngredient;
      });
      const newIngredient = {
        id: selectedOption?.value,
        quantity: currentQuantity,
      };

      formik.setFieldValue('ingredients', [...formik.values.ingredients, newIngredient]);
      console.log('Picked', formik.values.ingredients);
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
          isError={formik.touched.thumb && formik.errors.thumb}
        />
        {formik.touched.thumb && formik.errors.thumb && (
          <div className={styles.errorMessage}>{formik.errors.thumb}</div>
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
            <div className={styles.errorMessage}>{formik.errors.title}</div>
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
            isError={formik.touched.description && formik.errors.description}
          />
          {formik.touched.description && formik.errors.description && (
            <div className={styles.errorMessage}>{formik.errors.description}</div>
          )}
        </div>
        <div className={styles.categoryAndTimeWrapper}>
          <div className={styles.selectCategoryWrapper}>
            <h3 className={styles.categoryTitle}>Category</h3>
            <div className={styles.selectCategory}>
              <SelectField
                name="categoryId"
                options={categoriesOptions}
                value={formik.values.categoryId}
                onChange={(val) => formik.setFieldValue('categoryId', val)}
                onBlur={() => formik.setFieldTouched('categoryId', true)}
                placeholder="Select a category"
              />
              {formik.touched.categoryId && formik.errors.categoryId && (
                <div className={styles.errorMessage}>{formik.errors.categoryId}</div>
              )}
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
              {formik.touched.time && formik.errors.time && (
                <div className={styles.errorMessage}>{formik.errors.time}</div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.selectAreaWrapper}>
          <h3 className={styles.areaTitle}>Area</h3>
          <div className={styles.selectArea}>
            <SelectField
              name="areaId"
              options={areasOptions}
              value={formik.values.areaId}
              onChange={(val) => formik.setFieldValue('areaId', val)}
              onBlur={() => formik.setFieldTouched('areaId', true)}
              placeholder="Area"
            />
            {formik.touched.areaId && formik.errors.areaId && (
              <div className={styles.errorMessage}>{formik.errors.areaId}</div>
            )}
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
              className={`${styles.quantityInput} ${formik.touched.ingredients && formik.errors.ingredients ? styles.quantityInputError : ''}`}
            />
          </div>
          {formik.touched.ingredients && formik.errors.ingredients && (
            <div className={styles.errorMessage}>{formik.errors.ingredients}</div>
          )}
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
            isError={formik.touched.instructions && formik.errors.instructions}
          />
          {formik.touched.instructions && formik.errors.instructions && (
            <div className={styles.errorMessage}>{formik.errors.instructions}</div>
          )}
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
