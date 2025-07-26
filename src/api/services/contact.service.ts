import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config';
import { IContact } from '../interfaces/contact.interface';

interface GetContactSubmissionsParams {
  status?: 'new' | 'read' | 'replied' | 'archived';
  page?: number;
  limit?: number;
  sort?: string;
}

export const contactService = {
  /**
   * Submit a contact form
   */
  submitContactForm: async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<{ message: string; data: { contact: IContact } }> => {
    return apiService.post(API_ENDPOINTS.CONTACT, formData);
  },

  /**
   * Get all contact submissions (admin only)
   */
  getContactSubmissions: async (
    params?: GetContactSubmissionsParams
  ): Promise<{
    data: IContact[];
    pagination: {
      total: number;
      page: number;
      pages: number;
      limit: number;
    };
  }> => {
    return apiService.get(API_ENDPOINTS.CONTACT, { params });
  },

  /**
   * Get contact statistics (admin only)
   */
  getContactStats: async (): Promise<{
    stats: Array<{ status: string; count: number }>;
    total: number;
  }> => {
    return apiService.get(API_ENDPOINTS.CONTACT_STATS);
  },

  /**
   * Get a single contact submission by ID (admin only)
   */
  getContactSubmission: async (id: string): Promise<IContact> => {
    return apiService.get(API_ENDPOINTS.CONTACT_BY_ID(id));
  },

  /**
   * Update contact submission status (admin only)
   */
  updateContactStatus: async (
    id: string,
    status: 'new' | 'read' | 'replied' | 'archived'
  ): Promise<IContact> => {
    return apiService.patch(API_ENDPOINTS.CONTACT_STATUS(id), { status });
  },

  /**
   * Delete a contact submission (admin only)
   */
  deleteContactSubmission: async (id: string): Promise<void> => {
    await apiService.delete(API_ENDPOINTS.CONTACT_BY_ID(id));
  },

  /**
   * Mark a contact as read (admin only)
   */
  markAsRead: async (id: string): Promise<IContact> => {
    return contactService.updateContactStatus(id, 'read');
  },

  /**
   * Mark a contact as replied (admin only)
   */
  markAsReplied: async (id: string): Promise<IContact> => {
    return contactService.updateContactStatus(id, 'replied');
  },

  /**
   * Mark a contact as archived (admin only)
   */
  archive: async (id: string): Promise<IContact> => {
    return contactService.updateContactStatus(id, 'archived');
  },

  /**
   * Get unread contact count (admin only)
   */
  getUnreadCount: async (): Promise<number> => {
    const stats = await contactService.getContactStats();
    const unreadStat = stats.stats.find((stat) => stat.status === 'new');
    return unreadStat ? unreadStat.count : 0;
  },
};
