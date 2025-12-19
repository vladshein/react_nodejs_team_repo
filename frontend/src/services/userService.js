import api from './api';

export const userService = {
  current: () => api.get('users/current'),
  fetchUser: (id) => api.get(`users/${id}`),
  updateAvatar: (avatarData) => api.put('users/current/avatar', avatarData),
  fetchFollowers: () => api.get('users/followers'),
  fetchFollowing: () => api.get('users/following'),
};
