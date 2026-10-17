const API_BASE = '/api';

export const getAuthToken = () => localStorage.getItem('lazfort_token');
export const setAuthToken = (token) => localStorage.setItem('lazfort_token', token);
export const removeAuthToken = () => localStorage.removeItem('lazfort_token');

export const getStoredUser = () => {
  const data = localStorage.getItem('lazfort_user');
  try {
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};
export const setStoredUser = (user) => localStorage.setItem('lazfort_user', JSON.stringify(user));
export const removeStoredUser = () => localStorage.removeItem('lazfort_user');

async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  const config = {
    ...options,
    headers
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await res.json();

    if (!res.ok) {
      if (res.status === 401 && !endpoint.includes('/login')) {
        removeAuthToken();
        removeStoredUser();
        window.dispatchEvent(new Event('auth-expired'));
      }
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (err) {
    throw err;
  }
}

export const api = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (endpoint, body) => request(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' })
};
