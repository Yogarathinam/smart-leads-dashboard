import type { NextFunction, Request, Response } from 'express';
import type { Role } from '../constants/roles';
import { ApiError } from '../utils/ApiError';

export const authorize =
  (...allowedRoles: Role[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, 'Unauthorized'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, 'Forbidden: insufficient permissions'));
    }

    return next();
  };