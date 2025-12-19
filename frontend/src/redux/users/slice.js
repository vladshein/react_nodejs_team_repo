import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  current,
  fetchUser,
  updateAvatar,
  fetchFollowers,
  fetchFollowing,
  followUser,
  unfollowUser,
} from './actions';
import { logout } from '../auth/actions';

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
      .addCase(current.pending, handlePending)
      .addCase(fetchUser.pending, handlePending)
      .addCase(updateAvatar.pending, handlePending)
      .addCase(fetchFollowers.pending, handlePending)
      .addCase(fetchFollowing.pending, handlePending)
      .addCase(followUser.pending, handlePending)
      .addCase(unfollowUser.pending, handlePending)
      .addCase(current.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {})
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.followers = action.payload;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.following = action.payload;
      })
      .addCase(followUser.fulfilled, (state, action) => {})
      .addCase(unfollowUser.fulfilled, (state, action) => {})
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
        state.selectedUser = null;
      })
      .addMatcher(
        isAnyOf(
          current.rejected,
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
