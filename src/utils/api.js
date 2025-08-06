import axios from 'axios';
import { refreshToken } from '../services/authService';
import { removeTokens } from './auth';

const API_ROOT = import.meta.env.VITE_APP_ROOT_API;

const api = axios.create({
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // 401 (Unauthorized) 
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshTokenValue = localStorage.getItem('refreshToken');
        
        if (!refreshTokenValue) {
          removeTokens();
          window.location.href = '/login';
          return Promise.reject(error);
        }
        
        const response = await refreshToken(refreshTokenValue);
        
        localStorage.setItem('accessToken', response.data.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem('refreshToken', response.data.refreshToken);
        }
        
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        
        removeTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;