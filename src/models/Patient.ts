import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *       properties:
 *         _id:
 *           type: string
 *           description: Patient ID
 *           example: "507f1f77bcf86cd799439011"
 *         firstName:
 *           type: string
 *           description: Patient's first name
 *           example: "John"
 *         lastName:
 *           type: string
 *           description: Patient's last name
 *           example: "Doe"
 *         dob:
 *           type: string
 *           format: date
 *           description: Date of birth
 *           example: "1990-01-15"
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           description: Patient's gender
 *           example: "male"
 *         email:
 *           type: string
 *           format: email
 *           description: Patient's email address
 *           example: "john.doe@example.com"
 *         phone:
 *           type: string
 *           description: Patient's phone number
 *           example: "+1234567890"
 *         facility:
 *           type: string
 *           description: Associated facility ID
 *           example: "507f1f77bcf86cd799439012"
 *         primaryDoctor:
 *           type: string
 *           description: Primary doctor ID
 *           example: "507f1f77bcf86cd799439013"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     
 *     CreatePatient:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *       properties:
 *         firstName:
 *           type: string
 *           description: Patient's first name
 *           example: "John"
 *         lastName:
 *           type: string
 *           description: Patient's last name
 *           example: "Doe"
 *         dob:
 *           type: string
 *           format: date
 *           description: Date of birth
 *           example: "1990-01-15"
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           description: Patient's gender
 *           example: "male"
 *         email:
 *           type: string
 *           format: email
 *           description: Patient's email address
 *           example: "john.doe@example.com"
 *         phone:
 *           type: string
 *           description: Patient's phone number
 *           example: "+1234567890"
 *         facility:
 *           type: string
 *           description: Associated facility ID
 *           example: "507f1f77bcf86cd799439012"
 *         primaryDoctor:
 *           type: string
 *           description: Primary doctor ID
 *           example: "507f1f77bcf86cd799439013"
 *     
 *     UpdatePatient:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: Patient's first name
 *           example: "John"
 *         lastName:
 *           type: string
 *           description: Patient's last name
 *           example: "Doe"
 *         dob:
 *           type: string
 *           format: date
 *           description: Date of birth
 *           example: "1990-01-15"
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           description: Patient's gender
 *           example: "male"
 *         email:
 *           type: string
 *           format: email
 *           description: Patient's email address
 *           example: "john.doe@example.com"
 *         phone:
 *           type: string
 *           description: Patient's phone number
 *           example: "+1234567890"
 *         facility:
 *           type: string
 *           description: Associated facility ID
 *           example: "507f1f77bcf86cd799439012"
 *         primaryDoctor:
 *           type: string
 *           description: Primary doctor ID
 *           example: "507f1f77bcf86cd799439013"
 */

export interface PatientDocument extends Document {
  firstName: string;
  lastName: string;
  dob?: Date;
  gender?: 'male' | 'female' | 'other';
  email?: string;
  phone?: string;
  facility?: mongoose.Types.ObjectId;
  primaryDoctor?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const patientSchema = new Schema<PatientDocument>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dob: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    email: { type: String, lowercase: true, trim: true },
    phone: { type: String },
    facility: { type: Schema.Types.ObjectId, ref: 'Facility' },
    primaryDoctor: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

patientSchema.index({ lastName: 1, firstName: 1 });

export const Patient: Model<PatientDocument> =
  mongoose.models.Patient || mongoose.model<PatientDocument>('Patient', patientSchema);

export default Patient;



