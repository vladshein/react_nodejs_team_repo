import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from './constants';
import { userService } from '../../services/userService';

const fetchUser = createAsyncThunk(userActions.FETCH_USER, async (userId, { rejectWithValue }) => {
  try {
    const data = await userService.fetchUser(userId);
    return data;
  } catch (error) {
    return rejectWithValue({
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
  }
});

const current = createAsyncThunk(userActions.FETCH_CURRENT_USER, async (_, { rejectWithValue }) => {
  try {
    const { data } = await userService.current();
    return data;
  } catch (error) {
    return rejectWithValue({
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
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
      const { data } = await userService.fetchFollowers();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchFollowing = createAsyncThunk(
  userActions.FETCH_FOLLOWING,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userService.fetchFollowing();
      return data;
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

export {
  current,
  fetchUser,
  updateAvatar,
  fetchFollowers,
  fetchFollowing,
  followUser,
  unfollowUser,
};
