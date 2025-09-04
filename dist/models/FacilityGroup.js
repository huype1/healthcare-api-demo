import mongoose, { Schema, Document, Model } from 'mongoose';
const facilityGroupSchema = new Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String },
}, { timestamps: true });
// name field already has unique: true above; avoid duplicate index declaration
export const FacilityGroup = mongoose.models.FacilityGroup || mongoose.model('FacilityGroup', facilityGroupSchema);
export default FacilityGroup;
//# sourceMappingURL=FacilityGroup.js.map