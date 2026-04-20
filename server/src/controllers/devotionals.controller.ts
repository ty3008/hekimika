import { Request, Response } from 'express';
import Devotional from '../models/Devotional';

export const getDevotionals = async (_req: Request, res: Response): Promise<void> => {
    try {
        const devotionals = await Devotional.find().sort({ date: -1 });
        res.json(devotionals);
    } catch {
        res.status(500).json({ error: 'Failed to fetch devotionals' });
    }
};

export const createDevotional = async (req: Request, res: Response): Promise<void> => {
    try {
        const devotional = await Devotional.create(req.body);
        res.status(201).json(devotional);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to create devotional';
        res.status(400).json({ error: msg });
    }
};

export const updateDevotional = async (req: Request, res: Response): Promise<void> => {
    try {
        const devotional = await Devotional.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!devotional) { res.status(404).json({ error: 'Devotional not found' }); return; }
        res.json(devotional);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to update devotional';
        res.status(400).json({ error: msg });
    }
};

export const deleteDevotional = async (req: Request, res: Response): Promise<void> => {
    try {
        const devotional = await Devotional.findByIdAndDelete(req.params.id);
        if (!devotional) { res.status(404).json({ error: 'Devotional not found' }); return; }
        res.json({ message: 'Devotional deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete devotional' });
    }
};
