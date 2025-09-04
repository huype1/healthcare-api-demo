import mongoose, { Document, Model } from 'mongoose';
export interface FacilityDocument extends Document {
    name: string;
    address?: string;
    group?: mongoose.Types.ObjectId;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Facility: Model<FacilityDocument>;
export default Facility;
//# sourceMappingURL=Facility.d.ts.map