import { Request, Response } from 'express';
import Registration from '../models/Registration';

export const getRegistrations = async (_req: Request, res: Response): Promise<void> => {
    try {
        const registrations = await Registration.find()
            .sort({ createdAt: -1 })
            .populate('eventId', 'title startDate');
        res.json(registrations);
    } catch {
        res.status(500).json({ error: 'Failed to fetch registrations' });
    }
};

export const createRegistration = async (req: Request, res: Response): Promise<void> => {
    try {
        const registration = await Registration.create(req.body);
        res.status(201).json(registration);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to create registration';
        res.status(400).json({ error: message });
    }
};

export const updateRegistrationStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const registration = await Registration.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );
        if (!registration) {
            res.status(404).json({ error: 'Registration not found' });
            return;
        }
        res.json(registration);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to update registration status';
        res.status(400).json({ error: message });
    }
};

export const deleteRegistration = async (req: Request, res: Response): Promise<void> => {
    try {
        const registration = await Registration.findByIdAndDelete(req.params.id);
        if (!registration) {
            res.status(404).json({ error: 'Registration not found' });
            return;
        }
        res.json({ message: 'Registration deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete registration' });
    }
};
