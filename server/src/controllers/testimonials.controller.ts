import { Request, Response } from 'express';
import pool from '../lib/db';

export const getTestimonials = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching testimonials:', err);
        res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
};

export const createTestimonial = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, program, text, photo } = req.body;

        if (!name || !program || !text) {
            res.status(400).json({ error: 'Name, program, and text are required' });
            return;
        }

        const result = await pool.query(
            `INSERT INTO testimonials (name, program, text, photo) VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, program, text, photo || 'https://i.pravatar.cc/150?img=11']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating testimonial:', err);
        res.status(500).json({ error: 'Failed to create testimonial' });
    }
};

export const updateTestimonial = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, program, text, photo } = req.body;
        const result = await pool.query(
            `UPDATE testimonials SET name = COALESCE($1, name), program = COALESCE($2, program),
             text = COALESCE($3, text), photo = COALESCE($4, photo), updated_at = NOW()
             WHERE id = $5 RETURNING *`,
            [name, program, text, photo, req.params.id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Testimonial not found' });
            return;
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating testimonial:', err);
        res.status(500).json({ error: 'Failed to update testimonial' });
    }
};

export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('DELETE FROM testimonials WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Testimonial not found' });
            return;
        }
        res.json({ message: 'Testimonial deleted successfully' });
    } catch (err) {
        console.error('Error deleting testimonial:', err);
        res.status(500).json({ error: 'Failed to delete testimonial' });
    }
};
