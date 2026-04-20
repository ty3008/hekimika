import mongoose, { Schema } from 'mongoose';

export interface IProgram {
    title: string;
    slug: string;
    category: string;
    subfaculty?: string;
    description: string;
    fullDescription?: string;
    curriculum: string[];
    selarUrl: string;
    image?: string;
    model: '8-week' | 'workshop' | 'ongoing';
    testimonials: { name: string; text: string; photo?: string }[];
    featured: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const ProgramSchema = new Schema<IProgram>(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        category: { type: String, required: true }, // e.g. "Single & Built", "Couples", "Schools"
        subfaculty: { type: String },
        description: { type: String, required: true },
        fullDescription: { type: String },
        curriculum: [{ type: String }],
        selarUrl: { type: String, required: true, default: 'https://selar.co/placeholder' },
        image: { type: String, default: '' },
        model: { type: String, enum: ['8-week', 'workshop', 'ongoing'], default: '8-week' },
        testimonials: [
            {
                name: { type: String, required: true },
                text: { type: String, required: true },
                photo: { type: String },
            },
        ],
        featured: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model<IProgram>('Program', ProgramSchema);
