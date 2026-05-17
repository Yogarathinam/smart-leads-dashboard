import type { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import {
  createLead,
  deleteLead,
  exportLeadsToCsv,
  getLeadById,
  listLeads,
  updateLead,
} from '../services/lead.service';
import type { CreateLeadBody, ListLeadsQuery, UpdateLeadBody } from '../validations/lead.validation';

export const createLeadController = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.userId) {
    throw new ApiError(401, 'Unauthorized');
  }

  const body = req.body as CreateLeadBody;
  const lead = await createLead(body, req.user.userId);

  return res.status(201).json(new ApiResponse('Lead created successfully', lead));
});

export const listLeadsController = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as unknown as ListLeadsQuery;
  const result = await listLeads(query);

  return res.status(200).json(new ApiResponse('Leads fetched successfully', result));
});

export const getLeadByIdController = asyncHandler(async (req: Request, res: Response) => {
  const leadId = String(req.params.id);
  const lead = await getLeadById(leadId);

  return res.status(200).json(new ApiResponse('Lead fetched successfully', lead));
});

export const updateLeadController = asyncHandler(async (req: Request, res: Response) => {
  const leadId = String(req.params.id);
  const body = req.body as UpdateLeadBody;
  const lead = await updateLead(leadId, body);

  return res.status(200).json(new ApiResponse('Lead updated successfully', lead));
});

export const deleteLeadController = asyncHandler(async (req: Request, res: Response) => {
  const leadId = String(req.params.id);
  const lead = await deleteLead(leadId);

  return res.status(200).json(new ApiResponse('Lead deleted successfully', lead));
});

export const exportLeadsController = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as unknown as ListLeadsQuery;
  await exportLeadsToCsv(query, res);
});