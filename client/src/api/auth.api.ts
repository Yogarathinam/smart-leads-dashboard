import { api } from './axios';
import type { ApiSuccessResponse } from '../types/api.types';
import type { AuthResponse, AuthUser, LoginPayload, RegisterPayload } from '../features/auth/auth.types';

export const registerRequest = async (payload: RegisterPayload) => {
  const { data } = await api.post<ApiSuccessResponse<AuthResponse>>('/auth/register', payload);
  return data.data;
};

export const loginRequest = async (payload: LoginPayload) => {
  const { data } = await api.post<ApiSuccessResponse<AuthResponse>>('/auth/login', payload);
  return data.data;
};

export const meRequest = async () => {
  const { data } = await api.get<ApiSuccessResponse<AuthUser>>('/auth/me');
  return data.data;
};