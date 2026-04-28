import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../lib/db';

const signToken = (id: number): string =>
    jwt.sign({ id: String(id) }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email.toLowerCase()]);
        const admin = result.rows[0];

        if (!admin) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = signToken(admin.id);
        res.json({
            token,
            admin: { id: admin.id, email: admin.email, name: admin.name },
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getMe = async (req: Request & { adminId?: string }, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT id, email, name, created_at FROM admins WHERE id = $1', [req.adminId]);
        const admin = result.rows[0];
        if (!admin) {
            res.status(404).json({ error: 'Admin not found' });
            return;
        }
        res.json(admin);
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
};
