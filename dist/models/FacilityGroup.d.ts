import { Document, Model } from 'mongoose';
export interface FacilityGroupDocument extends Document {
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const FacilityGroup: Model<FacilityGroupDocument>;
export default FacilityGroup;
//# sourceMappingURL=FacilityGroup.d.ts.map