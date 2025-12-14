import { createAsyncThunk } from '@reduxjs/toolkit';
import { categoriesActions } from './constants';

const fetchCategories = createAsyncThunk(
  categoriesActions.FETCH_CATEGORIES,
  async (_, { rejectWithValue }) => {
    try {
      // api call to fetch categories
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { fetchCategories };
