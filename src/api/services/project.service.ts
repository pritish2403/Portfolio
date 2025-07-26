import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config';
import { IProject, ITechnology } from '../interfaces/project.interface';

interface GetProjectsParams {
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string;
  [key: string]: any; // For other query params
}

export const projectService = {
  /**
   * Get all projects with optional filtering and pagination
   */
  getProjects: async (params?: GetProjectsParams): Promise<{
    data: IProject[];
    pagination: {
      total: number;
      page: number;
      pages: number;
      limit: number;
    };
  }> => {
    return apiService.get(API_ENDPOINTS.PROJECTS, { params });
  },

  /**
   * Get a single project by ID
   */
  getProjectById: async (id: string): Promise<IProject> => {
    return apiService.get(API_ENDPOINTS.PROJECT_BY_ID(id));
  },

  /**
   * Get featured projects
   */
  getFeaturedProjects: async (): Promise<IProject[]> => {
    const response = await apiService.get<{ data: { projects: IProject[] } }>(
      API_ENDPOINTS.FEATURED_PROJECTS
    );
    return response.data.projects;
  },

  /**
   * Create a new project (admin only)
   */
  createProject: async (projectData: {
    title: string;
    description: string;
    technologies: ITechnology[];
    imageUrl: string;
    demoUrl?: string;
    githubUrl?: string;
    featured?: boolean;
    tags?: string[];
  }): Promise<IProject> => {
    return apiService.post(API_ENDPOINTS.PROJECTS, projectData);
  },

  /**
   * Update a project (admin only)
   */
  updateProject: async (
    id: string,
    updateData: Partial<{
      title: string;
      description: string;
      technologies: ITechnology[];
      imageUrl: string;
      demoUrl: string | null;
      githubUrl: string | null;
      featured: boolean;
      tags: string[];
    }>
  ): Promise<IProject> => {
    return apiService.patch(API_ENDPOINTS.PROJECT_BY_ID(id), updateData);
  },

  /**
   * Delete a project (admin only)
   */
  deleteProject: async (id: string): Promise<void> => {
    await apiService.delete(API_ENDPOINTS.PROJECT_BY_ID(id));
  },

  /**
   * Search projects by query
   */
  searchProjects: async (query: string): Promise<IProject[]> => {
    const response = await apiService.get<{ data: { projects: IProject[] } }>(
      API_ENDPOINTS.PROJECTS,
      { params: { search: query } }
    );
    return response.data.projects;
  },

  /**
   * Get projects by tag
   */
  getProjectsByTag: async (tag: string): Promise<IProject[]> => {
    const response = await apiService.get<{ data: { projects: IProject[] } }>(
      API_ENDPOINTS.PROJECTS,
      { params: { tags: tag } }
    );
    return response.data.projects;
  },
};
