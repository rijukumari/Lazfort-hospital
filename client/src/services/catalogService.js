import apiClient from './apiClient';

export const catalogService = {
  getServices: (category = '', search = '', options = {}) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiClient.get(`/catalog/services${queryString}`, { ttl: 60000, ...options });
  },

  getAllServices: (options = {}) => {
    return apiClient.get('/catalog/services?all=true', { ttl: 60000, ...options });
  },

  getDepartments: (options = {}) => {
    return apiClient.get('/catalog/departments', { ttl: 120000, ...options });
  },

  createService: (serviceData) => {
    return apiClient.post('/catalog/services', serviceData);
  },

  updateServiceStatus: (serviceCode, status) => {
    return apiClient.patch(`/catalog/services/${serviceCode}/status`, { status });
  }
};

export default catalogService;
