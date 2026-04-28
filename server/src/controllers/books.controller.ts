import { Request, Response } from 'express';
import pool from '../lib/db';

// GET /api/books
export const getBooks = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM books ORDER BY sort_order ASC, created_at DESC');
        res.json(result.rows);
    } catch {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};

// POST /api/books (admin)
export const createBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, author, description, coverImage, price, selarUrl, category, featured, order } = req.body;
        const result = await pool.query(
            `INSERT INTO books (title, author, description, cover_image, price, selar_url, category, featured, sort_order)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [title, author || 'Pastor Kevin Mulati', description, coverImage || '', price, selarUrl || 'https://selar.co/placeholder', category || 'General', featured || false, order || 0]
        );
        res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to create book';
        res.status(400).json({ error: msg });
    }
};

// PUT /api/books/:id (admin)
export const updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, author, description, coverImage, price, selarUrl, category, featured, order } = req.body;
        const result = await pool.query(
            `UPDATE books SET title = COALESCE($1, title), author = COALESCE($2, author), description = COALESCE($3, description),
             cover_image = COALESCE($4, cover_image), price = COALESCE($5, price), selar_url = COALESCE($6, selar_url),
             category = COALESCE($7, category), featured = COALESCE($8, featured), sort_order = COALESCE($9, sort_order),
             updated_at = NOW() WHERE id = $10 RETURNING *`,
            [title, author, description, coverImage, price, selarUrl, category, featured, order, req.params.id]
        );
        if (result.rows.length === 0) { res.status(404).json({ error: 'Book not found' }); return; }
        res.json(result.rows[0]);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to update book';
        res.status(400).json({ error: msg });
    }
};

// DELETE /api/books/:id (admin)
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) { res.status(404).json({ error: 'Book not found' }); return; }
        res.json({ message: 'Book deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete book' });
    }
};
