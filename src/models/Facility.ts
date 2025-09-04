import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Facility:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: Facility ID
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           description: Facility name
 *           example: "General Hospital"
 *         address:
 *           type: string
 *           description: Facility address
 *           example: "123 Main St, City, State 12345"
 *         group:
 *           type: string
 *           description: Facility group ID
 *           example: "507f1f77bcf86cd799439012"
 *         phone:
 *           type: string
 *           description: Facility phone number
 *           example: "+1234567890"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     
 *     CreateFacility:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Facility name
 *           example: "General Hospital"
 *         address:
 *           type: string
 *           description: Facility address
 *           example: "123 Main St, City, State 12345"
 *         group:
 *           type: string
 *           description: Facility group ID
 *           example: "507f1f77bcf86cd799439012"
 *         phone:
 *           type: string
 *           description: Facility phone number
 *           example: "+1234567890"
 *     
 *     UpdateFacility:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Facility name
 *           example: "General Hospital"
 *         address:
 *           type: string
 *           description: Facility address
 *           example: "123 Main St, City, State 12345"
 *         group:
 *           type: string
 *           description: Facility group ID
 *           example: "507f1f77bcf86cd799439012"
 *         phone:
 *           type: string
 *           description: Facility phone number
 *           example: "+1234567890"
 */

export interface FacilityDocument extends Document {
  name: string;
  address?: string;
  group?: mongoose.Types.ObjectId;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const facilitySchema = new Schema<FacilityDocument>(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String },
    group: { type: Schema.Types.ObjectId, ref: 'FacilityGroup' },
    phone: { type: String },
  },
  { timestamps: true }
);

facilitySchema.index({ name: 1 });

export const Facility: Model<FacilityDocument> =
  mongoose.models.Facility || mongoose.model<FacilityDocument>('Facility', facilitySchema);

export default Facility;



