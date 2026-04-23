import mongoose from 'mongoose';

export interface ITestimonial {
    name: string;
    program: string;
    text: string;
    photo: string; // Base64 or URL
}

const testimonialSchema = new mongoose.Schema<ITestimonial>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    program: {
        type: String,
        required: [true, 'Program name is required'],
        trim: true,
    },
    text: {
        type: String,
        required: [true, 'Testimonial text is required'],
        trim: true,
    },
    photo: {
        type: String,
        default: 'https://i.pravatar.cc/150?img=11', // Generic fallback
    },
}, {
    timestamps: true,
});

export default mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
