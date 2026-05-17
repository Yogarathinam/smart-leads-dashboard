export const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  LOST: 'lost',
} as const;

export const LEAD_SOURCE = {
  WEBSITE: 'website',
  INSTAGRAM: 'instagram',
  REFERRAL: 'referral',
} as const;

export const LEAD_SORT = {
  LATEST: 'latest',
  OLDEST: 'oldest',
} as const;

export type LeadStatus = (typeof LEAD_STATUS)[keyof typeof LEAD_STATUS];
export type LeadSource = (typeof LEAD_SOURCE)[keyof typeof LEAD_SOURCE];
export type LeadSort = (typeof LEAD_SORT)[keyof typeof LEAD_SORT];