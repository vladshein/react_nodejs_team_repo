import { createSlice } from '@reduxjs/toolkit';
import { login, logout, refreshUser, register } from './actions';

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state) => {
  state.isLoading = false;
  state.error = true;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: '',
      email: '',
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
    error: false,
  },
  reducers: {
    clearAuth: (state) => {
      state.user = { name: '', email: '' };
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        console.log(payload);

        state.isLoading = false;
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(register.pending, handlePending)
      .addCase(register.rejected, handleRejected)
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.token = payload.token;
        state.user = payload.user;
        state.isLoggedIn = true;
      })
      .addCase(login.pending, handlePending)
      .addCase(login.rejected, handleRejected)
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.user = { name: '', email: '' };
        state.token = null;
      })
      .addCase(logout.pending, handlePending)
      .addCase(logout.rejected, handleRejected)
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.token = null;
        state.isLoggedIn = false;
      }),
});

export const { clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
