import PreparingForLoveImg from '../assets/Preparing for Love Book_Manual.png';
import ChoosingWellImg from '../assets/Choosing Well.png';
import KeepersImg from '../assets/Keepers.png';
import ConflictResolutionImg from '../assets/Coupled and Built.png';
import BeginningRightImg from '../assets/Life Coaching- Couples.png';
import SchoolOfPurityImg from '../assets/Life Changing - Singles.png';
import SchoolOfHealingImg from '../assets/School of Healing.png';
import BuiltToLeadImg from '../assets/Built to Lead.png';

export const PROGRAMS: {
    title: string;
    slug: string;
    category: string;
    subfaculty?: string;
    description: string;
    model: string;
    image: string;
    selarUrl: string;
    curriculum: string[];
}[] = [
        // Single & Built
        {
            title: 'Preparing for Love',
            slug: 'preparing-for-love',
            category: 'Single & Built',
            description: 'A comprehensive journey equipping singles with wisdom, values, and godly principles to prepare their hearts for love and lasting relationships.',
            model: '8-week',
            image: PreparingForLoveImg,
            selarUrl: 'https://selar.co/preparing-for-love',
            curriculum: [
                'Week 1: Understanding Your Identity in Christ',
                'Week 2: The Purpose of Relationships',
                'Week 3: Healing & Wholeness',
                'Week 4: Standards, Values & Boundaries',
                'Week 5: Emotional Maturity',
                'Week 6: Recognizing Readiness',
                'Week 7: Purity & Guarding Your Heart',
                'Week 8: Walking in Wisdom',
            ],
        },
        {
            title: 'Choosing Well',
            slug: 'choosing-well',
            category: 'Single & Built',
            description: 'Practical wisdom for singles on how to discern, evaluate, and intentionally choose a life partner aligned with God\'s purpose.',
            model: '8-week',
            image: ChoosingWellImg,
            selarUrl: 'https://selar.co/choosing-well',
            curriculum: [
                'Week 1: The Foundation of Godly Choice',
                'Week 2: Character Over Chemistry',
                'Week 3: Spiritual Compatibility',
                'Week 4: Red Flags & Green Flags',
                'Week 5: Family Background & Its Impact',
                'Week 6: Purposeful Courtship',
                'Week 7: Seeking Counsel & Accountability',
                'Week 8: Making the Decision',
            ],
        },
        {
            title: 'Keepers',
            slug: 'keepers',
            category: 'Single & Built',
            description: 'A life changing program for Training Singles on how to keep what they have and enjoy long-term relationships.',
            model: '8-week',
            image: KeepersImg,
            selarUrl: 'https://selar.co/keepers',
            curriculum: [
                'Week 1: Who Is a Keeper?',
                'Week 2: Internal Transformation',
                'Week 3: Discipline & Diligence',
                'Week 4: Financial Stewardship',
                'Week 5: Spiritual Growth',
                'Week 6: Purpose & Vision',
                'Week 7: Building Community',
                'Week 8: Ready to Covenant',
            ],
        },
        // Couples
        {
            title: 'Conflict Resolution',
            slug: 'conflict-resolution',
            category: 'Couples',
            description: 'Practical tools for couples to navigate disagreements with grace, build understanding, and strengthen their union.',
            model: 'workshop',
            image: ConflictResolutionImg,
            selarUrl: 'https://selar.co/conflict-resolution',
            curriculum: [
                'Session 1: Understanding Conflict Styles',
                'Session 2: The Art of Listening',
                'Session 3: Communication Frameworks',
                'Session 4: Forgiveness & Restoration',
                'Session 5: Practical Conflict Tools',
            ],
        },
        {
            title: 'Beginning Right',
            slug: 'beginning-right',
            category: 'Couples',
            description: 'Designed for newlyweds and engaged couples — setting strong spiritual, relational, and practical foundations for marriage.',
            model: '8-week',
            image: BeginningRightImg,
            selarUrl: 'https://selar.co/beginning-right',
            curriculum: [
                'Week 1: The Covenant of Marriage',
                'Week 2: Roles & Responsibilities',
                'Week 3: Communication Mastery',
                'Week 4: Finances Together',
                'Week 5: Physical Intimacy God\'s Way',
                'Week 6: Extended Family Dynamics',
                'Week 7: Building Spiritual Rhythms',
                'Week 8: Vision for Your Home',
            ],
        },
        // Schools
        {
            title: 'School of Purity',
            slug: 'school-of-purity',
            category: 'Schools',
            description: 'A transformative school helping believers walk in sexual purity, overcome pornography, and embrace their God-given identity.',
            model: '8-week',
            image: SchoolOfPurityImg,
            selarUrl: 'https://selar.co/school-of-purity',
            curriculum: [
                'Week 1: The Theology of the Body',
                'Week 2: Understanding Addiction',
                'Week 3: Renewing the Mind',
                'Week 4: Breaking Soul Ties',
                'Week 5: Accountability Structures',
                'Week 6: Digital Boundaries',
                'Week 7: Walking in Freedom',
                'Week 8: Sustaining Purity',
            ],
        },
        {
            title: 'School of Healing',
            slug: 'school-of-healing',
            category: 'Schools',
            description: 'A safe space for inner healing from trauma, rejection, abuse, and heartbreak — restoring the whole person.',
            model: '8-week',
            image: SchoolOfHealingImg,
            selarUrl: 'https://selar.co/school-of-healing',
            curriculum: [
                'Week 1: Understanding Emotional Wounds',
                'Week 2: The Father\'s Heart',
                'Week 3: Healing Trauma',
                'Week 4: Overcoming Rejection',
                'Week 5: Releasing Unforgiveness',
                'Week 6: Renewing Your Identity',
                'Week 7: Rebuilding Trust',
                'Week 8: Wholeness & Purpose',
            ],
        },
        // Leadership
        {
            title: 'Fountain',
            slug: 'fountain',
            category: 'Leadership',
            description: 'Raising leaders who are grounded in the Word, accountable in character, and effective in Kingdom influence.',
            model: 'ongoing',
            image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
            selarUrl: 'https://selar.co/fountain',
            curriculum: [
                'Module 1: Servant Leadership',
                'Module 2: The Power of Influence',
                'Module 3: Leading with Integrity',
                'Module 4: Vision Casting',
                'Module 5: Building Teams',
                'Module 6: Mentorship',
            ],
        },
        {
            title: 'Built to Lead',
            slug: 'built-to-lead',
            category: 'Leadership',
            description: 'An intensive leadership development track for those called to lead homes, businesses, ministries, and nations.',
            model: '8-week',
            image: BuiltToLeadImg,
            selarUrl: 'https://selar.co/built-to-lead',
            curriculum: [
                'Week 1: Leadership Identity',
                'Week 2: Decision Making',
                'Week 3: Strategic Planning',
                'Week 4: Emotional Intelligence',
                'Week 5: Conflict & Crisis Management',
                'Week 6: Communication & Influence',
                'Week 7: Sustainability & Self-Care',
                'Week 8: Legacy Leadership',
            ],
        },
        {
            title: 'Perfected in Ministry',
            slug: 'perfected-in-ministry',
            category: 'Leadership',
            description: 'Developed for ministers and church workers — equipping the called with sound doctrine, pastoral wisdom, and ministry excellence.',
            model: '8-week',
            image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800',
            selarUrl: 'https://selar.co/perfected-in-ministry',
            curriculum: [
                'Week 1: The Call & The Cost',
                'Week 2: Biblical Foundation',
                'Week 3: Preaching & Teaching',
                'Week 4: Pastoral Care',
                'Week 5: Church Administration',
                'Week 6: Counseling Basics',
                'Week 7: Worship & Intercession',
                'Week 8: Ministry Sustainability',
            ],
        },
        {
            title: 'Purpose',
            slug: 'purpose',
            category: 'Purpose',
            description: 'where someone learns and awakens to their God designed purpose and Destiny while solidifying in their identity.',
            model: 'workshop',
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
            selarUrl: 'https://selar.co/discovery-class',
            curriculum: [
                'Session 1: Hekimika Vision & Values',
                'Session 2: Arms of the Ministry',
                'Session 3: Finding Your Track',
                'Session 4: Community & Covenant',
            ],
        },
    ];

export const TESTIMONIALS = [
    {
        id: 1,
        name: 'Grace M.',
        program: 'Preparing for Love',
        text: 'Hekimika gave me more than I expected. I came broken and left whole. My understanding of relationships has been completely transformed.',
        photo: 'https://i.pravatar.cc/150?img=47',
    },
    {
        id: 2,
        name: 'James & Ruth O.',
        program: 'Beginning Right',
        text: 'Beginning Right gave us the tools to build our marriage on God\'s blueprint from day one. We\'re forever grateful.',
        photo: 'https://i.pravatar.cc/150?img=32',
    },
    {
        id: 3,
        name: 'Daniel K.',
        program: 'School of Purity',
        text: 'After 7 years of struggling with pornography, School of Purity brought me to genuine freedom. This is real transformation.',
        photo: 'https://i.pravatar.cc/150?img=59',
    },
    {
        id: 4,
        name: 'Naomi W.',
        program: 'School of Healing',
        text: 'I never thought I could be whole again after what I went through. School of Healing was my turning point. I\'m finally at peace.',
        photo: 'https://i.pravatar.cc/150?img=43',
    },
    {
        id: 5,
        name: 'Samuel & Esther L.',
        program: 'Conflict Resolution',
        text: 'We were on the brink of giving up. This program saved our marriage and gave us language to truly hear each other.',
        photo: 'https://i.pravatar.cc/150?img=11',
    },
];

export const NAV_LINKS = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Programs', path: '/perfected-in-wisdom' },
    { label: 'Wisdom Moments', path: '/wisdom-moments' },
    { label: 'Teens Corner', path: '/young-and-wise' },
    { label: 'Resources', path: '/resources' },
    { label: 'Contact', path: '/contact' },
];

export const PROGRAM_CATEGORIES = [
    'All',
    'Single & Built',
    'Couples',
    'Schools',
    'Leadership',
    'Purpose',
];
