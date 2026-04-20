import { Request, Response } from 'express';
import FreeResource from '../models/FreeResource';

export const getFreeResources = async (req: Request, res: Response) => {
    try {
        const resources = await FreeResource.find().sort({ createdAt: -1 });
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching free resources', error });
    }
};

export const getFreeResourceById = async (req: Request, res: Response) => {
    try {
        const resource = await FreeResource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });
        res.json(resource);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resource', error });
    }
};

export const createFreeResource = async (req: Request, res: Response) => {
    try {
        const resource = new FreeResource(req.body);
        await resource.save();
        res.status(201).json(resource);
    } catch (error) {
        res.status(400).json({ message: 'Error creating resource', error });
    }
};

export const updateFreeResource = async (req: Request, res: Response) => {
    try {
        const resource = await FreeResource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!resource) return res.status(404).json({ message: 'Resource not found' });
        res.json(resource);
    } catch (error) {
        res.status(400).json({ message: 'Error updating resource', error });
    }
};

export const deleteFreeResource = async (req: Request, res: Response) => {
    try {
        const resource = await FreeResource.findByIdAndDelete(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });
        res.json({ message: 'Resource deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting resource', error });
    }
};
