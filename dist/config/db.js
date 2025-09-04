import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const mongoUri = process.env.MONGO_URI;
export const connectDatabase = async () => {
    if (!mongoUri) {
        throw new Error('MONGO_URI is not defined');
    }
    mongoose.set('strictQuery', true);
    return mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        family: 4,
    });
};
//# sourceMappingURL=db.js.map