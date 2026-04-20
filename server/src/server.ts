import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.routes';
import programRoutes from './routes/programs.routes';
import bookRoutes from './routes/books.routes';
import blogRoutes from './routes/blog.routes';
import devotionalRoutes from './routes/devotionals.routes';
import freeResourceRoutes from './routes/freeResources.routes';
import eventRoutes from './routes/events.routes';
import registrationRoutes from './routes/registrations.routes';
import contactRoutes from './routes/contact.routes';
import { seedAdmin } from './utils/seed';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const FRONTEND_URL = process.env.FRONTEND_URL || '';
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const allowedOrigins = [
    CLIENT_URL,
    FRONTEND_URL,
    'http://localhost:5173',
    'https://hekimika.org',
    'https://www.hekimika.org',
].filter(Boolean);

if (!MONGO_URI) {
    throw new Error('MONGO_URI is required in environment variables.');
}

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is required in environment variables.');
}

// Security middleware
app.use(helmet());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { error: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/devotionals', devotionalRoutes);
app.use('/api/free-resources', freeResourceRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'Hekimika API is running' });
});

// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Connect to MongoDB and start server
mongoose
    .connect(MONGO_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB Atlas');
        await seedAdmin();
        app.listen(PORT, () => {
            console.log(`🚀 Hekimika server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        // Start anyway for UI verification purposes without DB
        app.listen(PORT, () => {
            console.log(`🚀 Hekimika server running on port ${PORT} (No DB)`);
        });
    });

export default app;
