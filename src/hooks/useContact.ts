import { useState, useCallback } from 'react';
import { contactService } from '../api/services/contact.service';
import { IContact, IContactCreateInput } from '../api/interfaces/contact.interface';

export const useContactForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [submission, setSubmission] = useState<IContact | null>(null);

  const resetForm = useCallback(() => {
    setLoading(false);
    setSuccess(false);
    setError(null);
    setSubmission(null);
  }, []); 

  const submitContactForm = useCallback(async (formData: IContactCreateInput) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await contactService.submitContactForm(formData);
      setSubmission(response.data.contact);
      setSuccess(true);
      return { success: true, data: response.data.contact };
    } catch (err) {
      console.error('Error submitting contact form:', err);
      const errorMessage = err?.response?.data?.message || 'Failed to submit contact form. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    submitContactForm,
    loading,
    success,
    error,
    submission,
    resetForm,
  };
};

// Admin hooks
export const useContactSubmissions = (initialParams = {}) => {
  const [submissions, setSubmissions] = useState<IContact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [params, setParams] = useState(initialParams);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await contactService.getContactSubmissions({
        ...params,
        page: pagination.page,
        limit: pagination.limit,
      });

      setSubmissions(response.data.contacts);
      setPagination({
        page: response.data.pagination.page,
        limit: response.data.pagination.limit,
        total: response.data.pagination.total,
        pages: response.data.pagination.pages,
      });
    } catch (err) {
      console.error('Error fetching contact submissions:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch contact submissions'));
    } finally {
      setLoading(false);
    }
  }, [params, pagination.page, pagination.limit]);

  const updateParams = useCallback((newParams: any) => {
    setParams(prev => ({
      ...prev,
      ...newParams,
    }));
    // Reset to first page when filters change
    setPagination(prev => ({
      ...prev,
      page: 1,
    }));
  }, []);

  const changePage = useCallback((newPage: number) => {
    setPagination(prev => ({
      ...prev,
      page: newPage,
    }));
  }, []);

  const changeLimit = useCallback((newLimit: number) => {
    setPagination(prev => ({
      ...prev,
      limit: newLimit,
      page: 1, // Reset to first page when changing limit
    }));
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const refresh = useCallback(() => {
    return fetchSubmissions();
  }, [fetchSubmissions]);

  return {
    submissions,
    loading,
    error,
    refresh,
    params,
    updateParams,
    pagination,
    changePage,
    changeLimit,
  };
};

export const useContactStats = () => {
  const [stats, setStats] = useState<Array<{ status: string; count: number }>>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await contactService.getContactStats();
      setStats(response.stats);
      setTotal(response.total);
    } catch (err) {
      console.error('Error fetching contact stats:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch contact stats'));
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const refresh = useCallback(() => {
    return fetchStats();
  }, [fetchStats]);

  return {
    stats,
    total,
    loading,
    error,
    refresh,
  };
};
