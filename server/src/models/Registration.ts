import mongoose, { Document, Schema } from 'mongoose';

export interface IRegistration extends Document {
    name: string;
    email: string;
    phone?: string;
    programSlug?: string;
    eventId?: mongoose.Types.ObjectId;
    notes?: string;
    source: 'program' | 'event' | 'general';
    status: 'new' | 'contacted' | 'completed';
}

const RegistrationSchema = new Schema<IRegistration>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, lowercase: true, trim: true },
        phone: { type: String, default: '' },
        programSlug: { type: String, default: '' },
        eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
        notes: { type: String, default: '' },
        source: { type: String, enum: ['program', 'event', 'general'], default: 'general' },
        status: { type: String, enum: ['new', 'contacted', 'completed'], default: 'new' },
    },
    { timestamps: true }
);

export default mongoose.model<IRegistration>('Registration', RegistrationSchema);
