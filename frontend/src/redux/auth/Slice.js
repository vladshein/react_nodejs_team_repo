import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { signUp, signIn, getCurrentUser, logOut } from './actions';

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const initialState = {
  user: null,
  token: null, // тут не певен, токен же наче в юзері буде? змінювати можна і потрібно це лише шаблон)
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, handlePending)
      .addCase(signIn.pending, handlePending)
      .addCase(getCurrentUser.pending, handlePending)
      .addCase(logOut.pending, handlePending)
      .addCase(signUp.fulfilled, (state, action) => {})
      .addCase(signIn.fulfilled, (state, action) => {})
      .addCase(getCurrentUser.fulfilled, (state, action) => {})
      .addCase(logOut.fulfilled, (state, action) => {})
      .addMatcher(
        isAnyOf(signUp.rejected, signIn.rejected, getCurrentUser.rejected, logOut.rejected),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
