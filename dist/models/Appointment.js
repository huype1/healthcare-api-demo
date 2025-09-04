import mongoose, { Schema, Document, Model } from 'mongoose';
const appointmentSchema = new Schema({
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
}, { timestamps: true });
// Indexes for efficient querying
appointmentSchema.index({ patient: 1, scheduledDate: -1 });
appointmentSchema.index({ doctor: 1, scheduledDate: -1 });
appointmentSchema.index({ facility: 1, scheduledDate: -1 });
appointmentSchema.index({ status: 1, scheduledDate: -1 });
appointmentSchema.index({ scheduledDate: 1 }); // for date range queries
// Compound index for checking availability
appointmentSchema.index({ doctor: 1, scheduledDate: 1, status: 1 });
export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
export default Appointment;
//# sourceMappingURL=Appointment.js.map