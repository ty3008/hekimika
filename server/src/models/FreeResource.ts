import mongoose, { Document, Schema } from 'mongoose';

export interface IFreeResource extends Document {
    title: string;
    shortDescription: string;
    type: 'Magazine' | 'Devotional' | 'FreeBook';
    googleDriveLink: string;
}

const FreeResourceSchema = new Schema<IFreeResource>(
    {
        title: { type: String, required: true, trim: true },
        shortDescription: { type: String, required: true },
        type: { type: String, enum: ['Magazine', 'Devotional', 'FreeBook'], required: true },
        googleDriveLink: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IFreeResource>('FreeResource', FreeResourceSchema);
