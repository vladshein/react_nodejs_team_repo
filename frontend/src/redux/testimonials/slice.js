import { createSlice } from '@reduxjs/toolkit';
import { fetchTestimonials } from './actions';

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const initialState = {
  testimonials: [],
  isLoading: false,
  error: null,
};

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, handlePending)
      .addCase(fetchTestimonials.fulfilled, (state, action) => {})
      .addCase(fetchTestimonials.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const testimonialsReducer = testimonialsSlice.reducer;
