import * as dotenv from 'dotenv';
dotenv.config();
import pool from './src/lib/db';

async function updateConstraint() {
    try {
        console.log('Connecting to database...');
        const client = await pool.connect();
        
        console.log('Dropping existing check constraint...');
        await client.query(`
            ALTER TABLE free_resources 
            DROP CONSTRAINT IF EXISTS free_resources_type_check;
        `);
        
        console.log('Adding new check constraint...');
        await client.query(`
            ALTER TABLE free_resources 
            ADD CONSTRAINT free_resources_type_check 
            CHECK (type IN ('Magazine', 'Devotional', 'FreeBook', 'TeensLibrary'));
        `);
        
        console.log('Successfully updated constraint!');
        client.release();
        process.exit(0);
    } catch (err) {
        console.error('Error updating constraint:', err);
        process.exit(1);
    }
}

updateConstraint();
