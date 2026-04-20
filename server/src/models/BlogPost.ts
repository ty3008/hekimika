import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage?: string;
    author: string;
    publishedAt: Date;
    tags: string[];
}

const BlogPostSchema = new Schema<IBlogPost>(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        content: { type: String, required: true },
        excerpt: { type: String, required: true },
        coverImage: { type: String },
        author: { type: String, default: 'Pastor Kevin Mulati' },
        publishedAt: { type: Date, default: Date.now },
        tags: [{ type: String }],
    },
    { timestamps: true }
);

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
