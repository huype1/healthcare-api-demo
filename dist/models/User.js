import mongoose, { Schema, Document, Model } from 'mongoose';
const userSchema = new Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String },
    role: { type: String, enum: ['doctor', 'nurse'], required: true },
    facility: { type: Schema.Types.ObjectId, ref: 'Facility' },
}, { timestamps: true });
// email field already has unique: true above; avoid duplicate index declaration
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=User.js.map