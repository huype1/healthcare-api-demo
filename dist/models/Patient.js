import mongoose, { Schema, Document, Model } from 'mongoose';
const patientSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dob: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    email: { type: String, lowercase: true, trim: true },
    phone: { type: String },
    facility: { type: Schema.Types.ObjectId, ref: 'Facility' },
    primaryDoctor: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
patientSchema.index({ lastName: 1, firstName: 1 });
export const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);
export default Patient;
//# sourceMappingURL=Patient.js.map