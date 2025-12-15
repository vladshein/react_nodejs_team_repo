import { useId, useState } from 'react';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { IconCamera } from '../../common/icons/IconCamera';
import style from './AddRecipeForm.module.css';

const initialValues = {
  title: '',
  description: '',
  category: '',
  time: '',
  area: '',
  ingredients: [],
  instructions: '',
  thumb: '',
};

const AddRecipeForm = () => {
  const [thumbPreview, setThumbPreview] = useState(null);

  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
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

  return (
    <form className={style.form} onSubmit={formik.handleSubmit}>
      <div className={style.photoUpload}>
        <input
          type="file"
          id="photo-upload"
          name="thumb"
          accept="image/*"
          onChange={handleFileChange}
          onBlur={formik.handleBlur}
          hidden
        />
        <label htmlFor="photo-upload" className={style.photoLabel}>
          {thumbPreview ? (
            <img src={thumbPreview} alt="Recipe thumbnail" className={style.previewImage} />
          ) : (
            <div>
              <IconCamera className={style.cameraIcon} />
              <span>Upload photo</span>
            </div>
          )}
        </label>
        {formik.touched.photo && formik.errors.photo && (
          <div className={style.error}>{formik.errors.photo}</div>
        )}
      </div>
    </form>
  );
};

export default AddRecipeForm;
