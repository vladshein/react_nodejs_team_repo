import { createSlice } from '@reduxjs/toolkit';
import { fetchAreas } from './actions';

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const initialState = {
  areas: [],
  isLoading: false,
  error: null,
};

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAreas.pending, handlePending)
      .addCase(fetchAreas.fulfilled, (state, action) => {})
      .addCase(fetchAreas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const areasReducer = areasSlice.reducer;
