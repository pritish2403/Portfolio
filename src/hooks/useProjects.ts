import { useState, useEffect, useCallback } from 'react';
import { projectService } from '../api/services/project.service';
import { IProject, IProjectListResponse, IProjectResponse } from '../api/interfaces/project.interface';

interface UseProjectsProps {
  initialPage?: number;
  initialLimit?: number;
  featuredOnly?: boolean;
  tags?: string[];
  status?: 'completed' | 'in-progress' | 'planned' | 'on-hold';
}

export const useProjects = ({
  initialPage = 1,
  initialLimit = 10,
  featuredOnly = false,
  tags = [],
  status,
}: UseProjectsProps = {}) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);
  const [total, setTotal] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let response: IProjectListResponse;
      
      if (featuredOnly) {
        const featured = await projectService.getFeaturedProjects();
        setProjects(featured);
        setTotal(featured.length);
        setPages(1);
        setHasMore(false);
        return;
      }

      const params: any = {
        page,
        limit,
      };

      if (tags.length > 0) {
        params.tags = tags.join(',');
      }

      if (status) {
        params.status = status;
      }

      response = await projectService.getProjects(params);
      
      setProjects(prevProjects => 
        page === 1 ? response.data.projects : [...prevProjects, ...response.data.projects]
      );
      
      setTotal(response.data.pagination.total);
      setPages(response.data.pagination.pages);
      setHasMore(page < response.data.pagination.pages);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
    } finally {
      setLoading(false);
    }
  }, [page, limit, featuredOnly, tags, status]);

  // Initial fetch
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Reset to first page when filters change
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    } else {
      fetchProjects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags, status, limit]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  }, [hasMore, loading]);

  const refresh = useCallback(() => {
    setPage(1);
    return fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    page,
    setPage,
    limit,
    setLimit,
    total,
    pages,
    hasMore,
    loadMore,
    refresh,
  };
};

export const useProject = (id: string) => {
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProject = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response: IProjectResponse = await projectService.getProjectById(id);
      setProject(response.data.project);
    } catch (err) {
      console.error(`Error fetching project ${id}:`, err);
      setError(err instanceof Error ? err : new Error('Failed to fetch project'));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return {
    project,
    loading,
    error,
    refresh: fetchProject,
  };
};
