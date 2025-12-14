import { createAsyncThunk } from '@reduxjs/toolkit';
import { ingredientsActions } from './constants';

const fetchIngredients = createAsyncThunk(
  ingredientsActions.FETCH_INGREDIENTS,
  async (_, { rejectWithValue }) => {
    try {
      // api call to fetch ingredients
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { fetchIngredients };
