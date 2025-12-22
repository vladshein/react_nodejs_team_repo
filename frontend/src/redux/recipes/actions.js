import { createAsyncThunk } from '@reduxjs/toolkit';
import { recipesService } from '../../services/recipesService';
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
      const params = new URLSearchParams(filters);
      const { data } = await api.get('recipes', { params });
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
  async ({ limit, page }, { rejectWithValue }) => {
    try {
      const { data } = await recipesService.getMyRecipes(limit, page);
      return data;
      // api call to fetch user's own recipes
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchUserRecipes = createAsyncThunk(
  recipesActions.FETCH_USER_RECIPES,
  async ({ id, limit, page }, { rejectWithValue }) => {
    try {
      const { data } = await recipesService.getUserRecipes(id, limit, page);
      return data;
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
      const recipe = await recipesService.addRecipe(recipeData);
      return recipe;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const deleteRecipe = createAsyncThunk(
  recipesActions.DELETE_RECIPE,
  async (recipeId, { rejectWithValue }) => {
    try {
      // api call to delete recipe by recipeId
      const { data } = await recipesService.deleteRecipe(recipeId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchFavoriteRecipes = createAsyncThunk(
  recipesActions.FETCH_FAVORITES,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await recipesService.getRecipesFavorites();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * add favorites
 */
const addToFavorites = createAsyncThunk(
  recipesActions.ADD_TO_FAVORITES,
  async (recipeId, { rejectWithValue }) => {
    try {
      // put here
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * add favorites
 */
const handleFavorites = createAsyncThunk(
  recipesActions.ADD_TO_FAVORITES,
  async (obj, { rejectWithValue }) => {
    try {
      // {id: '6462a8f74c3d0ddd28897fbf', isFavorite: true}
      // isFavorite: true - recipe in favorites and we make delete
      // isFavorite: false - recipe not in favorites and we make add
      // console.log(obj);
      if (obj.isFavorite) {
        // isFavorite: true then remove from
        return await recipesService.deleteFromFavorite(obj.id);
      } else {
        // isFavorite: false then add to
        return await recipesService.addToFavorites(obj.id);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const removeFromFavorites = createAsyncThunk(
  recipesActions.REMOVE_FROM_FAVORITES,
  async (recipeId, { rejectWithValue }) => {
    try {
      const { data } = await recipesService.removeFromFavorites(recipeId);
      return data;
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
  fetchUserRecipes,
  publishRecipe,
  deleteRecipe,
  fetchFavoriteRecipes,
  addToFavorites,
  removeFromFavorites,
  handleFavorites,
};
