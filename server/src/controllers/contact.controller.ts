import { Request, Response } from 'express';
import ContactMessage from '../models/ContactMessage';

export const getContactMessages = async (_req: Request, res: Response): Promise<void> => {
    try {
        const messages = await ContactMessage.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch {
        res.status(500).json({ error: 'Failed to fetch contact messages' });
    }
};

export const createContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const message = await ContactMessage.create(req.body);
        res.status(201).json(message);
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create contact message';
        res.status(400).json({ error: errorMessage });
    }
};

export const updateContactStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const message = await ContactMessage.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );
        if (!message) {
            res.status(404).json({ error: 'Message not found' });
            return;
        }
        res.json(message);
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update contact message';
        res.status(400).json({ error: errorMessage });
    }
};

export const deleteContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const message = await ContactMessage.findByIdAndDelete(req.params.id);
        if (!message) {
            res.status(404).json({ error: 'Message not found' });
            return;
        }
        res.json({ message: 'Contact message deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete contact message' });
    }
};
