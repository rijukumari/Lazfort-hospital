import apiClient from '../../../services/apiClient';

export const superAdminApi = {
  // Telemetry & Metrics
  getSystemMetrics: () => {
    return apiClient.get('/dashboard/metrics', { ttl: 20000 });
  },

  // Audit Logs
  getAuditLogs: (page = 1, filter = '') => {
    const params = new URLSearchParams({ page });
    if (filter) params.append('action', filter);
    return apiClient.get(`/audit/logs?${params.toString()}`, { ttl: 15000 });
  },

  // Staff & Platform Users
  getPlatformUsers: () => {
    return apiClient.get('/auth/staff', { ttl: 60000 });
  }
};

export default superAdminApi;
