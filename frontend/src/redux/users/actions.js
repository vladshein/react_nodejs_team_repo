import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from './constants';

const fetchUser = createAsyncThunk(userActions.FETCH_USER, async (userId, { rejectWithValue }) => {
  try {
    // const response = await fetch(`/api/users/${userId}`);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const updateAvatar = createAsyncThunk(
  userActions.UPDATE_AVATAR,
  async (avatarData, { rejectWithValue }) => {
    try {
      // api call to update avatar
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchFollowers = createAsyncThunk(
  userActions.FETCH_FOLLOWERS,
  async (_, { rejectWithValue }) => {
    try {
      // api call to fetch followers
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchFollowing = createAsyncThunk(
  userActions.FETCH_FOLLOWING,
  async (_, { rejectWithValue }) => {
    try {
      // api call to fetch following
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const followUser = createAsyncThunk(
  userActions.FOLLOW_USER,
  async (userIdToFollow, { rejectWithValue }) => {
    try {
      // api call to follow user
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const unfollowUser = createAsyncThunk(
  userActions.UNFOLLOW_USER,
  async (userIdToUnfollow, { rejectWithValue }) => {
    try {
      // api call to unfollow user
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { fetchUser, updateAvatar, fetchFollowers, fetchFollowing, followUser, unfollowUser };
