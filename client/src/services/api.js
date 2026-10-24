/**
 * Re-exporting unified apiClient and helpers for full backwards compatibility
 */
import apiClient, {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getStoredUser,
  setStoredUser,
  removeStoredUser,
  request,
  invalidateCache
} from './apiClient';

export {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getStoredUser,
  setStoredUser,
  removeStoredUser,
  request,
  invalidateCache,
  apiClient
};

export const api = apiClient;
export default api;
