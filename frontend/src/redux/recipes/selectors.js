export const selectIsLoggedIn = (state) => state.recipes.isLoggedIn;

export const selectIsRefreshing = (state) => state.recipes.isRefreshing;

export const selectIsLoading = (state) => state.recipes.isLoading;

export const selectAllRecipes = (state) => state.recipes.allRecipes;
export const selectFavorites = (state) => state.recipes.favorites;

export const selectRecipesError = (state) => state.recipes.error;

export const selectMyRecipes = (state) => state.recipes.myRecipes;
