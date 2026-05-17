import { api } from './axios';
import type { ApiSuccessResponse } from '../types/api.types';
import type {
  CreateLeadPayload,
  Lead,
  LeadFilters,
  ListLeadsResponse,
  UpdateLeadPayload,
} from '../features/leads/leads.types';

export const getLeadsRequest = async (filters: LeadFilters) => {
  const { data } = await api.get<ApiSuccessResponse<ListLeadsResponse>>('/leads', {
    params: filters,
  });
  return data.data;
};

export const getLeadByIdRequest = async (leadId: string) => {
  const { data } = await api.get<ApiSuccessResponse<Lead>>(`/leads/${leadId}`);
  return data.data;
};

export const createLeadRequest = async (payload: CreateLeadPayload) => {
  const { data } = await api.post<ApiSuccessResponse<Lead>>('/leads', payload);
  return data.data;
};

export const updateLeadRequest = async (leadId: string, payload: UpdateLeadPayload) => {
  const { data } = await api.patch<ApiSuccessResponse<Lead>>(`/leads/${leadId}`, payload);
  return data.data;
};

export const deleteLeadRequest = async (leadId: string) => {
  const { data } = await api.delete<ApiSuccessResponse<Lead>>(`/leads/${leadId}`);
  return data.data;
};

export const exportLeadsCsvRequest = async (filters: Omit<LeadFilters, 'page'>) => {
  const response = await api.get('/leads/export/csv', {
    params: filters,
    responseType: 'blob',
  });

  return response.data as Blob;
};