import { createAsyncThunk } from '@reduxjs/toolkit';
import { ingredientsService } from '../../services/ingredientsService';
import { ingredientsActions } from './constants';

const fetchIngredients = createAsyncThunk(
  ingredientsActions.FETCH_INGREDIENTS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await ingredientsService.fetchIngredients();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { fetchIngredients };
