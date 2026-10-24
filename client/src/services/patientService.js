import apiClient from './apiClient';

export const patientService = {
  getPatients: (query = '', options = {}) => {
    const url = `/patients${query ? `?query=${encodeURIComponent(query)}` : ''}`;
    return apiClient.get(url, options);
  },

  getPatientByUhid: (uhid, options = {}) => {
    return apiClient.get(`/patients/${uhid}`, options);
  },

  checkDuplicatePhone: (phone, options = {}) => {
    return apiClient.get(`/patients/check-duplicates?phone=${encodeURIComponent(phone)}`, {
      ttl: 30000,
      ...options
    });
  },

  registerPatient: (patientData) => {
    return apiClient.post('/patients', patientData);
  },

  updatePatient: (uhid, data) => {
    return apiClient.put(`/patients/${uhid}`, data);
  }
};

export default patientService;
