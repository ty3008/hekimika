import { Request, Response } from 'express';
import pool from '../lib/db';

const slugify = (text: string): string =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const toCamel = (row: any) => {
    if (!row) return row;
    const newRow: any = {};
    for (const key in row) {
        const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        newRow[camelKey] = row[key];
    }
    return newRow;
};

// GET /api/programs
export const getPrograms = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = typeof req.query.category === 'string' ? req.query.category : undefined;
        let result;
        if (category) {
            result = await pool.query('SELECT * FROM programs WHERE category = $1 ORDER BY sort_order ASC, created_at DESC', [category]);
        } else {
            result = await pool.query('SELECT * FROM programs ORDER BY sort_order ASC, created_at DESC');
        }
        res.json(result.rows.map(toCamel));
    } catch {
        res.status(500).json({ error: 'Failed to fetch programs' });
    }
};

// GET /api/programs/:slug
export const getProgramBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM programs WHERE slug = $1', [req.params.slug]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Program not found' });
            return;
        }
        res.json(toCamel(result.rows[0]));
    } catch {
        res.status(500).json({ error: 'Failed to fetch program' });
    }
};

// POST /api/programs (admin)
export const createProgram = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, category, subfaculty, description, fullDescription, curriculum, selarUrl, image, model, testimonials, featured, order, isOpenForIntake, objectives } = req.body;
        const slug = slugify(title || '');
        const result = await pool.query(
            `INSERT INTO programs (title, slug, category, subfaculty, description, full_description, curriculum, selar_url, image, model, testimonials, featured, sort_order, is_open_for_intake, objectives)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
            [title, slug, category, subfaculty || null, description, fullDescription || null, curriculum || [], selarUrl || 'https://selar.co/placeholder', image || '', model || 'Bootcamp', JSON.stringify(testimonials || []), featured || false, order || 0, isOpenForIntake !== undefined ? isOpenForIntake : true, objectives || []]
        );
        res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to create program';
        res.status(400).json({ error: msg });
    }
};

// PUT /api/programs/:id (admin)
export const updateProgram = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, category, subfaculty, description, fullDescription, curriculum, selarUrl, image, model, testimonials, featured, order, isOpenForIntake, objectives } = req.body;
        const result = await pool.query(
            `UPDATE programs SET title = COALESCE($1, title), category = COALESCE($2, category), subfaculty = COALESCE($3, subfaculty),
             description = COALESCE($4, description), full_description = COALESCE($5, full_description), curriculum = COALESCE($6, curriculum),
             selar_url = COALESCE($7, selar_url), image = COALESCE($8, image), model = COALESCE($9, model),
             testimonials = COALESCE($10, testimonials), featured = COALESCE($11, featured), sort_order = COALESCE($12, sort_order),
             is_open_for_intake = COALESCE($13, is_open_for_intake), objectives = COALESCE($14, objectives),
             updated_at = NOW() WHERE id = $15 RETURNING *`,
            [title, category, subfaculty, description, fullDescription, curriculum, selarUrl, image, model, testimonials ? JSON.stringify(testimonials) : null, featured, order, isOpenForIntake, objectives, req.params.id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Program not found' });
            return;
        }
        res.json(result.rows[0]);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to update program';
        res.status(400).json({ error: msg });
    }
};

// DELETE /api/programs/:id (admin)
export const deleteProgram = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('DELETE FROM programs WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Program not found' });
            return;
        }
        res.json({ message: 'Program deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete program' });
    }
};
