import { Request, Response } from 'express';
import Program from '../models/Program';

const slugify = (text: string): string =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// GET /api/programs
export const getPrograms = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = typeof req.query.category === 'string' ? req.query.category : undefined;
        const filter = category ? { category } : {};
        const programs = await Program.find(filter).sort({ order: 1, createdAt: -1 });
        res.json(programs);
    } catch {
        res.status(500).json({ error: 'Failed to fetch programs' });
    }
};

// GET /api/programs/:slug
export const getProgramBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
        const program = await Program.findOne({ slug: req.params.slug });
        if (!program) {
            res.status(404).json({ error: 'Program not found' });
            return;
        }
        res.json(program);
    } catch {
        res.status(500).json({ error: 'Failed to fetch program' });
    }
};

// POST /api/programs (admin)
export const createProgram = async (req: Request, res: Response): Promise<void> => {
    try {
        const slug = slugify(req.body.title || '');
        const program = await Program.create({ ...req.body, slug });
        res.status(201).json(program);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to create program';
        res.status(400).json({ error: msg });
    }
};

// PUT /api/programs/:id (admin)
export const updateProgram = async (req: Request, res: Response): Promise<void> => {
    try {
        const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!program) {
            res.status(404).json({ error: 'Program not found' });
            return;
        }
        res.json(program);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to update program';
        res.status(400).json({ error: msg });
    }
};

// DELETE /api/programs/:id (admin)
export const deleteProgram = async (req: Request, res: Response): Promise<void> => {
    try {
        const program = await Program.findByIdAndDelete(req.params.id);
        if (!program) {
            res.status(404).json({ error: 'Program not found' });
            return;
        }
        res.json({ message: 'Program deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete program' });
    }
};
