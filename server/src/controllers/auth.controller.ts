import type { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { getCurrentUser, loginUser, registerUser } from '../services/auth.service';
import { ApiError } from '../utils/ApiError';
import type { LoginBody, RegisterBody } from '../validations/auth.validation';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as RegisterBody;
  const result = await registerUser(body);

  return res.status(201).json(new ApiResponse('User registered successfully', result));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as LoginBody;
  const result = await loginUser(body);

  return res.status(200).json(new ApiResponse('User logged in successfully', result));
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.userId) {
    throw new ApiError(401, 'Unauthorized');
  }

  const user = await getCurrentUser(req.user.userId);

  return res.status(200).json(new ApiResponse('Current user fetched successfully', user));
});