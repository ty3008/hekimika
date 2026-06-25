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
import highlightRoutes from './routes/highlights.routes';
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
    'https://hekimika.netlify.app',
    'https://www.hekimika.netlify.app',
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

// Root route — keeps Render's health check happy and prevents the service
// from being marked as failing/sleeping due to a 404 on GET /
app.get('/', (_req, res) => {
    res.json({ status: 'ok', message: 'Hekimika API is live 🚀' });
});

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
app.use('/api/highlights', highlightRoutes);

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
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('   🌿 Hekimika Backend — Starting Up');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   PORT          : ${PORT}`);
    console.log(`   NODE_ENV      : ${process.env.NODE_ENV || 'development'}`);
    console.log(`   Allowed origins: ${allowedOrigins.join(', ')}`);
    console.log('');
    console.log('   📦 Routes mounted:');
    console.log('      GET  /');
    console.log('      GET  /api/health');
    console.log('      ALL  /api/auth');
    console.log('      ALL  /api/programs');
    console.log('      ALL  /api/books');
    console.log('      ALL  /api/blog');
    console.log('      ALL  /api/devotionals');
    console.log('      ALL  /api/free-resources');
    console.log('      ALL  /api/events');
    console.log('      ALL  /api/registrations');
    console.log('      ALL  /api/contact');
    console.log('      ALL  /api/testimonials');
    console.log('      ALL  /api/highlights');
    console.log('');

    try {
        const connected = await testConnection();
        if (connected) {
            await initDB();
            await seedAdmin();
            await seedPrograms();
            console.log('✅ Database setup complete');
        } else {
            console.warn('⚠️  Starting without database connection');
        }
    } catch (err: any) {
        console.error('❌ Database setup error:', err.message);
    }

    app.listen(PORT, () => {
        console.log('');
        console.log(`🚀 Hekimika server is LIVE on port ${PORT}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('');
    });
};

start();

export default app;
