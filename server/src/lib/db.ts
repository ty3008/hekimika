import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL is not set. Database operations will fail.');
}

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err) => {
    console.error('❌ Unexpected Postgres pool error:', err.message);
});

/**
 * Test the database connection.
 */
export const testConnection = async (): Promise<boolean> => {
    try {
        const client = await pool.connect();
        await client.query('SELECT NOW()');
        client.release();
        console.log('✅ Connected to Supabase Postgres');
        return true;
    } catch (err: any) {
        console.error('❌ Postgres connection error:', err.message);
        return false;
    }
};

/**
 * Initialize all database tables if they don't exist.
 */
export const initDB = async (): Promise<void> => {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS admins (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255) DEFAULT 'Admin',
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS programs (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) UNIQUE NOT NULL,
                category VARCHAR(100) NOT NULL,
                subfaculty VARCHAR(255),
                description TEXT NOT NULL,
                full_description TEXT,
                curriculum TEXT[] DEFAULT '{}',
                selar_url VARCHAR(500) DEFAULT 'https://selar.co/placeholder',
                image VARCHAR(500) DEFAULT '',
                model VARCHAR(20) DEFAULT '8-week',
                testimonials JSONB DEFAULT '[]',
                featured BOOLEAN DEFAULT false,
                sort_order INTEGER DEFAULT 0,
                is_open_for_intake BOOLEAN DEFAULT true,
                objectives TEXT[] DEFAULT '{}',
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS books (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255) DEFAULT 'Pastor Kevin Mulati',
                description TEXT NOT NULL,
                cover_image TEXT DEFAULT '',
                price VARCHAR(50) NOT NULL,
                selar_url VARCHAR(500) DEFAULT 'https://selar.co/placeholder',
                category VARCHAR(100) DEFAULT 'General',
                featured BOOLEAN DEFAULT false,
                sort_order INTEGER DEFAULT 0,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS blog_posts (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) UNIQUE NOT NULL,
                content TEXT NOT NULL,
                excerpt TEXT NOT NULL,
                cover_image TEXT,
                author VARCHAR(255) DEFAULT 'Pastor Kevin Mulati',
                published_at TIMESTAMPTZ DEFAULT NOW(),
                tags TEXT[] DEFAULT '{}',
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS devotionals (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                scripture VARCHAR(500) NOT NULL,
                date TIMESTAMPTZ DEFAULT NOW(),
                author VARCHAR(255) DEFAULT 'Pastor Kevin Mulati',
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS events (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT DEFAULT '',
                location VARCHAR(255) DEFAULT '',
                start_date TIMESTAMPTZ NOT NULL,
                end_date TIMESTAMPTZ,
                registration_url VARCHAR(500) DEFAULT '',
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS free_resources (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                short_description TEXT NOT NULL,
                type VARCHAR(50) NOT NULL CHECK (type IN ('Magazine', 'Devotional', 'FreeBook')),
                google_drive_link VARCHAR(500) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS registrations (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50) DEFAULT '',
                program_slug VARCHAR(255) DEFAULT '',
                event_id INTEGER REFERENCES events(id) ON DELETE SET NULL,
                notes TEXT DEFAULT '',
                source VARCHAR(20) DEFAULT 'general' CHECK (source IN ('program', 'event', 'general')),
                status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed')),
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS contact_messages (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) DEFAULT '',
                email VARCHAR(255) NOT NULL,
                subject VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS testimonials (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                program VARCHAR(255) NOT NULL,
                text TEXT NOT NULL,
                photo VARCHAR(500) DEFAULT 'https://i.pravatar.cc/150?img=11',
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
            
            -- Ensure columns exist for existing tables
            ALTER TABLE programs ADD COLUMN IF NOT EXISTS is_open_for_intake BOOLEAN DEFAULT true;
            ALTER TABLE programs ADD COLUMN IF NOT EXISTS objectives TEXT[] DEFAULT '{}';
        `);
        console.log('✅ Database tables initialized');
    } catch (err: any) {
        console.error('❌ Error initializing tables:', err.message);
    } finally {
        client.release();
    }
};

export default pool;
