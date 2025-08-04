import axios from 'axios';
import { refreshToken } from '../services/authService';
import { removeTokens } from './auth';

const API_ROOT = import.meta.env.VITE_APP_ROOT_API;

// Tạo instance Axios với URL gốc
const api = axios.create({
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor cho requests - tự động đính kèm token
api.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('accessToken');
    
    // Nếu token tồn tại, thêm vào header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho responses - xử lý token hết hạn
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Nếu lỗi 401 (Unauthorized) và chưa thử refresh token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Lấy refresh token từ localStorage
        const refreshTokenValue = localStorage.getItem('refreshToken');
        
        if (!refreshTokenValue) {
          // Nếu không có refresh token, logout
          removeTokens();
          window.location.href = '/login';
          return Promise.reject(error);
        }
        
        // Gọi API refresh token
        const response = await refreshToken(refreshTokenValue);
        
        // Lưu token mới
        localStorage.setItem('accessToken', response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem('refreshToken', response.data.refreshToken);
        }
        
        // Cập nhật token trong header của request gốc
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        
        // Thử lại request gốc
        return api(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token thất bại, logout
        removeTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;