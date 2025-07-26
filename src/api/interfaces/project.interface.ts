export interface ITechnology {
  name: string;
  version?: string;
  icon?: string;
}

export interface IProjectImage {
  url: string;
  alt: string;
  caption?: string;
  isPrimary?: boolean;
}

export interface IProjectLink {
  type: 'github' | 'demo' | 'documentation' | 'other';
  label: string;
  url: string;
}

export interface IProject {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  content: string;
  technologies: ITechnology[];
  images: IProjectImage[];
  links: IProjectLink[];
  featured: boolean;
  tags: string[];
  startDate?: Date | string;
  endDate?: Date | string | null;
  status: 'completed' | 'in-progress' | 'planned' | 'on-hold';
  repositoryUrl?: string;
  demoUrl?: string;
  documentationUrl?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  __v?: number;
}

export interface IProjectListResponse {
  data: {
    projects: IProject[];
    pagination: {
      total: number;
      page: number;
      pages: number;
      limit: number;
    };
  };
}

export interface IProjectResponse {
  data: {
    project: IProject;
  };
}

export interface IProjectCreateInput {
  title: string;
  description: string;
  shortDescription: string;
  content: string;
  technologies: Array<{ name: string; version?: string }>;
  featured?: boolean;
  tags?: string[];
  startDate?: Date | string;
  endDate?: Date | string | null;
  status?: 'completed' | 'in-progress' | 'planned' | 'on-hold';
  repositoryUrl?: string;
  demoUrl?: string;
  documentationUrl?: string;
}

export interface IProjectUpdateInput extends Partial<IProjectCreateInput> {
  id: string;
}
