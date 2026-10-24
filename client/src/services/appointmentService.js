import apiClient from './apiClient';

export const appointmentService = {
  getQueue: (doctorId = '', options = {}) => {
    const url = `/appointments/queue${doctorId ? `?doctorId=${encodeURIComponent(doctorId)}` : ''}`;
    return apiClient.get(url, { ttl: 8000, ...options });
  },

  bookAppointment: (bookingData) => {
    return apiClient.post('/appointments', bookingData);
  },

  updateStatus: (appointmentId, status) => {
    return apiClient.patch(`/appointments/${appointmentId}/status`, { status });
  }
};

export default appointmentService;
