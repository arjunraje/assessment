import axios, {type AxiosResponse } from 'axios';
import type { AuthResponse, LoginFormData } from '../types/auth';
import type { Product, ProductResponse } from '../types/product';



const baseURL = 'http://localhost:4000'

const api = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Refresh token queue management
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: any) => void; reject: (error?: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Token validation helper
const validateToken = (token: string): boolean => {
  try {
    // Basic JWT structure validation (3 parts separated by dots)
    return token.split('.').length === 3;
  } catch {
    return false;
  }
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && validateToken(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (token && !validateToken(token)) {
      console.warn('Invalid token format detected, removing from storage');
      localStorage.removeItem('accessToken');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if it's a 401 error and not already retried and not a refresh request
    if (error.response?.status === 401 && 
        !originalRequest._retry &&
        !originalRequest.url?.includes('/auth/refresh')) {
      
      // If already refreshing, add to queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Use the same api instance for consistency
        const response = await api.post('/api/v1/auth/refresh', {}, { withCredentials: true });
        const { accessToken } = response.data;

        // Validate the new token
        if (!accessToken) {
          throw new Error('No access token received from refresh endpoint');
        }

        if (!validateToken(accessToken)) {
          throw new Error('Invalid token format received from refresh endpoint');
        }

        // Store the new token
        localStorage.setItem('accessToken', accessToken);

        // Process queued requests with new token
        processQueue(null, accessToken);

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);

      } catch (refreshError: any) {
        // Handle different types of refresh errors
        const status = refreshError.response?.status;
        
        if (status === 401 || status === 403) {
          console.log('Refresh token expired or invalid, redirecting to login');
        } else if (status >= 500) {
          console.log('Server error during token refresh:', refreshError.message);
        } else if (refreshError.message?.includes('Network Error')) {
          console.log('Network error during token refresh');
        } else {
          console.log('Error during token refresh:', refreshError.message);
        }

        // Clear queue and redirect to login
        processQueue(refreshError, null);
        localStorage.removeItem('accessToken');
        
        // Only redirect if we're not already on login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/admin/login';
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // For other errors, check if it's an authentication-related issue
    if (error.response?.status === 401 || error.response?.status === 403) {
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/login')) {
        localStorage.removeItem('accessToken');
        window.location.href = '/admin/login';
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data: LoginFormData): Promise<AxiosResponse<AuthResponse>> =>
    api.post('auth/login', data),
  refreshToken: (): Promise<AxiosResponse<{ accessToken: string }>> =>
    api.post('/api/v1/auth/refresh', {}, { withCredentials: true }),
};

export const productApi={
  getProducts: (): Promise<AxiosResponse<ProductResponse>> =>
    api.get('/product/getAllProduct'),

  creareProduct:(formData:any)=>
    api.post('/product/createProduct',formData)

}

export const saleApi={
  createSale:(formData:any)=>
    api.post('/sale/createSale',formData)
}

export const purchaseApi={
  createPurchase:(formData:any)=>
    api.post('/purchase/createPurchase',formData)
}

// Utility function to clear auth state
export const clearAuthState = (): void => {
  localStorage.removeItem('accessToken');
  isRefreshing = false;
  failedQueue = [];
};

// Utility function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('accessToken');
  return !!(token && validateToken(token));
};

export default api;