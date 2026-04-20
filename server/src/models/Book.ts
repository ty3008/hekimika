import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    description: string;
    coverImage: string;
    price: string;
    selarUrl: string;
    category: string;
    featured: boolean;
    order: number;
}

const BookSchema = new Schema<IBook>(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, default: 'Pastor Kevin Mulati' },
        description: { type: String, required: true },
        coverImage: { type: String, default: '' },
        price: { type: String, required: true },
        selarUrl: { type: String, required: true, default: 'https://selar.co/placeholder' },
        category: { type: String, default: 'General' },
        featured: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model<IBook>('Book', BookSchema);
