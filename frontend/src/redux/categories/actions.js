import { createAsyncThunk } from '@reduxjs/toolkit';
import { categoriesService } from '../../services/categoriesService';
import { categoriesActions } from './constants';

const fetchCategories = createAsyncThunk(
  categoriesActions.FETCH_CATEGORIES,
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoriesService.fetchCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { fetchCategories };
