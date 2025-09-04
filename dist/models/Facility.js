import mongoose, { Schema, Document, Model } from 'mongoose';
const facilitySchema = new Schema({
    name: { type: String, required: true, trim: true },
    address: { type: String },
    group: { type: Schema.Types.ObjectId, ref: 'FacilityGroup' },
    phone: { type: String },
}, { timestamps: true });
facilitySchema.index({ name: 1 });
export const Facility = mongoose.models.Facility || mongoose.model('Facility', facilitySchema);
export default Facility;
//# sourceMappingURL=Facility.js.map