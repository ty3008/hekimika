import { Request, Response } from 'express';
import pool from '../lib/db';

export const getFreeResources = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM free_resources ORDER BY created_at DESC');
        res.json(result.rows);
    } catch {
        res.status(500).json({ error: 'Failed to fetch free resources' });
    }
};

export const getFreeResourceById = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM free_resources WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) { res.status(404).json({ error: 'Resource not found' }); return; }
        res.json(result.rows[0]);
    } catch {
        res.status(500).json({ error: 'Failed to fetch resource' });
    }
};

export const createFreeResource = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, shortDescription, type, googleDriveLink } = req.body;
        const result = await pool.query(
            `INSERT INTO free_resources (title, short_description, type, google_drive_link)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [title, shortDescription, type, googleDriveLink]
        );
        res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to create resource';
        res.status(400).json({ error: msg });
    }
};

export const updateFreeResource = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, shortDescription, type, googleDriveLink } = req.body;
        const result = await pool.query(
            `UPDATE free_resources SET title = COALESCE($1, title), short_description = COALESCE($2, short_description),
             type = COALESCE($3, type), google_drive_link = COALESCE($4, google_drive_link),
             updated_at = NOW() WHERE id = $5 RETURNING *`,
            [title, shortDescription, type, googleDriveLink, req.params.id]
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
