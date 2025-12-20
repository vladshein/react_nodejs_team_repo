import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from './constants';
import api from './../../services/api';

const fetchUser = createAsyncThunk(userActions.FETCH_USER, async (userId, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/users/${userId}`);

    console.log('Fetched user profile:', data);
    return data;
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
      // const { data } = await api.get(`users/${id}/followers`);
      const { data } = await api.get(`users/followers`);
      console.log('redux fetchFollowers: ', data);
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
      // const { data } = await api.get(`users/${id}/following`);
      const { data } = await api.get(`users/following`);
      console.log('redux fetchFollowers: ', data);
      return data;
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
