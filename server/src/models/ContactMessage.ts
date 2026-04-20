import mongoose, { Document, Schema } from 'mongoose';

export interface IContactMessage extends Document {
    firstName: string;
    lastName?: string;
    email: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied';
}

const ContactMessageSchema = new Schema<IContactMessage>(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, default: '' },
        email: { type: String, required: true, lowercase: true, trim: true },
        subject: { type: String, required: true, trim: true },
        message: { type: String, required: true, trim: true },
        status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
    },
    { timestamps: true }
);

export default mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
