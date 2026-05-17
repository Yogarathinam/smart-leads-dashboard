import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createLeadRequest,
  deleteLeadRequest,
  exportLeadsCsvRequest,
  getLeadByIdRequest,
  getLeadsRequest,
  updateLeadRequest,
} from '../../api/leads.api';
import type { CreateLeadPayload, LeadFilters, UpdateLeadPayload } from './leads.types';

export const useLeads = (filters: LeadFilters) => {
  return useQuery({
    queryKey: ['leads', filters],
    queryFn: () => getLeadsRequest(filters),
    placeholderData: (previousData) => previousData,
  });
};

export const useLead = (leadId: string) => {
  return useQuery({
    queryKey: ['lead', leadId],
    queryFn: () => getLeadByIdRequest(leadId),
    enabled: Boolean(leadId),
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateLeadPayload) => createLeadRequest(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
};

export const useUpdateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ leadId, payload }: { leadId: string; payload: UpdateLeadPayload }) =>
      updateLeadRequest(leadId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['leads'] });
      void queryClient.invalidateQueries({ queryKey: ['lead'] });
    },
  });
};

export const useDeleteLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (leadId: string) => deleteLeadRequest(leadId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
};

export const useExportLeadsCsv = () => {
  return useMutation({
    mutationFn: exportLeadsCsvRequest,
  });
};