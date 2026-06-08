import { Request, Response } from 'express';
import pool from '../lib/db';

const FALLBACK_FREE_RESOURCES = [
    {
        id: 101,
        title: 'Wise Nation Audio Sermon 1',
        short_description: 'A powerful teaching on building a solid foundation in Christ and walking in relevance.',
        type: 'Audio',
        google_drive_link: 'https://drive.google.com/file/d/1_2LhV39YF8c1k2A3b4c5d6e7f8g9h0i/view',
        cover_image_link: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop', // Beautiful concert/music cover
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: 102,
        title: 'Purity and Wholesomeness',
        short_description: 'An audio study guide for teens on maintaining purity and holy living in a secular generation.',
        type: 'Audio',
        google_drive_link: 'https://drive.google.com/file/d/1_3LhV39YF8c1k2A3b4c5d6e7f8g9h0j/view',
        cover_image_link: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?q=80&w=600&auto=format&fit=crop', // Beautiful microphone/audio cover
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: 103,
        title: 'Wise Generation Magazine Vol. 1',
        short_description: 'A compilation of stories, testimonies, and devotionals from the Hekimika team.',
        type: 'Magazine',
        google_drive_link: 'https://drive.google.com/file/d/1_4LhV39YF8c1k2A3b4c5d6e7f8g9h0k/view',
        cover_image_link: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
];

export const getFreeResources = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM free_resources ORDER BY created_at DESC');
        if (result.rows.length === 0) {
            res.json(FALLBACK_FREE_RESOURCES);
        } else {
            res.json(result.rows);
        }
    } catch {
        res.json(FALLBACK_FREE_RESOURCES);
    }
};

export const getFreeResourceById = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM free_resources WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            const fallback = FALLBACK_FREE_RESOURCES.find(r => r.id.toString() === req.params.id);
            if (fallback) {
                res.json(fallback);
                return;
            }
            res.status(404).json({ error: 'Resource not found' });
            return;
        }
        res.json(result.rows[0]);
    } catch {
        const fallback = FALLBACK_FREE_RESOURCES.find(r => r.id.toString() === req.params.id);
        if (fallback) {
            res.json(fallback);
            return;
        }
        res.status(500).json({ error: 'Failed to fetch resource' });
    }
};

export const createFreeResource = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, shortDescription, type, googleDriveLink, coverImageLink } = req.body;
        const result = await pool.query(
            `INSERT INTO free_resources (title, short_description, type, google_drive_link, cover_image_link)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [title, shortDescription, type, googleDriveLink, coverImageLink || '']
        );
        res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to create resource';
        res.status(400).json({ error: msg });
    }
};

export const updateFreeResource = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, shortDescription, type, googleDriveLink, coverImageLink } = req.body;
        const result = await pool.query(
            `UPDATE free_resources SET title = COALESCE($1, title), short_description = COALESCE($2, short_description),
             type = COALESCE($3, type), google_drive_link = COALESCE($4, google_drive_link),
             cover_image_link = COALESCE($5, cover_image_link),
             updated_at = NOW() WHERE id = $6 RETURNING *`,
            [title, shortDescription, type, googleDriveLink, coverImageLink, req.params.id]
        );
        if (result.rows.length === 0) { res.status(404).json({ error: 'Resource not found' }); return; }
        res.json(result.rows[0]);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to update resource';
        res.status(400).json({ error: msg });
    }
};

export const deleteFreeResource = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('DELETE FROM free_resources WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) { res.status(404).json({ error: 'Resource not found' }); return; }
        res.json({ message: 'Resource deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete resource' });
    }
};
