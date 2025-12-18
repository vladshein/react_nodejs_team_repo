import api from './api';

export const ingredientsService = {
  fetchIngredients: () => api.get('/ingredients'),
};
