import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import type { JwtPayload } from '../types/jwt.types';

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET as string, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET as string) as JwtPayload;
};