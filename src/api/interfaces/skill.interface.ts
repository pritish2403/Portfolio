import { IconType } from 'react-icons';

export type SkillCategory = 'frontend' | 'backend' | 'devops' | 'tools' | 'other';

export interface ISkill {
  _id: string;
  name: string;
  slug: string;
  category: SkillCategory;
  proficiency: number; // 1-100
  icon?: string | IconType;
  featured: boolean;
  order: number;
  description?: string;
  yearsOfExperience?: number;
  projectsUsedIn?: Array<{ id: string; name: string }>;
  relatedSkills?: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  __v?: number;
}

export interface ISkillListResponse {
  data: {
    skills: ISkill[];
    pagination: {
      total: number;
      page: number;
      pages: number;
      limit: number;
    };
  };
}

export interface ISkillResponse {
  data: {
    skill: ISkill;
  };
}

export interface ISkillByCategoryResponse {
  data: {
    category: string;
    skills: ISkill[];
  };
}

export interface ISkillCategoriesResponse {
  data: {
    categories: SkillCategory[];
  };
}

export interface ISkillCreateInput {
  name: string;
  category: SkillCategory;
  proficiency: number;
  icon?: string;
  featured?: boolean;
  order?: number;
  description?: string;
  yearsOfExperience?: number;
  relatedSkills?: string[];
}

export interface ISkillUpdateInput extends Partial<ISkillCreateInput> {
  id: string;
}

export interface ISkillWithIcon extends Omit<ISkill, 'icon'> {
  icon: IconType | string;
}
