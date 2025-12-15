import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import { authActions } from './constants';

export const register = createAsyncThunk(
  authActions.SIGN_UP,
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await authService.register(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const login = createAsyncThunk(authActions.SIGN_IN, async (userData, thunkAPI) => {
  try {
    const { data } = await authService.login(userData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const logout = createAsyncThunk(authActions.LOG_OUT, async (_, thunkAPI) => {
  try {
    await authService.logout();
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const refreshUser = createAsyncThunk(
  authActions.REFRESH_USER,
  async (_, thunkAPI) => {
    try {
      const { data } = await authService.refreshUser();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const token = state.auth.token;
      return token !== null;
    },
  }
);
