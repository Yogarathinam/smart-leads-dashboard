import type { NextFunction, Request, Response } from 'express';
import { ZodError, type ZodSchema } from 'zod';
import { ApiError } from '../utils/ApiError';

export const validate =
  (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: Record<string, string> = {};

        for (const issue of error.issues) {
          const field = issue.path.join('.') || 'request';
          formattedErrors[field] = issue.message;
        }

        return next(new ApiError(400, 'Validation failed', formattedErrors));
      }

      return next(error);
    }
  };