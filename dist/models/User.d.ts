import mongoose, { Document, Model } from 'mongoose';
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
export declare const User: Model<UserDocument>;
export default User;
//# sourceMappingURL=User.d.ts.map