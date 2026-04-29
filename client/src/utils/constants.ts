import PreparingForLoveImg from '../assets/single and built pic.jpeg';
import ChoosingWellImg from '../assets/Choosing Well.png';
import KeepersImg from '../assets/Keepers.png';
import ConflictResolutionImg from '../assets/Coupled and Built.png';
import BeginningRightImg from '../assets/beginning right.jpeg';
import SchoolOfPurityImg from '../assets/Life Changing - Singles.png';
import SchoolOfHealingImg from '../assets/School of Healing.png';
import BuiltToLeadImg from '../assets/Built to Lead.png';

export interface Program {
    title: string;
    slug: string;
    category: string;
    subfaculty?: string;
    description: string;
    fullDescription?: string;
    objectives?: string[];
    model: string;
    image: string;
    selarUrl: string;
    curriculum: string[];
    is_open_for_intake?: boolean;
}

export const PROGRAMS: Program[] = [
    // Single & Built
    {
        title: 'Single & Built (Preparing for Love)',
        slug: 'preparing-for-love',
        category: 'Single & Built',
        description: 'Preparation is key in all areas of life. This is a program for any single person who wants to be sharpened for a better and supreme experience in love and relationships.',
        fullDescription: 'Preparation is key in all areas of life. This is a program for any single person who wants to be sharpened for a better and supreme experience in love and relationships. This is a transformative mentorship and building arm of Hekimika that focuses on imparting Wisdom in specific areas.',
        objectives: [
            'To explain the importance of preparation',
            'To highlight the value of good internal formation in love and relationships',
            'To bring of God’s love and lead to healing to the areas that are wounded',
            'To define, highlight and explain the value of wholeness and singleness',
            'To help define right and wrong reasons why people get into relationships',
            'To explain the value of intimacy with God in a long term relationship and marriage'
        ],
        model: 'Bootcamp',
        image: PreparingForLoveImg,
        selarUrl: 'https://selar.co/preparing-for-love',
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
        fullDescription: 'After preparing well for love and relationships, the next big thing is who you choose. This is a program for any single person who wants to be equipped with Wisdom for choosing well. Choosing well is vital for a success in love and relationship.',
        objectives: [
            'To explain the importance of choosing well',
            'To highlight the factors that influence your choices',
            'To explain the important choices before and after a relationship',
            'To highlight common unnecessary pains that come from choices and how to avoid them',
            'To explain why some relationships work and some fail',
            'To explain the importance of emotional maturity and how to avoid unnecessary ties with the opposite sex commonly referred to as situationships'
        ],
        model: 'Bootcamp',
        image: ChoosingWellImg,
        selarUrl: 'https://selar.co/choosing-well',
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
        description: 'It is not enough to begin a relationship, it is important to be equipped to have a long-term relationship that can lead to marriage. This is a program for any single person who desires to be equipped to know how to build and keep a relationship.',
        fullDescription: 'It is not enough to begin a relationship; it is critical to be equipped with the Wisdom to sustain it. Keepers is a specialized track for singles who are ready to move beyond the excitement of a new relationship into the intentional building of a lasting, God-honoring union that leads to marriage. This program focuses on character, commitment, and the practicalities of a healthy long-term relationship.',
        objectives: [
            'To define the qualities of a "Keeper" in a relationship',
            'To understand the transition from dating to intentional building',
            'To highlight the importance of internal transformation for long-term success',
            'To explain the role of discipline, diligence, and financial stewardship in a growing relationship',
            'To help couples align their individual purpose with their shared vision'
        ],
        model: 'Bootcamp',
        image: KeepersImg,
        selarUrl: 'https://selar.co/keepers',
        curriculum: [
            'Who Is a Keeper?',
            'Internal Transformation & Growth',
            'Discipline & Diligence in Love',
            'Financial Stewardship for Couples',
            'Spiritual Growth & Shared Devotion',
            'Purpose & Vision Alignment',
            'Building Community Support',
            'Ready for Sacred Covenant'
        ],
        is_open_for_intake: false
    },
    {
        title: 'School of Purity (Purity Basics)',
        slug: 'school-of-purity',
        category: 'Schools',
        description: 'Purity is not just the absence of sexual misconduct, purity a state and lifestyle. This is a program to train people in a life of purity. It is for ALL, not just for people having sexual issues, but for everyone.',
        fullDescription: 'Purity is not just the absence of sexual misconduct, purity a state and lifestyle. This is a program to train people in a life of purity. It is for ALL, not just for people having sexual issues, but for everyone. Purity is a state and a lifestyle that everyone should aspire for.',
        objectives: [
            'To define purity',
            'To explain the advantage of purity and what impurity does to people’s lives',
            'To bring healing of the heart',
            'To explain the value of loving the pureness of heart',
            'To sensitize the importance of the heart enjoying true beauty and sweetness',
            'To enforce a good attitude on sex and sexuality',
            'To explain how to deal with various kinds of sexual fire',
            'To amplify focus on the life of victory'
        ],
        model: 'Bootcamp',
        image: SchoolOfPurityImg,
        selarUrl: 'https://selar.co/school-of-purity',
        curriculum: [
            'A book or books',
            'Eight Lessons',
            'A WhatsApp group for program coordination and interactions',
            'Prayer Sessions to pray for the things we learn and receive grace to help',
            'Interactive sessions',
            'Question and Answer Sessions',
            'Some Lessons include: Burning, Purity Basics, Loving the Pureness of Heart, Victory Within, Building Yourself, etc.'
        ],
        is_open_for_intake: true
    },
    {
        title: 'Beginning Right (Romance Bae-sics)',
        slug: 'beginning-right',
        category: 'Couples',
        description: 'It is vital to begin right and enjoy a long-term relationship. This is an 8-week program to build couples who have just started dating for a long-term relationship.',
        fullDescription: 'It is vital to begin right and enjoy a long-term relationship. This is an 8-week program to build couples who have just started dating for a long-term relationship. Beginning right sets the foundation for a life-long union.',
        objectives: [
            'To highlight the value of good internal formation in love and relationships',
            'To bring of God’s love and lead to healing to the areas that are wounded',
            'To define, highlight and explain the value of wholeness and singleness',
            'To help define right and wrong reasons why people get into relationships and help define why the individuals are in the relationship',
            'To explain the value of intimacy with God in a long term relationship and marriage',
            'To highlight the value of contentment in love'
        ],
        model: 'Bootcamp',
        image: BeginningRightImg,
        selarUrl: 'https://selar.co/beginning-right',
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
        title: 'Coupled & Built (Conflict Resolution)',
        slug: 'conflict-resolution',
        category: 'Couples',
        description: 'This is a program aiming to provide depth and insight to couples who have been together for some time for conflict resolution.',
        fullDescription: 'This is a program aiming to provide depth and insight to couples who have been together for some time for conflict resolution. Conflict resolution is a vital skill for every long term relationship.',
        objectives: [
            'To give a proper view of conflict',
            'To explain the source of conflicts in love and relationships',
            'To give an understanding of communication in love and relationships for proper conflict resolution',
            'To explain the bottom line in conflict resolution',
            'To highlight things to do and not to do in conflict resolution',
            'To bring understanding on how to create a free atmosphere to address issues that rise in relationships',
            'To help see whether the issues are unsolvable or solvable',
            'To offer understanding on the importance of a mentor and neutral party in handling hard and persistent issues'
        ],
        model: 'Bootcamp',
        image: ConflictResolutionImg,
        selarUrl: 'https://selar.co/conflict-resolution',
        curriculum: [
            'A workbook which has readings and reflection questions',
            'Eight Lessons',
            'A WhatsApp group for program coordination and interactions',
            'Prayer Sessions to pray for the things we learn and receive grace to help',
            'Interactive sessions',
            'Question and Answer Sessions',
            'Some Lessons include: A Proper View of Conflict, Dos and Don’ts, The Place of Communication, Affirming Love, etc..'
        ],
        is_open_for_intake: true
    },
    {
        title: 'Built to Lead',
        slug: 'built-to-lead',
        category: 'Leadership',
        description: 'It takes the right attitude, formation and understanding to lead. This is a fireplace for the formation of leaders.',
        fullDescription: 'Leadership is as much about character as it is about competence. Built to Lead is a focused "fireplace" designed for the formation of leaders who value integrity, wisdom, and sacrificial service. This program equips you to lead yourself first, then others, fostering an ability that commands influence without the need for a title. It covers the essential pillars of kingdom leadership and strategic influence.',
        objectives: [
            'To cultivate a leadership identity rooted in character and integrity',
            'To enhance decision-making skills under various circumstances',
            'To explain the importance of strategic planning and vision execution',
            'To develop high levels of emotional intelligence for healthy interpersonal dynamics',
            'To equip leaders with crisis management and communication tools'
        ],
        model: 'Bootcamp',
        image: BuiltToLeadImg,
        selarUrl: 'https://selar.co/built-to-lead',
        curriculum: [
            'Leadership Identity & Self-Governance',
            'The Art of Wise Decision Making',
            'Strategic Planning & Vision Execution',
            'Emotional Intelligence in Leadership',
            'Conflict & Crisis Management Strategies',
            'Effective Communication & Influence',
            'Sustainability & Leadership Self-Care',
            'Creating a Lasting Legacy'
        ],
        is_open_for_intake: false
    },
    {
        title: 'School of Healing',
        slug: 'school-of-healing',
        category: 'Schools',
        description: 'A whole heart equals a whole life and beautiful experiences. This a program for those who desire to experience wholeness in life.',
        fullDescription: 'Unresolved emotional wounds can stifle your growth and impact. The School of Healing is a therapeutic program designed for those seeking wholeness from past traumas, heartbreaks, and rejection. Through the application of the Word of God and guided introspection, we walk you through a journey of restoration, helping you find the peace and strength to live a life of significance.',
        objectives: [
            'To understand the root causes of emotional wounds and trauma',
            'To experience the Father’s heart of love as the foundation for healing',
            'To provide tools for releasing unforgiveness and bitterness',
            'To help renew your identity beyond your past experiences',
            'To guide you in rebuilding trust and preparing for healthy future relationships'
        ],
        model: 'Bootcamp',
        image: SchoolOfHealingImg,
        selarUrl: 'https://selar.co/school-of-healing',
        curriculum: [
            'Understanding & Identifying Emotional Wounds',
            'Resting in the Father\'s Love',
            'Navigating and Healing from Trauma',
            'Overcoming the Sting of Rejection',
            'The Freedom of Releasing Unforgiveness',
            'Renewing Your Identity & Self-Worth',
            'Rebuilding Trust and Healthy Boundaries',
            'Walking in Wholeness and Purpose'
        ],
        is_open_for_intake: false
    },
    {
        title: 'Discovery Class',
        slug: 'discovery-class',
        category: 'Purpose',
        description: 'Knowing yourself is the beginning of great things in your life. This is life changing class to help you discover purpose.',
        fullDescription: 'Discovery Class is the starting point for everyone joining the Hekimika family. It is a foundational session designed to introduce you to our vision, values, and the various tracks of growth we offer. By understanding who we are and what we believe, you will be better equipped to find your place and live a life of relevance, significance, and dominion.',
        objectives: [
            'To impart the core vision and values of Hekimika',
            'To explain the various "arms" and programs within the ministry',
            'To help you identify the best track for your current season of life',
            'To introduce you to the importance of community and covenant and how to get involved'
        ],
        model: 'Bootcamp',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
        selarUrl: 'https://selar.co/discovery-class',
        curriculum: [
            'Hekimika Vision & Values',
            'Arms of the Ministry: Overview',
            'Finding Your Track: A Personal Assessment',
            'Community, Covenant & Building Together'
        ],
        is_open_for_intake: false
    },
    {
        title: 'Couples Coaching',
        slug: 'couples-coaching',
        category: 'Couples',
        description: 'In life there things that you know you don\'t know. This is a program for that couple who desire guidance in matters love and life.',
        fullDescription: 'In life there things that you know you don\'t know and then there are things you don\'t know that you don\'t know where love becomes tough. The new and unfamiliar doesn\'t need to be hard. This is a program for that couple who desire guidance in matters love and life especially in navigating uncharted waters. Whether you have just started dating, you have been dating for a while, organizing your wedding and planning for marriage, or are recently married, please contact us for tailor made sessions just for you.',
        model: 'Bootcamp',
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
        selarUrl: 'https://selar.co/couples-coaching',
        curriculum: [
            'Tailor-made sessions',
            'Navigating uncharted waters',
            'Marriage planning',
            'Conflict resolution'
        ],
        is_open_for_intake: false
    },
    {
        title: 'Singles Coaching',
        slug: 'singles-coaching',
        category: 'Single & Built',
        description: 'Apart from the Single and Built Programs, this is a free and open space where you can receive personal coaching in your singlehood.',
        fullDescription: 'Apart from the Single and Built Programs, this is a free and open space where you can receive personal coaching in your singlehood. Please contact us for tailor made sessions just for you.',
        model: 'Bootcamp',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
        selarUrl: 'https://selar.co/singles-coaching',
        curriculum: [
            'Personal coaching',
            'Singlehood guidance',
            'Tailor-made sessions'
        ],
        is_open_for_intake: false
    },
    {
        title: 'Fountain',
        slug: 'fountain',
        category: 'Discipleship',
        description: 'This is a discipleship program to help you grow in the knowledge of God through His Word.',
        fullDescription: 'This is a discipleship program to help you grow in the knowledge of God through His Word. It is for those who have recently accepted Jesus as LORD and Savior and for those who desire to deepen their walk with God.',
        model: 'ongoing',
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
        selarUrl: 'https://selar.co/fountain',
        curriculum: [
            'Module 1: Character Building',
            'Module 2: Word Impartation',
            'Module 3: Growth in Faith'
        ],
        is_open_for_intake: true
    }
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
