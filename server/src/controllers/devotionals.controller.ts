import { Request, Response } from 'express';
import pool from '../lib/db';

export const getDevotionals = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM devotionals ORDER BY date DESC');
        res.json(result.rows);
    } catch {
        res.status(500).json({ error: 'Failed to fetch devotionals' });
    }
};

export const createDevotional = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, content, scripture, date, author } = req.body;
        const result = await pool.query(
            `INSERT INTO devotionals (title, content, scripture, date, author)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [title, content, scripture, date || new Date(), author || 'Pastor Kevin Mulati']
        );
        res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to create devotional';
        res.status(400).json({ error: msg });
    }
};

export const updateDevotional = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, content, scripture, date, author } = req.body;
        const result = await pool.query(
            `UPDATE devotionals SET title = COALESCE($1, title), content = COALESCE($2, content),
             scripture = COALESCE($3, scripture), date = COALESCE($4, date), author = COALESCE($5, author),
             updated_at = NOW() WHERE id = $6 RETURNING *`,
            [title, content, scripture, date, author, req.params.id]
        );
        if (result.rows.length === 0) { res.status(404).json({ error: 'Devotional not found' }); return; }
        res.json(result.rows[0]);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to update devotional';
        res.status(400).json({ error: msg });
    }
};

export const deleteDevotional = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('DELETE FROM devotionals WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) { res.status(404).json({ error: 'Devotional not found' }); return; }
        res.json({ message: 'Devotional deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete devotional' });
    }
};
