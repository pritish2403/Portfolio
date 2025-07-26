import { apiService } from './api.service';
import { API_ENDPOINTS, STORAGE_KEYS } from '../config';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthResponse {
  token: string;
  refreshToken: string;
  user: IUser;
}

export const authService = {
  /**
   * Login with email and password
   */
  login: async (email: string, password: string): Promise<IAuthResponse> => {
    const response = await apiService.post<{ data: IAuthResponse }>(
      API_ENDPOINTS.AUTH.LOGIN,
      { email, password }
    );
    
    // Save tokens and user data
    const { token, refreshToken, user } = response.data;
    apiService.setAuth(token, refreshToken, user);
    
    return { token, refreshToken, user };
  },

  /**
   * Logout the current user
   */
  logout: async (): Promise<void> => {
    await apiService.logout();
  },

  /**
   * Get the current authenticated user
   */
  getCurrentUser: (): IUser | null => {
    if (typeof window === 'undefined') return null;
    
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr) as IUser;
    } catch (error) {
      console.error('Error parsing user data from localStorage', error);
      return null;
    }
  },

  /**
   * Check if the current user is authenticated
   */
  isAuthenticated: (): boolean => {
    return apiService.isAuthenticated();
  },

  /**
   * Check if the current user has admin role
   */
  isAdmin: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.role === 'admin';
  },

  /**
   * Get the authentication token
   */
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Get the refresh token
   */
  getRefreshToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  /**
   * Refresh the authentication token
   */
  refreshToken: async (): Promise<IAuthResponse | null> => {
    try {
      const refreshToken = authService.getRefreshToken();
      if (!refreshToken) return null;

      const response = await apiService.post<{ data: IAuthResponse }>(
        API_ENDPOINTS.AUTH.REFRESH,
        { refreshToken }
      );

      const { token, refreshToken: newRefreshToken, user } = response.data;
      apiService.setAuth(token, newRefreshToken, user);

      return { token, refreshToken: newRefreshToken, user };
    } catch (error) {
      console.error('Error refreshing token:', error);
      await authService.logout();
      return null;
    }
  },

  /**
   * Check if the current session is still valid
   */
  checkAuth: async (): Promise<boolean> => {
    if (!authService.isAuthenticated()) return false;

    try {
      // Try to get the current user to verify the token is still valid
      await apiService.get(API_ENDPOINTS.AUTH.ME);
      return true;
    } catch (error) {
      // If the token is invalid, try to refresh it
      if ((error as any)?.status === 401) {
        try {
          const refreshed = await authService.refreshToken();
          return !!refreshed;
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          await authService.logout();
          return false;
        }
      }
      return false;
    }
  },

  /**
   * Get the authorization header for API requests
   */
  getAuthHeader: (): { Authorization: string } | {} => {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};
