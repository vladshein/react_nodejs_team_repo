import api from './api';

export const userService = {
  current: () => api.get('users/current'),
  fetchUser: (id) => api.get(`users/${id}`),
  updateAvatar: (avatarData) => api.put('users/current/avatar', avatarData),
  fetchFollowers: (userId) => api.get(`users/${userId}/followers`),
  fetchFollowing: (userId) => api.get(`users/${userId}/following`),
  followUser: (userId) => api.post(`following/${userId}`),
  unfollowUser: (userId) => api.delete(`following/${userId}`),
};
