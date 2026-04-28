import { Request, Response } from 'express';
import pool from '../lib/db';

const slugify = (text: string): string =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const getPosts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM blog_posts ORDER BY published_at DESC');
        res.json(result.rows);
    } catch {
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
};

export const getPostBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM blog_posts WHERE slug = $1', [req.params.slug]);
        if (result.rows.length === 0) { res.status(404).json({ error: 'Post not found' }); return; }
        res.json(result.rows[0]);
    } catch {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
};

export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, content, excerpt, coverImage, author, tags } = req.body;
        const slug = slugify(title || '');
        const result = await pool.query(
            `INSERT INTO blog_posts (title, slug, content, excerpt, cover_image, author, tags)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [title, slug, content, excerpt, coverImage || null, author || 'Pastor Kevin Mulati', tags || []]
        );
        res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to create post';
        res.status(400).json({ error: msg });
    }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, content, excerpt, coverImage, author, tags } = req.body;
        const result = await pool.query(
            `UPDATE blog_posts SET title = COALESCE($1, title), content = COALESCE($2, content),
             excerpt = COALESCE($3, excerpt), cover_image = COALESCE($4, cover_image),
             author = COALESCE($5, author), tags = COALESCE($6, tags), updated_at = NOW()
             WHERE id = $7 RETURNING *`,
            [title, content, excerpt, coverImage, author, tags, req.params.id]
        );
        if (result.rows.length === 0) { res.status(404).json({ error: 'Post not found' }); return; }
        res.json(result.rows[0]);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to update post';
        res.status(400).json({ error: msg });
    }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('DELETE FROM blog_posts WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) { res.status(404).json({ error: 'Post not found' }); return; }
        res.json({ message: 'Post deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete post' });
    }
};
