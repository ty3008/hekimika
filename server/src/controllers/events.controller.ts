import { Request, Response } from 'express';
import pool from '../lib/db';

export const getEvents = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM events ORDER BY start_date ASC, created_at DESC');
        res.json(result.rows);
    } catch {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Event not found' });
            return;
        }
        res.json(result.rows[0]);
    } catch {
        res.status(500).json({ error: 'Failed to fetch event' });
    }
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, location, startDate, endDate, registrationUrl, isActive } = req.body;
        const result = await pool.query(
            `INSERT INTO events (title, description, location, start_date, end_date, registration_url, is_active)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [title, description || '', location || '', startDate, endDate || null, registrationUrl || '', isActive !== false]
        );
        res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to create event';
        res.status(400).json({ error: message });
    }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, location, startDate, endDate, registrationUrl, isActive } = req.body;
        const result = await pool.query(
            `UPDATE events SET title = COALESCE($1, title), description = COALESCE($2, description),
             location = COALESCE($3, location), start_date = COALESCE($4, start_date), end_date = COALESCE($5, end_date),
             registration_url = COALESCE($6, registration_url), is_active = COALESCE($7, is_active),
             updated_at = NOW() WHERE id = $8 RETURNING *`,
            [title, description, location, startDate, endDate, registrationUrl, isActive, req.params.id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Event not found' });
            return;
        }
        res.json(result.rows[0]);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to update event';
        res.status(400).json({ error: message });
    }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Event not found' });
            return;
        }
        res.json({ message: 'Event deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete event' });
    }
};
