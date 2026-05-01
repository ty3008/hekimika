/**
 * Run this once to reset the admin credentials in the database.
 * Usage:  npx ts-node src/utils/resetAdmin.ts
 */
import pool from '../lib/db';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const EMAIL = 'hekimika001@gmail.com';
const PASSWORD = 'Hekimika@2024';
const NAME = 'Hekimika Admin';

async function resetAdmin() {
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
