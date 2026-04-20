import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
    title: string;
    description?: string;
    location?: string;
    startDate: Date;
    endDate?: Date;
    registrationUrl?: string;
    isActive: boolean;
}

const EventSchema = new Schema<IEvent>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        registrationUrl: { type: String, default: '' },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model<IEvent>('Event', EventSchema);
