import apiClient from './apiClient';

export const staffService = {
  getStaff: (options = {}) => {
    return apiClient.get('/auth/staff', { ttl: 60000, ...options });
  },

  getDoctors: async (options = {}) => {
    const res = await apiClient.get('/auth/staff', { ttl: 60000, ...options });
    if (res?.success && Array.isArray(res.staff)) {
      return res.staff.filter(s => s.role === 'doctor');
    }
    return [];
  }
};

export default staffService;
