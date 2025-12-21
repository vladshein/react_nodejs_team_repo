import api from './api';

export const recipesService = {
  fetchRecipes: async (params) => {
    const response = await api.get('/recipes', { params });
    return response.data;
  },

  addRecipe: async (recipeData) => {
    const response = await api.post('/recipes', recipeData);
    return response.data;
  },

  getMyRecipes: async () => await api.get('/recipes/my'),
  getUserRecipes: async (userId) => await api.get(`/recipes/userrecipes/${userId}`),
  getRecipesFavorites: async () => await api.get('/recipes/favorites'),
  removeFromFavorites: async (recipeId) => await api.delete(`/recipes/favorites/${recipeId}`),
};
