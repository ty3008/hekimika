/**
 * Run this once to reset the admin credentials in the database.
 * Usage:  npx ts-node src/utils/resetAdmin.ts
 */
import pool from '../lib/db';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const EMAIL = process.env.ADMIN_RESET_EMAIL || process.env.ADMIN_EMAIL;
const PASSWORD = process.env.ADMIN_RESET_PASSWORD || process.env.ADMIN_PASSWORD;
const NAME = process.env.ADMIN_RESET_NAME || process.env.ADMIN_NAME || 'Hekimika Admin';

async function resetAdmin() {
    if (!EMAIL || !PASSWORD) {
        console.error('❌ Error: Both ADMIN_RESET_EMAIL (or ADMIN_EMAIL) and ADMIN_RESET_PASSWORD (or ADMIN_PASSWORD) environment variables must be set.');
        process.exit(1);
    }

    const hashed = await bcrypt.hash(PASSWORD, 12);

    const existing = await pool.query('SELECT id FROM admins WHERE email = $1', [EMAIL.toLowerCase()]);

    if (existing.rows.length > 0) {
        await pool.query(
            'UPDATE admins SET password = $1, name = $2 WHERE email = $3',
            [hashed, NAME, EMAIL.toLowerCase()]
        );
        console.log(`✅ Admin password updated for: ${EMAIL}`);
    } else {
        await pool.query(
            'INSERT INTO admins (email, password, name) VALUES ($1, $2, $3)',
            [EMAIL.toLowerCase(), hashed, NAME]
        );
        console.log(`✅ Admin created: ${EMAIL}`);
    }

    await pool.end();
}

resetAdmin().catch((err) => {
    console.error('❌ Reset failed:', err);
    process.exit(1);
});
