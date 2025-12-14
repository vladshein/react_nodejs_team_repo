import { createAsyncThunk } from '@reduxjs/toolkit';
import { testimonialsActions } from './constants';

const fetchTestimonials = createAsyncThunk(
  testimonialsActions.FETCH_TESTIMONIALS,
  async (_, { rejectWithValue }) => {
    try {
      // api call to fetch testimonials
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { fetchTestimonials };
