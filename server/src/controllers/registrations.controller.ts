import { Request, Response } from 'express';
import pool from '../lib/db';

export const getRegistrations = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query(
            `SELECT r.*, e.title as event_title, e.start_date as event_start_date
             FROM registrations r LEFT JOIN events e ON r.event_id = e.id
             ORDER BY r.created_at DESC`
        );
        res.json(result.rows);
    } catch {
        res.status(500).json({ error: 'Failed to fetch registrations' });
    }
};

export const createRegistration = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, phone, programSlug, eventId, notes, source } = req.body;

        if (!name?.trim() || !email?.trim()) {
            res.status(400).json({ error: 'Name and email are required' });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim()) || email.trim().length > 150) {
            res.status(400).json({ error: 'Please provide a valid email address (max 150 characters)' });
            return;
        }

        if (name.trim().length > 100) {
            res.status(400).json({ error: 'Name must not exceed 100 characters' });
            return;
        }

        if (phone && phone.trim().length > 30) {
            res.status(400).json({ error: 'Phone must not exceed 30 characters' });
            return;
        }

        if (notes && notes.trim().length > 2000) {
            res.status(400).json({ error: 'Notes must not exceed 2000 characters' });
            return;
        }

        const result = await pool.query(
            `INSERT INTO registrations (name, email, phone, program_slug, event_id, notes, source)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [name.trim(), email.trim().toLowerCase(), (phone || '').trim(), (programSlug || '').trim(), eventId || null, (notes || '').trim(), (source || 'general').trim()]
        );
        res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to create registration';
        res.status(400).json({ error: message });
    }
};

export const updateRegistrationStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query(
            'UPDATE registrations SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
            [req.body.status, req.params.id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Registration not found' });
            return;
        }
        res.json(result.rows[0]);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to update registration status';
        res.status(400).json({ error: message });
    }
};

export const deleteRegistration = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('DELETE FROM registrations WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Registration not found' });
            return;
        }
        res.json({ message: 'Registration deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete registration' });
    }
};
