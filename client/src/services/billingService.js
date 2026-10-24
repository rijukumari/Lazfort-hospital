import apiClient from './apiClient';

export const billingService = {
  getInvoices: (status = '', options = {}) => {
    const url = `/billing/invoices${status ? `?status=${encodeURIComponent(status)}` : ''}`;
    return apiClient.get(url, { ttl: 15000, ...options });
  },

  getInvoiceById: (invoiceId, options = {}) => {
    return apiClient.get(`/billing/invoices/${invoiceId}`, options);
  },

  createInvoice: (invoiceData) => {
    return apiClient.post('/billing/invoices', invoiceData);
  },

  recordPayment: (invoiceId, paymentData) => {
    return apiClient.post(`/billing/invoices/${invoiceId}/pay`, paymentData);
  },

  processRefund: (invoiceId, refundData) => {
    return apiClient.post(`/billing/invoices/${invoiceId}/refund`, refundData);
  }
};

export default billingService;
