import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *         - patient
 *         - doctor
 *         - facility
 *         - scheduledDate
 *         - type
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: Appointment ID
 *           example: "507f1f77bcf86cd799439011"
 *         patient:
 *           type: string
 *           description: Patient ID
 *           example: "507f1f77bcf86cd799439012"
 *         doctor:
 *           type: string
 *           description: Doctor ID
 *           example: "507f1f77bcf86cd799439013"
 *         facility:
 *           type: string
 *           description: Facility ID
 *           example: "507f1f77bcf86cd799439014"
 *         scheduledDate:
 *           type: string
 *           format: date-time
 *           description: Scheduled appointment date and time
 *           example: "2024-01-15T10:30:00Z"
 *         duration:
 *           type: integer
 *           description: Appointment duration in minutes
 *           minimum: 15
 *           maximum: 480
 *           default: 30
 *           example: 30
 *         type:
 *           type: string
 *           enum: [consultation, follow-up, emergency, routine, specialist]
 *           description: Type of appointment
 *           example: "consultation"
 *         status:
 *           type: string
 *           enum: [scheduled, confirmed, in-progress, completed, cancelled, no-show]
 *           description: Appointment status
 *           example: "scheduled"
 *         notes:
 *           type: string
 *           description: Additional notes
 *           example: "Patient has allergies to penicillin"
 *         symptoms:
 *           type: array
 *           items:
 *             type: string
 *           description: List of symptoms
 *           example: ["fever", "headache", "cough"]
 *         diagnosis:
 *           type: string
 *           description: Medical diagnosis
 *           example: "Common cold"
 *         prescription:
 *           type: string
 *           description: Prescribed medication
 *           example: "Take ibuprofen 400mg every 6 hours"
 *         followUpDate:
 *           type: string
 *           format: date-time
 *           description: Follow-up appointment date
 *           example: "2024-01-22T10:30:00Z"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     
 *     CreateAppointment:
 *       type: object
 *       required:
 *         - patient
 *         - doctor
 *         - facility
 *         - scheduledDate
 *         - type
 *       properties:
 *         patient:
 *           type: string
 *           description: Patient ID
 *           example: "507f1f77bcf86cd799439012"
 *         doctor:
 *           type: string
 *           description: Doctor ID
 *           example: "507f1f77bcf86cd799439013"
 *         facility:
 *           type: string
 *           description: Facility ID
 *           example: "507f1f77bcf86cd799439014"
 *         scheduledDate:
 *           type: string
 *           format: date-time
 *           description: Scheduled appointment date and time
 *           example: "2024-01-15T10:30:00Z"
 *         duration:
 *           type: integer
 *           description: Appointment duration in minutes
 *           minimum: 15
 *           maximum: 480
 *           default: 30
 *           example: 30
 *         type:
 *           type: string
 *           enum: [consultation, follow-up, emergency, routine, specialist]
 *           description: Type of appointment
 *           example: "consultation"
 *         notes:
 *           type: string
 *           description: Additional notes
 *           example: "Patient has allergies to penicillin"
 *         symptoms:
 *           type: array
 *           items:
 *             type: string
 *           description: List of symptoms
 *           example: ["fever", "headache", "cough"]
 *     
 *     UpdateAppointment:
 *       type: object
 *       properties:
 *         patient:
 *           type: string
 *           description: Patient ID
 *           example: "507f1f77bcf86cd799439012"
 *         doctor:
 *           type: string
 *           description: Doctor ID
 *           example: "507f1f77bcf86cd799439013"
 *         facility:
 *           type: string
 *           description: Facility ID
 *           example: "507f1f77bcf86cd799439014"
 *         scheduledDate:
 *           type: string
 *           format: date-time
 *           description: Scheduled appointment date and time
 *           example: "2024-01-15T10:30:00Z"
 *         duration:
 *           type: integer
 *           description: Appointment duration in minutes
 *           minimum: 15
 *           maximum: 480
 *           example: 30
 *         type:
 *           type: string
 *           enum: [consultation, follow-up, emergency, routine, specialist]
 *           description: Type of appointment
 *           example: "consultation"
 *         status:
 *           type: string
 *           enum: [scheduled, confirmed, in-progress, completed, cancelled, no-show]
 *           description: Appointment status
 *           example: "confirmed"
 *         notes:
 *           type: string
 *           description: Additional notes
 *           example: "Patient has allergies to penicillin"
 *         symptoms:
 *           type: array
 *           items:
 *             type: string
 *           description: List of symptoms
 *           example: ["fever", "headache", "cough"]
 *         diagnosis:
 *           type: string
 *           description: Medical diagnosis
 *           example: "Common cold"
 *         prescription:
 *           type: string
 *           description: Prescribed medication
 *           example: "Take ibuprofen 400mg every 6 hours"
 *         followUpDate:
 *           type: string
 *           format: date-time
 *           description: Follow-up appointment date
 *           example: "2024-01-22T10:30:00Z"
 */

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
export type AppointmentType = 'consultation' | 'follow-up' | 'emergency' | 'routine' | 'specialist';

export interface AppointmentDocument extends Document {
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  facility: mongoose.Types.ObjectId;
  scheduledDate: Date;
  duration: number; // in minutes
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
  symptoms?: string[];
  diagnosis?: string;
  prescription?: string;
  followUpDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<AppointmentDocument>(
  {
    patient: { 
      type: Schema.Types.ObjectId, 
      ref: 'Patient', 
      required: true 
    },
    doctor: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    facility: { 
      type: Schema.Types.ObjectId, 
      ref: 'Facility', 
      required: true 
    },
    scheduledDate: { 
      type: Date, 
      required: true 
    },
    duration: { 
      type: Number, 
      required: true, 
      default: 30, // default 30 minutes
      min: 15,
      max: 480 // max 8 hours
    },
    type: { 
      type: String, 
      enum: ['consultation', 'follow-up', 'emergency', 'routine', 'specialist'], 
      required: true,
      default: 'consultation'
    },
    status: { 
      type: String, 
      enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'], 
      required: true,
      default: 'scheduled'
    },
    notes: { 
      type: String 
    },
    symptoms: [{ 
      type: String 
    }],
    diagnosis: { 
      type: String 
    },
    prescription: { 
      type: String 
    },
    followUpDate: { 
      type: Date 
    }
  },
  { timestamps: true }
);

// Indexes for efficient querying
appointmentSchema.index({ patient: 1, scheduledDate: -1 });
appointmentSchema.index({ doctor: 1, scheduledDate: -1 });
appointmentSchema.index({ facility: 1, scheduledDate: -1 });
appointmentSchema.index({ status: 1, scheduledDate: -1 });
appointmentSchema.index({ scheduledDate: 1 }); // for date range queries

// Compound index for checking availability
appointmentSchema.index({ doctor: 1, scheduledDate: 1, status: 1 });

export const Appointment: Model<AppointmentDocument> =
  mongoose.models.Appointment || mongoose.model<AppointmentDocument>('Appointment', appointmentSchema);

export default Appointment;
