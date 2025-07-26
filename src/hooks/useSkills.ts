import { useState, useEffect, useCallback } from 'react';
import { skillService } from '../api/services/skill.service';
import { ISkill, ISkillListResponse, SkillCategory } from '../api/interfaces/skill.interface';

interface UseSkillsProps {
  category?: SkillCategory;
  featuredOnly?: boolean;
  limit?: number;
}

export const useSkills = ({ 
  category, 
  featuredOnly = false, 
  limit 
}: UseSkillsProps = {}) => {
  const [skills, setSkills] = useState<Record<string, ISkill[]> | ISkill[]>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [categories, setCategories] = useState<SkillCategory[]>([]);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let skillsData: Record<string, ISkill[]> | ISkill[];
      
      if (category) {
        // Fetch skills for a specific category
        const response = await skillService.getSkillsByCategory(category);
        skillsData = response;
      } else if (featuredOnly) {
        // Fetch only featured skills
        const response = await skillService.getFeaturedSkills();
        skillsData = response;
      } else {
        // Fetch all skills grouped by category
        skillsData = await skillService.getSkillsGroupedByCategory();
      }

      // Apply limit if specified
      if (limit) {
        if (Array.isArray(skillsData)) {
          skillsData = skillsData.slice(0, limit);
        } else {
          const limited: Record<string, ISkill[]> = {};
          Object.entries(skillsData).forEach(([cat, skills]) => {
            limited[cat] = skills.slice(0, limit);
          });
          skillsData = limited;
        }
      }

      setSkills(skillsData);
    } catch (err) {
      console.error('Error fetching skills:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch skills'));
    } finally {
      setLoading(false);
    }
  }, [category, featuredOnly, limit]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await skillService.getCategories();
      setCategories(response);
    } catch (err) {
      console.error('Error fetching skill categories:', err);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchSkills();
    if (!category) {
      fetchCategories();
    }
  }, [fetchSkills, fetchCategories, category]);

  const refresh = useCallback(() => {
    return fetchSkills();
  }, [fetchSkills]);

  return {
    skills,
    categories,
    loading,
    error,
    refresh,
  };
};

export const useSkill = (id: string) => {
  const [skill, setSkill] = useState<ISkill | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSkill = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await skillService.getSkillById(id);
      setSkill(response);
    } catch (err) {
      console.error(`Error fetching skill ${id}:`, err);
      setError(err instanceof Error ? err : new Error('Failed to fetch skill'));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSkill();
  }, [fetchSkill]);

  return {
    skill,
    loading,
    error,
    refresh: fetchSkill,
  };
};
