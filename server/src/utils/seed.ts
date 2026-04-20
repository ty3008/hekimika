import Admin from '../models/Admin';
import bcrypt from 'bcryptjs';

/**
 * Seeds the default admin user on first startup.
 * Uses environment variables ADMIN_EMAIL and ADMIN_PASSWORD.
 */
export const seedAdmin = async (): Promise<void> => {
    try {
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        const name = process.env.ADMIN_NAME || 'Hekimika Admin';

        if (!email || !password) {
            console.warn('⚠️ Skipping admin seed. Set ADMIN_EMAIL and ADMIN_PASSWORD.');
            return;
        }

        const existingAdmin = await Admin.findOne({ email });

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(password, 12);
            await Admin.create({
                email,
                password: hashedPassword,
                name,
            });
            console.log(`✅ Admin seeded: ${email}`);
        }
    } catch (err) {
        console.error('❌ Admin seed error:', err);
    }
};
