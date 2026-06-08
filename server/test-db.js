const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

console.log('DATABASE_URL is:', process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

async function test() {
    try {
        console.log('Connecting...');
        const client = await pool.connect();
        console.log('Connected. Querying...');
        const res = await client.query('SELECT NOW()');
        console.log('Query result:', res.rows[0]);
        client.release();
        await pool.end();
        console.log('Success!');
    } catch (err) {
        console.error('Error connecting or querying:', err);
        process.exit(1);
    }
}

test();
