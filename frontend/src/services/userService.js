import api from './api';

export const userService = {
  current: () => api.get('users/current'),
  fetchUser: (id) => api.get(`users/${id}`),
  updateAvatar: (formData) => api.patch('users/avatars', formData),
  fetchFollowers: (userId) => api.get(`users/${userId}/followers`),
  fetchFollowing: (userId) => api.get(`users/${userId}/following`),
};
