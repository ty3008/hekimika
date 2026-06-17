import { Request, Response } from 'express';
import pool from '../lib/db';

const slugify = (text: string): string =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const calcReadTime = (html: string): number => {
    const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
};

// ──────────────────────────────────────────
// POSTS
// ──────────────────────────────────────────

export const getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category } = req.query;
        let query = `SELECT id, title, slug, excerpt, cover_image, author,
                     category, status, read_time, tags, published_at, created_at
                     FROM blog_posts WHERE status = 'published'`;
        const params: any[] = [];
        if (category && category !== 'all') {
            params.push(category);
            query += ` AND category = $${params.length}`;
        }
        query += ' ORDER BY published_at DESC';
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch {
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
};

export const getAllPostsAdmin = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query(
            `SELECT id, title, slug, excerpt, cover_image, author,
             category, status, read_time, tags, published_at, created_at
             FROM blog_posts ORDER BY created_at DESC`
        );
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
        const { title, content, excerpt, coverImage, author, tags, category, status } = req.body;
        const slug = slugify(title || '');
        const readTime = calcReadTime(content || '');
        const result = await pool.query(
            `INSERT INTO blog_posts (title, slug, content, excerpt, cover_image, author, tags, category, status, read_time)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [title, slug, content, excerpt, coverImage || null, author || 'Pastor Kevin Mulati',
             tags || [], category || 'General', status || 'published', readTime]
        );
        res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to create post';
        res.status(400).json({ error: msg });
    }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, content, excerpt, coverImage, author, tags, category, status } = req.body;
        const readTime = content ? calcReadTime(content) : undefined;
        const result = await pool.query(
            `UPDATE blog_posts SET
             title = COALESCE($1, title),
             content = COALESCE($2, content),
             excerpt = COALESCE($3, excerpt),
             cover_image = COALESCE($4, cover_image),
             author = COALESCE($5, author),
             tags = COALESCE($6, tags),
             category = COALESCE($7, category),
             status = COALESCE($8, status),
             read_time = COALESCE($9, read_time),
             updated_at = NOW()
             WHERE id = $10 RETURNING *`,
            [title, content, excerpt, coverImage, author, tags, category, status, readTime, req.params.id]
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

// ──────────────────────────────────────────
// CATEGORIES
// ──────────────────────────────────────────

export const getCategories = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM blog_categories ORDER BY sort_order ASC, name ASC');
        res.json(result.rows);
    } catch {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        if (!name?.trim()) { res.status(400).json({ error: 'Category name is required' }); return; }
        const slug = slugify(name.trim());
        const result = await pool.query(
            'INSERT INTO blog_categories (name, slug) VALUES ($1, $2) RETURNING *',
            [name.trim(), slug]
        );
        res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to create category';
        res.status(400).json({ error: msg });
    }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('DELETE FROM blog_categories WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) { res.status(404).json({ error: 'Category not found' }); return; }
        res.json({ message: 'Category deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

// ──────────────────────────────────────────
// COMMENTS
// ──────────────────────────────────────────

export const getComments = async (req: Request, res: Response): Promise<void> => {
    try {
        const postResult = await pool.query('SELECT id FROM blog_posts WHERE slug = $1', [req.params.slug]);
        if (postResult.rows.length === 0) { res.status(404).json({ error: 'Post not found' }); return; }
        const postId = postResult.rows[0].id;
        const result = await pool.query(
            'SELECT id, name, message, created_at FROM blog_comments WHERE post_id = $1 AND approved = true ORDER BY created_at ASC',
            [postId]
        );
        res.json(result.rows);
    } catch {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};

export const createComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const postResult = await pool.query('SELECT id FROM blog_posts WHERE slug = $1', [req.params.slug]);
        if (postResult.rows.length === 0) { res.status(404).json({ error: 'Post not found' }); return; }
        const postId = postResult.rows[0].id;
        const { name, email, message } = req.body;
        if (!name?.trim() || !message?.trim()) {
            res.status(400).json({ error: 'Name and message are required' }); return;
        }
        await pool.query(
            'INSERT INTO blog_comments (post_id, name, email, message) VALUES ($1, $2, $3, $4)',
            [postId, name.trim(), email?.trim() || '', message.trim()]
        );
        res.status(201).json({ message: 'Comment submitted and awaiting moderation. Thank you!' });
    } catch {
        res.status(500).json({ error: 'Failed to submit comment' });
    }
};

export const getAllCommentsAdmin = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query(
            `SELECT c.id, c.name, c.email, c.message, c.approved, c.created_at,
             p.title AS post_title, p.slug AS post_slug
             FROM blog_comments c
             JOIN blog_posts p ON p.id = c.post_id
             ORDER BY c.created_at DESC`
        );
        res.json(result.rows);
    } catch {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};

export const approveComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query(
            'UPDATE blog_comments SET approved = true WHERE id = $1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) { res.status(404).json({ error: 'Comment not found' }); return; }
        res.json(result.rows[0]);
    } catch {
        res.status(500).json({ error: 'Failed to approve comment' });
    }
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('DELETE FROM blog_comments WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) { res.status(404).json({ error: 'Comment not found' }); return; }
        res.json({ message: 'Comment deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete comment' });
    }
};
