import mongoose, { Schema, Document, Model } from 'mongoose';

export interface FacilityGroupDocument extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const facilityGroupSchema = new Schema<FacilityGroupDocument>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

// name field already has unique: true above; avoid duplicate index declaration

export const FacilityGroup: Model<FacilityGroupDocument> =
  mongoose.models.FacilityGroup || mongoose.model<FacilityGroupDocument>('FacilityGroup', facilityGroupSchema);

export default FacilityGroup;


