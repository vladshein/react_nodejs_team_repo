import { createAsyncThunk } from '@reduxjs/toolkit';
import { authActions } from './constants';

const signUp = createAsyncThunk(authActions.SIGN_UP, async (data, { rejectWithValue }) => {
  try {
    // api call to sign up
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
const signIn = createAsyncThunk(authActions.SIGN_IN, async (data, { rejectWithValue }) => {
  try {
    // api call to sign in
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
const getCurrentUser = createAsyncThunk(
  authActions.CURRENT_USER,
  async (_, { rejectWithValue }) => {
    try {
      // api call to get current user
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const logOut = createAsyncThunk(authActions.LOG_OUT, async (_, { rejectWithValue }) => {
  try {
    // api call to log out
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export { signUp, signIn, getCurrentUser, logOut };
