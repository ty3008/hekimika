import { Request, Response } from 'express';
import pool from '../lib/db';

const toCamel = (row: any) => {
    if (!row) return row;
    const newRow: any = {};
    for (const key in row) {
        const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        newRow[camelKey] = row[key];
    }
    return newRow;
};

const FALLBACK_HIGHLIGHTS = [
    {
        id: 1,
        title: 'Single & Built Bootcamps',
        photoUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        sortOrder: 0
    },
    {
        id: 2,
        title: 'School of Purity Highlights',
        photoUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        sortOrder: 1
    },
    {
        id: 3,
        title: 'Wisdom Moments & Mentorship',
        photoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        sortOrder: 2
    }
];

// GET /api/highlights
export const getHighlights = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM program_highlights ORDER BY sort_order ASC, created_at DESC');
        if (result.rows.length === 0) {
            res.json(FALLBACK_HIGHLIGHTS);
        } else {
            res.json(result.rows.map(toCamel));
        }
    } catch {
        res.json(FALLBACK_HIGHLIGHTS);
    }
};

// POST /api/highlights (admin)
export const createHighlight = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, photoUrl, youtubeUrl, sortOrder } = req.body;
        if (!title || !photoUrl || !youtubeUrl) {
            res.status(400).json({ error: 'Title, photo URL, and YouTube URL are required' });
            return;
        }
        const result = await pool.query(
            `INSERT INTO program_highlights (title, photo_url, youtube_url, sort_order)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [title, photoUrl, youtubeUrl, sortOrder || 0]
        );
        res.status(201).json(toCamel(result.rows[0]));
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to create highlight';
        res.status(400).json({ error: msg });
    }
};

// PUT /api/highlights/:id (admin)
export const updateHighlight = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, photoUrl, youtubeUrl, sortOrder } = req.body;
        const result = await pool.query(
            `UPDATE program_highlights SET
                title = COALESCE($1, title),
                photo_url = COALESCE($2, photo_url),
                youtube_url = COALESCE($3, youtube_url),
                sort_order = COALESCE($4, sort_order),
                updated_at = NOW()
             WHERE id = $5 RETURNING *`,
            [title, photoUrl, youtubeUrl, sortOrder, req.params.id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Highlight not found' });
            return;
        }
        res.json(toCamel(result.rows[0]));
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to update highlight';
        res.status(400).json({ error: msg });
    }
};

// DELETE /api/highlights/:id (admin)
export const deleteHighlight = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('DELETE FROM program_highlights WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Highlight not found' });
            return;
        }
        res.json({ message: 'Highlight deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete highlight' });
    }
};
