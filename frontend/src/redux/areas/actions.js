import { createAsyncThunk } from '@reduxjs/toolkit';
import { areaService } from '../../services/areaService';
import { areasActions } from './constants';

const fetchAreas = createAsyncThunk(areasActions.FETCH_AREAS, async (_, { rejectWithValue }) => {
  try {
    const response = await areaService.fetchAreas();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export { fetchAreas };
