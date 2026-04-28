import pool from '../lib/db';
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

        const existing = await pool.query('SELECT id FROM admins WHERE email = $1', [email.toLowerCase()]);

        if (existing.rows.length === 0) {
            const hashedPassword = await bcrypt.hash(password, 12);
            await pool.query(
                'INSERT INTO admins (email, password, name) VALUES ($1, $2, $3)',
                [email.toLowerCase(), hashedPassword, name]
            );
            console.log(`✅ Admin seeded: ${email}`);
        }
    } catch (err) {
        console.error('❌ Admin seed error:', err);
    }
};

/**
 * Seeds initial programs if the table is empty.
 */
export const seedPrograms = async (): Promise<void> => {
    try {
        const count = await pool.query('SELECT COUNT(*) FROM programs');
        // We will update rather than skip if count > 0 to ensure latest data is synced, 
        // but for safety let's only skip if we are in production.
        // For now, let's just insert missing ones or update all if it's a small set.
        
        const programs = [
            {
                title: 'Single & Built (Preparing for Love)',
                slug: 'preparing-for-love',
                category: 'Single & Built',
                description: 'Preparation is key in all areas of life. This is a program for any single person who wants to be sharpened for a better and supreme experience in love and relationships.',
                full_description: 'Preparation is key in all areas of life. This is a program for any single person who wants to be sharpened for a better and supreme experience in love and relationships. This is a transformative mentorship and building arm of Hekimika that focuses on imparting Wisdom in specific areas.',
                objectives: [
                    'To explain the importance of preparation',
                    'To highlight the value of good internal formation in love and relationships',
                    'To bring of God’s love and lead to healing to the areas that are wounded',
                    'To define, highlight and explain the value of wholeness and singleness',
                    'To help define right and wrong reasons why people get into relationships',
                    'To explain the value of intimacy with God in a long term relationship and marriage'
                ],
                model: 'Bootcamp',
                image: 'single and built pic.jpeg',
                selar_url: 'https://selar.co/preparing-for-love',
                curriculum: [
                    'A workbook which has readings and reflection questions',
                    'Eight Lessons',
                    'A WhatsApp group for program coordination and interactions',
                    'Prayer Sessions to pray for the things we learn and receive grace to help',
                    'Interactive sessions',
                    'Question and Answer Sessions',
                    'Some Lessons include: Form and Function, Intimacy, Contentment, Why People Enter into Relationships, Singleness, etc.'
                ],
                is_open_for_intake: true
            },
            {
                title: 'Single & Built (Choosing Well)',
                slug: 'choosing-well',
                category: 'Single & Built',
                description: 'After preparing well for love and relationships, the next big thing is who you choose. This is a program for any single person who wants to be equipped with Wisdom for choosing well.',
                full_description: 'After preparing well for love and relationships, the next big thing is who you choose. This is a program for any single person who wants to be equipped with Wisdom for choosing well. Choosing well is vital for a success in love and relationship.',
                objectives: [
                    'To explain the importance of choosing well',
                    'To highlight the factors that influence your choices',
                    'To explain the important choices before and after a relationship',
                    'To highlight common unnecessary pains that come from choices and how to avoid them',
                    'To explain why some relationships work and some fail',
                    'To explain the importance of emotional maturity and how to avoid unnecessary ties with the opposite sex commonly referred to as situationships'
                ],
                model: 'Bootcamp',
                image: 'Choosing Well.png',
                selar_url: 'https://selar.co/choosing-well',
                curriculum: [
                    'A workbook which has readings and reflection questions',
                    'Seven Lessons',
                    'A WhatsApp group for program coordination and interactions',
                    'Prayer Sessions to pray for the things we learn and receive grace to help',
                    'Interactive sessions',
                    'Question and Answer Sessions',
                    'Some Lessons include: Choosing Well, The Importance of Choosing Well, Vital Choices before and after, Protecting Yourself from Unnecessary Pains, Situationship, etc.'
                ],
                is_open_for_intake: true
            },
            {
                title: 'Single & Built (Keepers)',
                slug: 'keepers',
                category: 'Single & Built',
                description: 'It is not enough to begin a relationship, it is important to be equipped to have a long-term relationship that can lead to marriage.',
                full_description: 'It is not enough to begin a relationship; it is critical to be equipped with the Wisdom to sustain it. Keepers is a specialized track for singles who are ready to move beyond the excitement of a new relationship into the intentional building of a lasting, God-honoring union that leads to marriage.',
                objectives: [
                    'To define the qualities of a "Keeper" in a relationship',
                    'To understand the transition from dating to intentional building',
                    'To highlight the importance of internal transformation'
                ],
                model: 'Bootcamp',
                image: 'Keepers.png',
                selar_url: 'https://selar.co/keepers',
                curriculum: ['Who Is a Keeper?', 'Internal Transformation', 'Financial Stewardship', 'Purpose Alignment'],
                is_open_for_intake: false
            },
            {
                title: 'School of Purity (Purity Basics)',
                slug: 'school-of-purity',
                category: 'Schools',
                description: 'Purity is not just the absence of sexual misconduct, purity a state and lifestyle.',
                full_description: 'Purity is a state and a lifestyle that everyone should aspire for. This program trains you in victory within and loving the pureness of heart.',
                objectives: ['To define purity', 'To bring healing of the heart', 'To amplify focus on the life of victory'],
                model: 'Bootcamp',
                image: 'Life Changing - Singles.png',
                selar_url: 'https://selar.co/school-of-purity',
                curriculum: ['Purity Basics', 'Loving the Pureness of Heart', 'Victory Within', 'Building Yourself'],
                is_open_for_intake: true
            },
            {
                title: 'Beginning Right (Romance Bae-sics)',
                slug: 'beginning-right',
                category: 'Couples',
                description: 'It is vital to begin right and enjoy a long-term relationship.',
                full_description: 'Beginning right sets the foundation for a life-long union. This program builds couples who have just started dating.',
                objectives: ['To highlight the value of good internal formation', 'To help define right reasons for relationship'],
                model: 'Bootcamp',
                image: 'beginning right.jpeg',
                selar_url: 'https://selar.co/beginning-right',
                curriculum: ['Form and Function', 'Intimacy', 'Contentment', 'Why People Enter Relationships'],
                is_open_for_intake: true
            },
            {
                title: 'Coupled & Built (Conflict Resolution)',
                slug: 'conflict-resolution',
                category: 'Couples',
                description: 'Depth and insight to couples for conflict resolution.',
                full_description: 'Conflict resolution is a vital skill for every long term relationship. We provide insight for resolving unsolvable and solvable issues.',
                objectives: ['To give a proper view of conflict', 'To explain source of conflicts'],
                model: 'Bootcamp',
                image: 'Coupled and Built.png',
                selar_url: 'https://selar.co/conflict-resolution',
                curriculum: ['A Proper View of Conflict', 'The Place of Communication', 'Affirming Love'],
                is_open_for_intake: true
            }
        ];

        for (const p of programs) {
            // Use UPSERT logic (ON CONFLICT) to ensure data is updated/inserted
            await pool.query(
                `INSERT INTO programs (title, slug, category, description, full_description, objectives, model, image, selar_url, curriculum, is_open_for_intake)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                 ON CONFLICT (slug) DO UPDATE SET
                    title = EXCLUDED.title,
                    category = EXCLUDED.category,
                    description = EXCLUDED.description,
                    full_description = EXCLUDED.full_description,
                    objectives = EXCLUDED.objectives,
                    model = EXCLUDED.model,
                    image = EXCLUDED.image,
                    selar_url = EXCLUDED.selar_url,
                    curriculum = EXCLUDED.curriculum,
                    is_open_for_intake = EXCLUDED.is_open_for_intake,
                    updated_at = NOW()`,
                [p.title, p.slug, p.category, p.description, p.full_description, p.objectives, p.model, p.image, p.selar_url, p.curriculum, p.is_open_for_intake]
            );
        }
        console.log('✅ Programs seeded/synced');
    } catch (err) {
        console.error('❌ Program seed error:', err);
    }
};
