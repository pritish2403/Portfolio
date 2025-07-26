import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { authService } from '../api/services/auth.service';
import config from '../config';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  async (config) => {
    // Add auth token to requests if it exists
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    
    // If the error is due to an expired token, try to refresh it
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const newToken = await authService.refreshToken();
        if (newToken) {
          // Update the Authorization header
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          // Retry the original request
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, log the user out
        await authService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Helper function to handle API errors
const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const serverError = error.response?.data;
    return {
      status: error.response?.status || 500,
      message: serverError?.message || error.message || 'An error occurred',
      errors: serverError?.errors,
    };
  }
  return {
    status: 500,
    message: error.message || 'An unexpected error occurred',
  };
};

// Wrapper functions for HTTP methods with consistent response format
export const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.get<T>(url, config);
      return { data: response.data };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  post: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post<T>(url, data, config);
      return { data: response.data };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  put: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.put<T>(url, data, config);
      return { data: response.data };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  patch: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.patch<T>(url, data, config);
      return { data: response.data };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.delete<T>(url, config);
      return { data: response.data };
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

// Type definitions for API responses
export interface ApiResponse<T> {
  data: T;
  status?: number;
  statusText?: string;
  headers?: any;
  config?: any;
  request?: any;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// Helper function to create query string from object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createQueryString = (params: Record<string, any>): string => {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((item) => queryParams.append(key, String(item)));
      } else {
        queryParams.append(key, String(value));
      }
    }
  });
  
  return queryParams.toString();
};

// File upload helper
export const uploadFile = async <T>(
  url: string,
  file: File,
  fieldName = 'file',
  additionalData: Record<string, any> = {},
  onUploadProgress?: (progressEvent: ProgressEvent) => void
): Promise<ApiResponse<T>> => {
  const formData = new FormData();
  formData.append(fieldName, file);

  // Append additional data if provided
  Object.entries(additionalData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  };

  return api.post<T>(url, formData, config);
};

export default api;
