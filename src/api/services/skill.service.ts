import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config';
import { ISkill } from '../interfaces/skill.interface';

export const skillService = {
  /**
   * Get all skills, optionally filtered by category
   */
  getSkills: async (params?: {
    category?: 'frontend' | 'backend' | 'devops' | 'tools' | 'other';
    featured?: boolean;
  }): Promise<Record<string, ISkill[]>> => {
    const response = await apiService.get<{ data: { skills: Record<string, ISkill[]> } }>(
      API_ENDPOINTS.SKILLS,
      { params }
    );
    return response.data.skills;
  },

  /**
   * Get a single skill by ID
   */
  getSkillById: async (id: string): Promise<ISkill> => {
    return apiService.get(API_ENDPOINTS.SKILL_BY_ID(id));
  },

  /**
   * Get all skill categories
   */
  getCategories: async (): Promise<string[]> => {
    const response = await apiService.get<{ data: { categories: string[] } }>(
      API_ENDPOINTS.SKILL_CATEGORIES
    );
    return response.data.categories;
  },

  /**
   * Get skills by category
   */
  getSkillsByCategory: async (
    category: string
  ): Promise<ISkill[]> => {
    const response = await apiService.get<{ data: { skills: ISkill[] } }>(
      API_ENDPOINTS.SKILLS_BY_CATEGORY(category)
    );
    return response.data.skills;
  },

  /**
   * Create a new skill (admin only)
   */
  createSkill: async (skillData: {
    name: string;
    category: 'frontend' | 'backend' | 'devops' | 'tools' | 'other';
    proficiency: number;
    icon?: string;
    featured?: boolean;
    order?: number;
  }): Promise<ISkill> => {
    return apiService.post(API_ENDPOINTS.SKILLS, skillData);
  },

  /**
   * Update a skill (admin only)
   */
  updateSkill: async (
    id: string,
    updateData: {
      name?: string;
      category?: 'frontend' | 'backend' | 'devops' | 'tools' | 'other';
      proficiency?: number;
      icon?: string;
      featured?: boolean;
      order?: number;
    }
  ): Promise<ISkill> => {
    return apiService.patch(API_ENDPOINTS.SKILL_BY_ID(id), updateData);
  },

  /**
   * Delete a skill (admin only)
   */
  deleteSkill: async (id: string): Promise<void> => {
    await apiService.delete(API_ENDPOINTS.SKILL_BY_ID(id));
  },

  /**
   * Get skills grouped by category
   */
  getSkillsGroupedByCategory: async (): Promise<Record<string, ISkill[]>> => {
    const categories = await skillService.getCategories();
    const skillsByCategory: Record<string, ISkill[]> = {};
    
    await Promise.all(
      categories.map(async (category) => {
        const skills = await skillService.getSkillsByCategory(category);
        skillsByCategory[category] = skills;
      })
    );
    
    return skillsByCategory;
  },

  /**
   * Get featured skills
   */
  getFeaturedSkills: async (): Promise<ISkill[]> => {
    const allSkills = await skillService.getSkills({ featured: true });
    // Flatten the skills from all categories
    return Object.values(allSkills).flat();
  },
};
