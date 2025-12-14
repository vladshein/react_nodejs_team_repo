import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from './actions';

const initialState = {
  ingredients: [],
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, handlePending)
      .addCase(fetchIngredients.fulfilled, (state, action) => {})
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;
