import mongoose from 'mongoose';
import { format } from '@fast-csv/format';
import type { Response } from 'express';
import { Lead } from '../models/lead.model';
import { ApiError } from '../utils/ApiError';
import { buildPaginationMeta } from '../utils/pagination';
import { LEAD_SORT } from '../constants/lead';
import type { CreateLeadBody, ListLeadsQuery, UpdateLeadBody } from '../validations/lead.validation';

const PAGE_LIMIT = 10;

const buildLeadFilter = (query: ListLeadsQuery) => {
  const filter: Record<string, unknown> = {};

  if (query.status) {
    filter.status = query.status;
  }

  if (query.source) {
    filter.source = query.source;
  }

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { email: { $regex: query.search, $options: 'i' } },
    ];
  }

  return filter;
};

const buildSortOption = (sort?: ListLeadsQuery['sort']) => {
  return {
    createdAt: sort === LEAD_SORT.OLDEST ? ('asc' as const) : ('desc' as const),
  };
};

const sanitizeLead = (lead: {
  _id: unknown;
  name: string;
  email: string;
  status: string;
  source: string;
  createdBy: unknown;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  id: String(lead._id),
  name: lead.name,
  email: lead.email,
  status: lead.status,
  source: lead.source,
  createdBy: String(lead.createdBy),
  createdAt: lead.createdAt,
  updatedAt: lead.updatedAt,
});

export const createLead = async (payload: CreateLeadBody, userId: string) => {
  const normalizedEmail = payload.email.toLowerCase();

  const existingLead = await Lead.findOne({ email: normalizedEmail });

  if (existingLead) {
    throw new ApiError(409, 'Lead with this email already exists');
  }

  const lead = await Lead.create({
    ...payload,
    email: normalizedEmail,
    createdBy: new mongoose.Types.ObjectId(userId),
  });

  return sanitizeLead(lead);
};

export const listLeads = async (query: ListLeadsQuery) => {
  const page = Math.max(1, Number(query.page) || 1);
  const skip = (page - 1) * PAGE_LIMIT;
  const filter = buildLeadFilter(query);
  const sort = buildSortOption(query.sort);

  const [items, total] = await Promise.all([
    Lead.find(filter).sort(sort).skip(skip).limit(PAGE_LIMIT),
    Lead.countDocuments(filter),
  ]);

  return {
    items: items.map(sanitizeLead),
    pagination: buildPaginationMeta({
      page,
      limit: PAGE_LIMIT,
      total,
    }),
  };
};

export const getLeadById = async (leadId: string) => {
  const lead = await Lead.findById(leadId);

  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }

  return sanitizeLead(lead);
};

export const updateLead = async (leadId: string, payload: UpdateLeadBody) => {
  if (payload.email) {
    payload.email = payload.email.toLowerCase();

    const duplicateLead = await Lead.findOne({
      email: payload.email,
      _id: { $ne: leadId },
    });

    if (duplicateLead) {
      throw new ApiError(409, 'Lead with this email already exists');
    }
  }

  const updatedLead = await Lead.findByIdAndUpdate(leadId, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedLead) {
    throw new ApiError(404, 'Lead not found');
  }

  return sanitizeLead(updatedLead);
};

export const deleteLead = async (leadId: string) => {
  const deletedLead = await Lead.findByIdAndDelete(leadId);

  if (!deletedLead) {
    throw new ApiError(404, 'Lead not found');
  }

  return sanitizeLead(deletedLead);
};

export const exportLeadsToCsv = async (query: ListLeadsQuery, res: Response) => {
  const filter = buildLeadFilter(query);
  const sort = buildSortOption(query.sort);

  const leads = await Lead.find(filter).sort(sort);

  res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
  res.setHeader('Content-Type', 'text/csv');

  const csvStream = format({ headers: true });

  csvStream.pipe(res);

  for (const lead of leads) {
    csvStream.write({
      Name: lead.name,
      Email: lead.email,
      Status: lead.status,
      Source: lead.source,
      'Created At': lead.createdAt.toISOString(),
    });
  }

  csvStream.end();
};