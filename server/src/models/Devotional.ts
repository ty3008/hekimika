import mongoose, { Document, Schema } from 'mongoose';

export interface IDevotional extends Document {
    title: string;
    content: string;
    scripture: string;
    date: Date;
    author: string;
}

const DevotionalSchema = new Schema<IDevotional>(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true },
        scripture: { type: String, required: true },
        date: { type: Date, default: Date.now },
        author: { type: String, default: 'Pastor Kevin Mulati' },
    },
    { timestamps: true }
);

export default mongoose.model<IDevotional>('Devotional', DevotionalSchema);
