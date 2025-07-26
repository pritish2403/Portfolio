import { ObjectId } from 'mongoose';

export type ContactStatus = 'new' | 'read' | 'replied' | 'archived';

export interface IContact {
  _id: string | ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  isSpam: boolean;
  metadata?: Record<string, any>;
  repliedAt?: Date | string | null;
  repliedBy?: string | ObjectId | null;
  replyMessage?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  __v?: number;
}

export interface IContactListResponse {
  data: {
    contacts: IContact[];
    pagination: {
      total: number;
      page: number;
      pages: number;
      limit: number;
    };
  };
}

export interface IContactResponse {
  data: {
    contact: IContact;
  };
}

export interface IContactStatsResponse {
  data: {
    stats: Array<{
      status: ContactStatus;
      count: number;
    }>;
    total: number;
  };
}

export interface IContactCreateInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  metadata?: Record<string, any>;
}

export interface IContactUpdateStatusInput {
  status: ContactStatus;
  replyMessage?: string;
}

export interface IContactFilterParams {
  status?: ContactStatus;
  search?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  page?: number;
  limit?: number;
  sort?: string;
  isSpam?: boolean;
}
