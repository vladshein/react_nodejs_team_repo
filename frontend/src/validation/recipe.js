import * as Yup from 'yup';

export const PublishRecipeSchema = Yup.object().shape({
  thumb: Yup.mixed().required('Thumbnail image is required'),
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be 50 characters at most')
    .required('Title is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(200, 'Description must be 200 characters at most')
    .required('Description is required'),
  category: Yup.string().required('Category is required'),
  area: Yup.string().required('Area is required'),
  time: Yup.number().min(1, 'Cooking time must be at least 1 minute'),
  ingredients: Yup.array().min(1, 'At least one ingredient is required'),
  instructions: Yup.string()
    .min(20, 'Instructions must be at least 20 characters')
    .max(1000, 'Instructions must be 1000 characters at most')
    .required('Instructions are required'),
});
