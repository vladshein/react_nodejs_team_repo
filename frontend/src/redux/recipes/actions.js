import { createAsyncThunk } from '@reduxjs/toolkit';
import { recipesActions } from './constants';
import api from './../../services/api';

/**
 * Search by creteria
 * - categoty
 * - ingredients
 * - area
 */
const fetchRecipes = createAsyncThunk(
  recipesActions.FETCH_RECIPES,
  async (filters, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(filters); // make a query
      const { data } = await api.get('/api/recipes', { params });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchRecipeDetails = createAsyncThunk(
  recipesActions.FETCH_RECIPE_DETAILS,
  async (recipeId, { rejectWithValue }) => {
    try {
      // api call to fetch recipe details by recipeId
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchTopRecipes = createAsyncThunk(
  recipesActions.FETCH_TOP_RECIPES,
  async (_, { rejectWithValue }) => {
    try {
      // api call to fetch top recipes
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchMyRecipes = createAsyncThunk(
  recipesActions.FETCH_MY_RECIPES,
  async (_, { rejectWithValue }) => {
    try {
      // api call to fetch user's own recipes
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const publishRecipe = createAsyncThunk(
  recipesActions.CREATE_RECIPE,
  async (recipeData, { rejectWithValue }) => {
    try {
      // api call to create a new recipe with recipeData
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const deleteRecipe = createAsyncThunk(
  recipesActions.DELETE_RECIPE,
  async (recipeId, { rejectWithValue }) => {
    try {
      // api call to delete recipe by recipeId
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchFavoriteRecipes = createAsyncThunk(
  recipesActions.FETCH_FAVORITES,
  async (_, { rejectWithValue }) => {
    try {
      // api call to fetch favorite recipes
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addToFavorites = createAsyncThunk(
  recipesActions.ADD_TO_FAVORITES,
  async (recipeId, { rejectWithValue }) => {
    try {
      // api call to add recipe to favorites by recipeId
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const removeFromFavorites = createAsyncThunk(
  recipesActions.REMOVE_FROM_FAVORITES,
  async (recipeId, { rejectWithValue }) => {
    try {
      // api call to remove recipe from favorites by recipeId
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export {
  fetchRecipes,
  fetchRecipeDetails,
  fetchTopRecipes,
  fetchMyRecipes,
  publishRecipe,
  deleteRecipe,
  fetchFavoriteRecipes,
  addToFavorites,
  removeFromFavorites,
};
