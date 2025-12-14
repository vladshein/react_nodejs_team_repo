import { createAsyncThunk } from '@reduxjs/toolkit';
import { areasActions } from './constants';

const fetchAreas = createAsyncThunk(areasActions.FETCH_AREAS, async (_, { rejectWithValue }) => {
  try {
    // api call to fetch areas
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export { fetchAreas };
