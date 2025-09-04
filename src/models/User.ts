import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - role
 *       properties:
 *         _id:
 *           type: string
 *           description: User ID
 *           example: "507f1f77bcf86cd799439011"
 *         fullName:
 *           type: string
 *           description: User's full name
 *           example: "Dr. John Smith"
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "john.smith@hospital.com"
 *         phone:
 *           type: string
 *           description: User's phone number
 *           example: "+1234567890"
 *         role:
 *           type: string
 *           enum: [doctor, nurse]
 *           description: User's role in the system
 *           example: "doctor"
 *         facility:
 *           type: string
 *           description: Associated facility ID
 *           example: "507f1f77bcf86cd799439012"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     
 *     CreateUser:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - role
 *       properties:
 *         fullName:
 *           type: string
 *           description: User's full name
 *           example: "Dr. John Smith"
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "john.smith@hospital.com"
 *         phone:
 *           type: string
 *           description: User's phone number
 *           example: "+1234567890"
 *         role:
 *           type: string
 *           enum: [doctor, nurse]
 *           description: User's role in the system
 *           example: "doctor"
 *         facility:
 *           type: string
 *           description: Associated facility ID
 *           example: "507f1f77bcf86cd799439012"
 *     
 *     UpdateUser:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           description: User's full name
 *           example: "Dr. John Smith"
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "john.smith@hospital.com"
 *         phone:
 *           type: string
 *           description: User's phone number
 *           example: "+1234567890"
 *         role:
 *           type: string
 *           enum: [doctor, nurse]
 *           description: User's role in the system
 *           example: "doctor"
 *         facility:
 *           type: string
 *           description: Associated facility ID
 *           example: "507f1f77bcf86cd799439012"
 */

export type UserRole = 'doctor' | 'nurse';

export interface UserDocument extends Document {
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  facility?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String },
    role: { type: String, enum: ['doctor', 'nurse'], required: true },
    facility: { type: Schema.Types.ObjectId, ref: 'Facility' },
  },
  { timestamps: true }
);

// email field already has unique: true above; avoid duplicate index declaration

export const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);

export default User;


