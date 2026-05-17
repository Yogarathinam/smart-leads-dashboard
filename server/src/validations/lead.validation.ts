import { z } from 'zod';
import { LEAD_SOURCE, LEAD_SORT, LEAD_STATUS } from '../constants/lead';

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters'),
    email: z.string().trim().email('Valid email is required'),
    status: z.enum([
      LEAD_STATUS.NEW,
      LEAD_STATUS.CONTACTED,
      LEAD_STATUS.QUALIFIED,
      LEAD_STATUS.LOST,
    ]),
    source: z.enum([
      LEAD_SOURCE.WEBSITE,
      LEAD_SOURCE.INSTAGRAM,
      LEAD_SOURCE.REFERRAL,
    ]),
  }),
});

export const updateLeadSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(2, 'Name must be at least 2 characters').optional(),
      email: z.string().trim().email('Valid email is required').optional(),
      status: z
        .enum([
          LEAD_STATUS.NEW,
          LEAD_STATUS.CONTACTED,
          LEAD_STATUS.QUALIFIED,
          LEAD_STATUS.LOST,
        ])
        .optional(),
      source: z
        .enum([
          LEAD_SOURCE.WEBSITE,
          LEAD_SOURCE.INSTAGRAM,
          LEAD_SOURCE.REFERRAL,
        ])
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required',
    }),
});

export const listLeadsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional(),
    status: z
      .enum([
        LEAD_STATUS.NEW,
        LEAD_STATUS.CONTACTED,
        LEAD_STATUS.QUALIFIED,
        LEAD_STATUS.LOST,
      ])
      .optional(),
    source: z
      .enum([
        LEAD_SOURCE.WEBSITE,
        LEAD_SOURCE.INSTAGRAM,
        LEAD_SOURCE.REFERRAL,
      ])
      .optional(),
    search: z.string().trim().optional(),
    sort: z.enum([LEAD_SORT.LATEST, LEAD_SORT.OLDEST]).optional(),
  }),
});

export type CreateLeadBody = z.infer<typeof createLeadSchema>['body'];
export type UpdateLeadBody = z.infer<typeof updateLeadSchema>['body'];
export type ListLeadsQuery = z.infer<typeof listLeadsSchema>['query'];