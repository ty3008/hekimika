import { Request, Response } from 'express';
import pool from '../lib/db';

export const getContactMessages = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
        res.json(result.rows);
    } catch {
        res.status(500).json({ error: 'Failed to fetch contact messages' });
    }
};

export const createContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, email, subject, message } = req.body;
        const result = await pool.query(
            `INSERT INTO contact_messages (first_name, last_name, email, subject, message)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [firstName, lastName || '', email.toLowerCase(), subject, message]
        );
        res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create contact message';
        res.status(400).json({ error: errorMessage });
    }
};

export const updateContactStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query(
            'UPDATE contact_messages SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
            [req.body.status, req.params.id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Message not found' });
            return;
        }
        res.json(result.rows[0]);
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update contact message';
        res.status(400).json({ error: errorMessage });
    }
};

export const deleteContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('DELETE FROM contact_messages WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Message not found' });
            return;
        }
        res.json({ message: 'Contact message deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete contact message' });
    }
};
