import { Request, Response } from 'express';
import BlogPost from '../models/BlogPost';

const slugify = (text: string): string =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const getPosts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const posts = await BlogPost.find().sort({ publishedAt: -1 });
        res.json(posts);
    } catch {
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
};

export const getPostBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug });
        if (!post) { res.status(404).json({ error: 'Post not found' }); return; }
        res.json(post);
    } catch {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
};

export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const slug = slugify(req.body.title || '');
        const post = await BlogPost.create({ ...req.body, slug });
        res.status(201).json(post);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to create post';
        res.status(400).json({ error: msg });
    }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) { res.status(404).json({ error: 'Post not found' }); return; }
        res.json(post);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to update post';
        res.status(400).json({ error: msg });
    }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await BlogPost.findByIdAndDelete(req.params.id);
        if (!post) { res.status(404).json({ error: 'Post not found' }); return; }
        res.json({ message: 'Post deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete post' });
    }
};
