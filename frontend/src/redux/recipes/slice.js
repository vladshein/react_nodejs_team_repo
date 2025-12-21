import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchRecipes,
  fetchRecipeDetails,
  fetchTopRecipes,
  fetchMyRecipes,
  fetchUserRecipes,
  publishRecipe,
  deleteRecipe,
  fetchFavoriteRecipes,
  addToFavorites,
  removeFromFavorites,
} from './actions';
import { logout } from '../auth/actions';

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const initialState = {
  allRecipes: [],
  myRecipes: [],
  userRecipes: [],
  favorites: [],
  topRecipes: [],
  selectedRecipe: null,
  isLoading: false,
  error: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allRecipes = action.payload; //recipes + pagination
      })
      .addCase(fetchRecipeDetails.pending, handlePending)
      .addCase(fetchTopRecipes.pending, handlePending)

      .addCase(fetchMyRecipes.pending, handlePending)
      .addCase(fetchMyRecipes.fulfilled, (state, action) => {
        state.myRecipes = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchUserRecipes.pending, handlePending)
      .addCase(fetchUserRecipes.fulfilled, (state, action) => {
        state.userRecipes = action.payload;
        state.isLoading = false;
      })
      .addCase(publishRecipe.pending, handlePending)
      .addCase(deleteRecipe.pending, handlePending)

      .addCase(fetchFavoriteRecipes.pending, handlePending)
      .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
        state.favorites = action.payload; //recipes + pagination
        state.isLoading = false;
      })

      .addCase(addToFavorites.pending, handlePending)
      .addCase(removeFromFavorites.pending, handlePending)
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        const removedId = action.meta.arg;
        state.favorites = state.favorites.filter((recipe) => {
          const currentId = String(recipe.id || recipe._id);
          const targetId = String(removedId);
          return currentId !== targetId;
        });
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {})
      .addCase(fetchTopRecipes.fulfilled, (state, action) => {})
      .addCase(publishRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myRecipes.push(action.payload);
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {})

      .addCase(addToFavorites.fulfilled, (state, action) => {})
      .addCase(logout.fulfilled, (state) => {
        state.allRecipes = [];
        state.myRecipes = [];
        state.favorites = [];
        state.topRecipes = [];
        state.selectedRecipe = null;
      })
      .addMatcher(
        isAnyOf(
          fetchRecipes.rejected,
          fetchRecipeDetails.rejected,
          fetchTopRecipes.rejected,
          fetchMyRecipes.rejected,
          publishRecipe.rejected,
          deleteRecipe.rejected,
          fetchFavoriteRecipes.rejected,
          addToFavorites.rejected,
          removeFromFavorites.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  },
});

export const recipesReducer = recipesSlice.reducer;
