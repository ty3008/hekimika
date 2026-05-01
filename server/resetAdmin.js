const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const EMAIL = 'hekimika001@gmail.com';
const PASSWORD = 'Hekimika@2024';
const NAME = 'Hekimika Admin';

async function run() {
    const hashed = await bcrypt.hash(PASSWORD, 12);
    const existing = await pool.query('SELECT id FROM admins WHERE email = $1', [EMAIL]);
    if (existing.rows.length > 0) {
        await pool.query('UPDATE admins SET password = $1, name = $2 WHERE email = $3', [hashed, NAME, EMAIL]);
        console.log('SUCCESS: Password updated for: ' + EMAIL);
    } else {
        await pool.query('INSERT INTO admins (email, password, name) VALUES ($1, $2, $3)', [EMAIL, hashed, NAME]);
        console.log('SUCCESS: Admin created: ' + EMAIL);
    }
    await pool.end();
}

run().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
