import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG, API_ENDPOINTS, AUTH_HEADER, DEFAULT_HEADERS, STORAGE_KEYS } from '../config';

class ApiService {
  private api: AxiosInstance;
  private retryCount = 0;

  constructor() {
    this.api = axios.create({
      baseURL: '', // We're using full URLs from API_ENDPOINTS
      headers: { ...DEFAULT_HEADERS },
      timeout: API_CONFIG.TIMEOUT,
      withCredentials: true, // For cookies if using httpOnly tokens
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add auth token to requests if it exists
        const token = this.getAuthToken();
        if (token) {
          config.headers[AUTH_HEADER] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        // If the error is due to an expired token, try to refresh it
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          this.retryCount < API_CONFIG.MAX_RETRIES
        ) {
          originalRequest._retry = true;
          this.retryCount++;

          try {
            // Try to refresh the token
            const newToken = await this.refreshToken();
            if (newToken) {
              // Update the Authorization header
              originalRequest.headers[AUTH_HEADER] = `Bearer ${newToken}`;
              // Retry the original request
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            // If refresh fails, log the user out
            this.clearAuth();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        // Handle other errors
        return Promise.reject(this.handleError(error));
      }
    );
  }

  // Auth token management
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    }
    return null;
  }

  private setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    }
  }

  private clearAuth(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }

  private async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
      const { token } = response.data;
      
      if (token) {
        this.setAuthToken(token);
        return token;
      }
      return null;
    } catch (error) {
      this.clearAuth();
      throw error;
    }
  }

  // Error handling
  private handleError(error: AxiosError): Error {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response;
      const message = (data as any)?.message || 'An error occurred';
      
      const errorWithStatus = new Error(message) as any;
      errorWithStatus.status = status;
      errorWithStatus.data = data;
      
      return errorWithStatus;
    } else if (error.request) {
      // The request was made but no response was received
      return new Error('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      return new Error(error.message || 'An error occurred');
    }
  }

  // HTTP Methods
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.patch(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url, config);
    return response.data;
  }

  // File upload helper
  public async uploadFile<T>(
    url: string,
    file: File,
    fieldName = 'file',
    additionalData: Record<string, any> = {},
    onUploadProgress?: (progressEvent: ProgressEvent) => void
  ): Promise<T> {
    const formData = new FormData();
    formData.append(fieldName, file);

    // Append additional data if provided
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    if (onUploadProgress) {
      config.onUploadProgress = onUploadProgress;
    }

    return this.post<T>(url, formData, config);
  }

  // Set authentication
  public setAuth(token: string, refreshToken: string, user: any): void {
    this.setAuthToken(token);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  }

  // Check if user is authenticated
  public isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  // Logout
  public async logout(): Promise<void> {
    try {
      await this.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      this.clearAuth();
    }
  }
}

export const apiService = new ApiService();
