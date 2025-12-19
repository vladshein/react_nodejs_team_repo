import api from './api';

export const categoriesService = {
  fetchCategories: () => api.get('/categories'),
};
