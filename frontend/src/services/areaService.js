import api from './api';

export const areaService = {
  fetchAreas: () => api.get('/areas'),
};
