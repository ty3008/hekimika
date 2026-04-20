import { Request, Response } from 'express';
import Book from '../models/Book';

// GET /api/books
export const getBooks = async (_req: Request, res: Response): Promise<void> => {
    try {
        const books = await Book.find().sort({ order: 1, createdAt: -1 });
        res.json(books);
    } catch {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};

// POST /api/books (admin)
export const createBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to create book';
        res.status(400).json({ error: msg });
    }
};

// PUT /api/books/:id (admin)
export const updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) { res.status(404).json({ error: 'Book not found' }); return; }
        res.json(book);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to update book';
        res.status(400).json({ error: msg });
    }
};

// DELETE /api/books/:id (admin)
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) { res.status(404).json({ error: 'Book not found' }); return; }
        res.json({ message: 'Book deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete book' });
    }
};
