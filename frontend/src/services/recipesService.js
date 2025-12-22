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

  deleteRecipe: async (recipeId) => await api.delete(`/recipes/${recipeId}`),

  getMyRecipes: async (limit, page) => await api.get('/recipes/my', { params: { limit, page } }),
  getUserRecipes: async (userId, limit, page) =>
    await api.get(`/recipes/userrecipes/${userId}`, { params: { limit, page } }),
  getRecipesFavorites: async () => await api.get('/recipes/favorites'),
  addToFavorites: async (recipeId) => await api.post(`/recipes/favorites/${recipeId}`),
  deleteFromFavorite: async (recipeId) => await api.delete(`/recipes/favorites/${recipeId}`),
  removeFromFavorites: async (recipeId) => await api.delete(`/recipes/favorites/${recipeId}`),
};
