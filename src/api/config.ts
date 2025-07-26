const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Project endpoints
  PROJECTS: `${API_BASE_URL}/projects`,
  PROJECT_BY_ID: (id: string) => `${API_BASE_URL}/projects/${id}`,
  FEATURED_PROJECTS: `${API_BASE_URL}/projects/featured`,
  
  // Skill endpoints
  SKILLS: `${API_BASE_URL}/skills`,
  SKILL_BY_ID: (id: string) => `${API_BASE_URL}/skills/${id}`,
  SKILL_CATEGORIES: `${API_BASE_URL}/skills/categories`,
  SKILLS_BY_CATEGORY: (category: string) => `${API_BASE_URL}/skills/categories/${category}`,
  
  // Contact endpoints
  CONTACT: `${API_BASE_URL}/contact`,
  CONTACT_STATS: `${API_BASE_URL}/contact/stats`,
  CONTACT_BY_ID: (id: string) => `${API_BASE_URL}/contact/${id}`,
  CONTACT_STATUS: (id: string) => `${API_BASE_URL}/contact/${id}/status`,
  
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh-token`,
    ME: `${API_BASE_URL}/auth/me`,
  },
};

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const AUTH_HEADER = 'Authorization';

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
};

export const API_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_DELAY: 1000, // 1 second
  MAX_RETRIES: 3,
};
