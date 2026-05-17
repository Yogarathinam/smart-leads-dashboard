import mongoose, { Schema, type HydratedDocument, type Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { env } from '../config/env';
import { ROLES, type Role } from '../constants/roles';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

type UserModel = Model<IUser>;

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.SALES,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function () {
  const user = this as HydratedDocument<IUser>;

  if (!user.isModified('password')) {
    return;
  }

  user.password = await bcrypt.hash(
    user.password,
    env.BCRYPT_SALT_ROUNDS
  );
});

userSchema.methods.comparePassword = async function comparePassword(candidatePassword: string) {
  const user = this as HydratedDocument<IUser>;
  return bcrypt.compare(candidatePassword, user.password);
};

export const User = mongoose.model<IUser, UserModel>('User', userSchema);