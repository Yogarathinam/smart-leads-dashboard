import mongoose, { Schema, type Model } from 'mongoose';
import { LEAD_SOURCE, LEAD_STATUS, type LeadSource, type LeadStatus } from '../constants/lead';

export interface ILead {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

type LeadModel = Model<ILead>;

const leadSchema = new Schema<ILead, LeadModel>(
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
    status: {
      type: String,
      enum: Object.values(LEAD_STATUS),
      required: true,
      default: LEAD_STATUS.NEW,
    },
    source: {
      type: String,
      enum: Object.values(LEAD_SOURCE),
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

leadSchema.index({ status: 1 });
leadSchema.index({ source: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ name: 1, email: 1 });

export const Lead = mongoose.model<ILead, LeadModel>('Lead', leadSchema);