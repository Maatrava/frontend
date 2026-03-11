import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const babyAPI = {
  getAll: (motherId) => api.get('/baby', { params: { motherId } }),
  getById: (id) => api.get(`/baby/${id}`),
  create: (data) => api.post('/baby', data),
  update: (id, data) => api.put(`/baby/${id}`, data),
  delete: (id) => api.delete(`/baby/${id}`),
};

export const vaccinationAPI = {
  getByBabyId: (babyId) => api.get(`/vaccinations/baby/${babyId}`),
  create: (data) => api.post('/vaccinations', data),
  update: (id, data) => api.put(`/vaccinations/${id}`, data),
  delete: (id) => api.delete(`/vaccinations/${id}`),
};

export const growthAPI = {
  getByBabyId: (babyId) => api.get(`/growth/baby/${babyId}`),
  getChart: (babyId) => api.get(`/growth/chart/${babyId}`),
  create: (data) => api.post('/growth', data),
  update: (id, data) => api.put(`/growth/${id}`, data),
  delete: (id) => api.delete(`/growth/${id}`),
};

export const illnessAPI = {
  getByBabyId: (babyId) => api.get(`/illness/baby/${babyId}`),
  create: (data) => api.post('/illness', data),
  update: (id, data) => api.put(`/illness/${id}`, data),
  delete: (id) => api.delete(`/illness/${id}`),
};

export const medicationAPI = {
  getByBabyId: (babyId) => api.get(`/medication/baby/${babyId}`),
  create: (data) => api.post('/medication', data),
  update: (id, data) => api.put(`/medication/${id}`, data),
  delete: (id) => api.delete(`/medication/${id}`),
};

export default api;
