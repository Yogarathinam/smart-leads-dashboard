export const ROLES = {
  ADMIN: 'admin',
  SALES: 'sales',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];