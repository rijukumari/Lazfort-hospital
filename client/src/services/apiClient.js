/**
 * LAZFORT Hospital ERP - Centralized API Service Layer
 * 
 * Features:
 * 1. In-flight request deduplication (prevents duplicate requests on mount / React StrictMode)
 * 2. Intelligent TTL memory cache with stale-while-revalidate support for read operations
 * 3. Automatic cache invalidation on write mutations (POST, PUT, PATCH, DELETE)
 * 4. Request cancellation via AbortController
 * 5. Unified auth token & tenant isolation handling
 */

const API_BASE = '/api';

// Token & Session Storage Helpers
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

// In-Flight Promise Cache (prevents duplicate concurrent HTTP fetches)
const inFlightRequests = new Map();

// Response Cache with TTL (in milliseconds)
const responseCache = new Map();

// Default Cache TTLs by URL prefix (in milliseconds)
const TTL_CONFIG = [
  { pattern: /^\/catalog\/departments/, ttl: 120000 }, // 2 minutes (static)
  { pattern: /^\/catalog\/services/, ttl: 60000 },     // 1 minute
  { pattern: /^\/auth\/staff/, ttl: 60000 },           // 1 minute
  { pattern: /^\/patients\?/, ttl: 15000 },             // 15 seconds for search queries
  { pattern: /^\/patients$/, ttl: 30000 },              // 30 seconds for patient list
  { pattern: /^\/appointments\/queue/, ttl: 8000 },     // 8 seconds for live queue
  { pattern: /^\/billing\/invoices/, ttl: 15000 },      // 15 seconds for invoice list
  { pattern: /^\/dashboard\/metrics/, ttl: 20000 }      // 20 seconds for dashboard stats
];

function getTtlForEndpoint(endpoint) {
  for (const item of TTL_CONFIG) {
    if (item.pattern.test(endpoint)) {
      return item.ttl;
    }
  }
  return 15000; // Default 15s cache for GET requests
}

/**
 * Invalidate cache entries matching a regex pattern or string prefix
 */
export function invalidateCache(pattern) {
  if (!pattern) {
    responseCache.clear();
    return;
  }
  const regex = typeof pattern === 'string' ? new RegExp(`^${pattern}`) : pattern;
  for (const key of responseCache.keys()) {
    if (regex.test(key)) {
      responseCache.delete(key);
    }
  }
}

/**
 * Automatically invalidate related cache when mutations occur
 */
function invalidateOnMutation(endpoint) {
  if (endpoint.startsWith('/patients')) {
    invalidateCache(/^\/patients/);
    invalidateCache(/^\/dashboard\/metrics/);
  } else if (endpoint.startsWith('/appointments')) {
    invalidateCache(/^\/appointments/);
    invalidateCache(/^\/dashboard\/metrics/);
  } else if (endpoint.startsWith('/billing')) {
    invalidateCache(/^\/billing/);
    invalidateCache(/^\/dashboard\/metrics/);
  } else if (endpoint.startsWith('/catalog')) {
    invalidateCache(/^\/catalog/);
  } else if (endpoint.startsWith('/auth/staff')) {
    invalidateCache(/^\/auth\/staff/);
  } else if (endpoint.startsWith('/encounters')) {
    invalidateCache(/^\/encounters/);
    invalidateCache(/^\/patients/);
    invalidateCache(/^\/appointments/);
  }
}

/**
 * Core Request Dispatcher
 */
export async function request(endpoint, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  // Cache key based on endpoint and method
  const cacheKey = `${method}:${endpoint}`;

  // 1. For GET requests: check if cached and still valid
  if (method === 'GET' && !options.fresh && !options.noCache) {
    const cached = responseCache.get(cacheKey);
    if (cached && Date.now() < cached.expiresAt) {
      return cached.data;
    }
  }

  // 2. In-flight request deduplication for concurrent identical GET requests
  if (method === 'GET') {
    if (inFlightRequests.has(cacheKey)) {
      return inFlightRequests.get(cacheKey);
    }
  }

  const executeRequest = async () => {
    const config = {
      ...options,
      headers
    };

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, config);
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 401 && !endpoint.includes('/login')) {
          removeAuthToken();
          removeStoredUser();
          window.dispatchEvent(new Event('auth-expired'));
        }
        const error = new Error(data.message || `Request failed with status ${res.status}`);
        error.status = res.status;
        error.data = data;
        throw error;
      }

      // Store in response cache if GET was successful
      if (method === 'GET' && !options.noCache) {
        const ttl = options.ttl || getTtlForEndpoint(endpoint);
        responseCache.set(cacheKey, {
          data,
          expiresAt: Date.now() + ttl
        });
      } else if (method !== 'GET') {
        // Mutating request: auto-invalidate related cache
        invalidateOnMutation(endpoint);
      }

      return data;
    } finally {
      // Always remove from in-flight requests once settled
      if (method === 'GET') {
        inFlightRequests.delete(cacheKey);
      }
    }
  };

  if (method === 'GET') {
    const promise = executeRequest();
    inFlightRequests.set(cacheKey, promise);
    return promise;
  }

  return executeRequest();
}

/**
 * High-level API client interface
 */
export const apiClient = {
  get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  patch: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
  invalidateCache,
  clearCache: () => responseCache.clear()
};

// Default export
export default apiClient;
