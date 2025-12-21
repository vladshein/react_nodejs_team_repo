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
import { addToFavorites, deleteRecipe, removeFromFavorites } from '../recipes/actions';

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const initialState = {
  currentUser: null, // logged-in user for updating avatar
  selectedUser: null, //other user profile that you view
  selectedUserFollowers: [],
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
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(updateAvatar.pending, handlePending)

      .addCase(fetchFollowers.pending, handlePending)
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg === 'current') {
          state.followers = action.payload;
        } else {
          state.selectedUserFollowers = action.payload;
        }
      })

      .addCase(fetchFollowing.pending, handlePending)
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.following = action.payload;
        state.loading = false;
      })
      .addCase(followUser.pending, handlePending)
      .addCase(followUser.fulfilled, (state, action) => {
        state.loading = false;
        state.following.push({ id: action.meta.arg });
        const currentCount = Number(state.currentUser.count_following) || 0;
        state.currentUser.count_following = currentCount > 0 ? currentCount + 1 : 1;

        if (state.selectedUser.id === action.meta.arg) {
          state.selectedUserFollowers.push(state.currentUser);
          const followersCount = Number(state.selectedUser.count_followers) || 0;
          state.selectedUser.count_followers = followersCount > 0 ? followersCount + 1 : 1;
        }
      })
      .addCase(unfollowUser.pending, handlePending)
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.loading = false;
        const unfollowedId = action.meta.arg;

        state.following = state.following.filter(
          (user) => String(user.id) !== String(unfollowedId)
        );

        const currentCount = Number(state.currentUser.count_following) || 0;
        state.currentUser.count_following = currentCount > 0 ? currentCount - 1 : 0;

        if (state.selectedUser.id === unfollowedId) {
          state.selectedUserFollowers = state.selectedUserFollowers.filter(
            (user) => String(user.id) !== String(state.currentUser?.id)
          );
          const followersCount = Number(state.selectedUser.count_followers) || 0;
          state.selectedUser.count_followers = followersCount > 0 ? followersCount - 1 : 0;
        }
      })
      .addCase(current.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {})
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.currentUser.count_favorite_recipes = state.currentUser.count_favorite_recipes - 1;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.currentUser.count_favorite_recipes = state.currentUser.count_favorite_recipes + 1;
      })
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
        state.selectedUser = null;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.currentUser.count_user_recipes = state.currentUser.count_user_recipes - 1;
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
