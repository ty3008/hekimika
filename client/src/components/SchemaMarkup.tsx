import { Helmet } from 'react-helmet-async';

// ── Constants ──────────────────────────────────────────────────────────
const SITE_URL = 'https://hekimika.org';
const SITE_NAME = 'Hekimika – Wise Nation';
const LOGO_URL = `${SITE_URL}/favicon/apple-touch-icon.png`;
const FOUNDERS_IMG = `${SITE_URL}/assets/home-carousel/carousel 1.webp`;

const PASTOR_KEVIN = {
    name: 'Pastor Kevin Mulati',
    url: `${SITE_URL}/about`,
    image: FOUNDERS_IMG,
    jobTitle: 'Founder & Lead Pastor',
    description: 'Pastor Kevin Mulati is the visionary behind Hekimika (Wise Nation), a global ministry equipping singles, couples, and leaders with godly wisdom for relationships, purpose, and leadership. He is an author, mentor, and speaker with over 10 years of impact.',
    sameAs: [
        'https://www.youtube.com/@Hekimika001',
        'https://t.me/+YLkY8tmLLjw0MWNk',
    ],
};

// ── WebSite Schema ─────────────────────────────────────────────────────
export function WebSiteSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        alternateName: 'Hekimika',
        url: SITE_URL,
        description: 'A global ministry platform raising the generation of the wise through biblical wisdom on masculinity, relationships, leadership, and purpose.',
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: { '@type': 'ImageObject', url: LOGO_URL },
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_URL}/blog?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
        inLanguage: 'en',
    };

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
    );
}

// ── Organization Schema ────────────────────────────────────────────────
export function OrganizationSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'ReligiousOrganization',
        name: 'Hekimika – Wise Nation',
        alternateName: 'Wise Nation',
        url: SITE_URL,
        logo: LOGO_URL,
        image: FOUNDERS_IMG,
        description: 'Hekimika is a global ministry dedicated to raising the generation of the wise — equipping men, women, singles, and couples with godly wisdom for relationships, masculinity, leadership, purity, and purpose.',
        foundingDate: '2015',
        founder: [
            {
                '@type': 'Person',
                name: 'Pastor Kevin Mulati',
                jobTitle: 'Founder & Lead Pastor',
                url: `${SITE_URL}/about`,
            },
            {
                '@type': 'Person',
                name: 'Lilian Mulati',
                jobTitle: 'Co-Founder',
                url: `${SITE_URL}/about`,
            },
        ],
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Nairobi',
            addressCountry: 'KE',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+254702338163',
            contactType: 'customer service',
            availableLanguage: ['English', 'Swahili'],
        },
        sameAs: [
            'https://www.youtube.com/@Hekimika001',
            'https://t.me/+YLkY8tmLLjw0MWNk',
        ],
        knowsAbout: [
            'Biblical relationships',
            'Godly masculinity',
            'Christian leadership',
            'Marriage counseling',
            'Youth mentorship',
            'Purity and singlehood',
            'Wisdom and purpose',
        ],
    };

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
    );
}

// ── Person Schema (for About page) ─────────────────────────────────────
export function PersonSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: PASTOR_KEVIN.name,
        url: PASTOR_KEVIN.url,
        image: PASTOR_KEVIN.image,
        jobTitle: PASTOR_KEVIN.jobTitle,
        description: PASTOR_KEVIN.description,
        worksFor: {
            '@type': 'ReligiousOrganization',
            name: SITE_NAME,
            url: SITE_URL,
        },
        sameAs: PASTOR_KEVIN.sameAs,
        knowsAbout: [
            'Biblical wisdom',
            'Christian masculinity',
            'Godly relationships',
            'Marriage preparation',
            'Youth mentorship',
            'Leadership development',
            'Purity',
        ],
        alumniOf: {
            '@type': 'Organization',
            name: 'Hekimika Ministry',
        },
    };

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
    );
}

// ── Article Schema (for blog posts) ────────────────────────────────────
interface ArticleSchemaProps {
    title: string;
    excerpt: string;
    slug: string;
    author: string;
    category: string;
    coverImage?: string;
    publishedAt: string;
    readTime: number;
    content: string;
}

export function ArticleSchema({
    title, excerpt, slug, author, category, coverImage, publishedAt, readTime, content,
}: ArticleSchemaProps) {
    // Estimate word count from HTML content
    const plainText = content.replace(/<[^>]+>/g, '');
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: excerpt,
        url: `${SITE_URL}/blog/${slug}`,
        image: coverImage || FOUNDERS_IMG,
        datePublished: publishedAt,
        dateModified: publishedAt,
        wordCount,
        timeRequired: `PT${readTime}M`,
        articleSection: category,
        inLanguage: 'en',
        author: {
            '@type': 'Person',
            name: author || PASTOR_KEVIN.name,
            url: PASTOR_KEVIN.url,
            image: PASTOR_KEVIN.image,
            jobTitle: PASTOR_KEVIN.jobTitle,
            description: PASTOR_KEVIN.description,
            sameAs: PASTOR_KEVIN.sameAs,
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
            logo: { '@type': 'ImageObject', url: LOGO_URL },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/blog/${slug}`,
        },
        keywords: [
            category,
            'biblical wisdom',
            'godly relationships',
            'Christian leadership',
            'masculinity',
            'purpose',
            'Hekimika',
        ].join(', '),
        about: [
            { '@type': 'Thing', name: category },
            { '@type': 'Thing', name: 'Biblical Wisdom' },
        ],
        isAccessibleForFree: true,
    };

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
    );
}

// ── Breadcrumb Schema ──────────────────────────────────────────────────
interface BreadcrumbItem {
    name: string;
    url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
        })),
    };

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
    );
}

// ── CollectionPage Schema (for blog listing) ───────────────────────────
export function BlogCollectionSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Hekimika Blog – Wisdom in Writing',
        description: 'Articles and teachings on biblical masculinity, godly relationships, Christian leadership, purity, purpose, and wisdom by Pastor Kevin Mulati and the Wise Nation community.',
        url: `${SITE_URL}/blog`,
        isPartOf: {
            '@type': 'WebSite',
            name: SITE_NAME,
            url: SITE_URL,
        },
        about: [
            { '@type': 'Thing', name: 'Biblical relationships' },
            { '@type': 'Thing', name: 'Godly masculinity' },
            { '@type': 'Thing', name: 'Christian leadership' },
            { '@type': 'Thing', name: 'Wisdom and purpose' },
        ],
        inLanguage: 'en',
    };

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
    );
}

export { SITE_URL, SITE_NAME, PASTOR_KEVIN, LOGO_URL, FOUNDERS_IMG };
