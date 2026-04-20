import { Request, Response } from 'express';
import Event from '../models/Event';

export const getEvents = async (_req: Request, res: Response): Promise<void> => {
    try {
        const events = await Event.find().sort({ startDate: 1, createdAt: -1 });
        res.json(events);
    } catch {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            res.status(404).json({ error: 'Event not found' });
            return;
        }
        res.json(event);
    } catch {
        res.status(500).json({ error: 'Failed to fetch event' });
    }
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to create event';
        res.status(400).json({ error: message });
    }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!event) {
            res.status(404).json({ error: 'Event not found' });
            return;
        }
        res.json(event);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to update event';
        res.status(400).json({ error: message });
    }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            res.status(404).json({ error: 'Event not found' });
            return;
        }
        res.json({ message: 'Event deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete event' });
    }
};
