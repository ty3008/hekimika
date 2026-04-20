import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';

const signToken = (id: string): string =>
    jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        const admin = await Admin.findOne({ email: email.toLowerCase() });
        if (!admin) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = signToken(String(admin._id));
        res.json({
            token,
            admin: { id: admin._id, email: admin.email, name: admin.name },
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getMe = async (req: Request & { adminId?: string }, res: Response): Promise<void> => {
    try {
        const admin = await Admin.findById(req.adminId).select('-password');
        if (!admin) {
            res.status(404).json({ error: 'Admin not found' });
            return;
        }
        res.json(admin);
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
};
