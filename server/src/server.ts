import express from 'express';
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
import testimonialRoutes from './routes/testimonials.routes';
import { seedAdmin, seedPrograms } from './utils/seed';
import { testConnection, initDB } from './lib/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const FRONTEND_URL = process.env.FRONTEND_URL || '';
const JWT_SECRET = process.env.JWT_SECRET;

const allowedOrigins = [
    CLIENT_URL,
    FRONTEND_URL,
    'http://localhost:5173',
    'https://hekimika.org',
    'https://www.hekimika.org',
].filter(Boolean);

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
app.use('/api/testimonials', testimonialRoutes);

// Health check
app.get('/api/health', async (_req, res) => {
    const dbConnected = await testConnection();
    res.json({
        status: 'ok',
        message: 'Hekimika API is running',
        database: dbConnected ? 'connected' : 'disconnected',
    });
});

// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Connect to Postgres and start server
const start = async () => {
    try {
        const connected = await testConnection();
        if (connected) {
            await initDB();
            await seedAdmin();
            await seedPrograms();
        } else {
            console.warn('⚠️  Starting without database connection');
        }
    } catch (err: any) {
        console.error('❌ Database setup error:', err.message);
    }

    app.listen(PORT, () => {
        console.log(`🚀 Hekimika server running on port ${PORT}`);
    });
};

start();

export default app;
