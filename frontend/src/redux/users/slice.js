import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchUser,
  updateAvatar,
  fetchFollowers,
  fetchFollowing,
  followUser,
  unfollowUser,
} from './actions';

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const initialState = {
  currentUser: null, // logged-in user for updating avatar
  selectedUser: null, //other user profile that you view
  followers: [],
  following: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, handlePending)
      .addCase(updateAvatar.pending, handlePending)
      .addCase(fetchFollowers.pending, handlePending)
      .addCase(fetchFollowing.pending, handlePending)
      .addCase(followUser.pending, handlePending)
      .addCase(unfollowUser.pending, handlePending)
      .addCase(fetchUser.fulfilled, (state, action) => {})
      .addCase(updateAvatar.fulfilled, (state, action) => {})
      .addCase(fetchFollowers.fulfilled, (state, action) => {})
      .addCase(fetchFollowing.fulfilled, (state, action) => {})
      .addCase(followUser.fulfilled, (state, action) => {})
      .addCase(unfollowUser.fulfilled, (state, action) => {})
      .addMatcher(
        isAnyOf(
          fetchUser.rejected,
          updateAvatar.rejected,
          fetchFollowers.rejected,
          fetchFollowing.rejected,
          followUser.rejected,
          unfollowUser.rejected
        ),
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

export const usersReducer = usersSlice.reducer;
