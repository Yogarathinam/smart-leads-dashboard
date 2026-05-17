import { User } from '../models/user.model';
import { ROLES, type Role } from '../constants/roles';
import { ApiError } from '../utils/ApiError';
import { signToken } from '../utils/jwt';
import type { LoginBody, RegisterBody } from '../validations/auth.validation';

interface SafeUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}

const sanitizeUser = (user: {
  _id: unknown;
  name: string;
  email: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}): SafeUser => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const registerUser = async ({ name, email, password }: RegisterBody) => {
  const normalizedEmail = email.toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw new ApiError(409, 'User already exists');
  }

  const user = await User.create({
    name,
    email: normalizedEmail,
    password,
    role: ROLES.SALES,
  });

  const safeUser = sanitizeUser(user);

  const token = signToken({
    userId: safeUser.id,
    role: safeUser.role,
  });

  return { user: safeUser, token };
};

export const loginUser = async ({ email, password }: LoginBody) => {
  const normalizedEmail = email.toLowerCase();

  const user = await User.findOne({ email: normalizedEmail }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const safeUser = sanitizeUser(user);

  const token = signToken({
    userId: safeUser.id,
    role: safeUser.role,
  });

  return { user: safeUser, token };
};

export const getCurrentUser = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return sanitizeUser(user);
};