import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { userActions } from './constants';
import { userService } from '../../services/userService';

const BASE_URL = import.meta.env.VITE_API_URL;

const fetchUser = createAsyncThunk(userActions.FETCH_USER, async (userId, { rejectWithValue }) => {
  try {
    const { data } = await userService.fetchUser(userId);
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
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const { data } = await userService.updateAvatar(formData);

      toast.success('Avatar updated successfully!');
      return data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      toast.error(errorMsg);
      return rejectWithValue(error.message);
    }
  }
);

const fetchFollowers = createAsyncThunk(
  userActions.FETCH_FOLLOWERS,
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await userService.fetchFollowers(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchFollowing = createAsyncThunk(
  userActions.FETCH_FOLLOWING,
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await userService.fetchFollowing(userId);
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
      const { data } = await userService.followUser(userIdToFollow);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const unfollowUser = createAsyncThunk(
  userActions.UNFOLLOW_USER,
  async (userIdToUnfollow, { rejectWithValue }) => {
    try {
      const { data } = await userService.unfollowUser(userIdToUnfollow);
      return data;
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
