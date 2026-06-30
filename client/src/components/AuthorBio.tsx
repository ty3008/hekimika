import { User } from 'lucide-react';

interface AuthorBioProps {
    authorName?: string;
}

const AUTHORS: Record<string, {
    name: string;
    title: string;
    bio: string;
    image?: string;
    links: { label: string; url: string }[];
}> = {
    'Pastor Kevin Mulati': {
        name: 'Pastor Kevin Mulati',
        title: 'Founder of Hekimika (Wise Nation) · Author · Mentor · Speaker',
        bio: 'Pastor Kevin Mulati is the visionary behind Hekimika — a global ministry raising the generation of the wise. With over 10 years of impact, he has mentored thousands of singles, couples, and leaders through powerful teachings on biblical wisdom, relationships, masculinity, purity, and purpose. He is the author of multiple books including "Passion", "Choosing Well", and "Creating a Solid Form".',
        links: [
            { label: 'YouTube', url: 'https://www.youtube.com/@Hekimika001' },
            { label: 'Telegram', url: 'https://t.me/+YLkY8tmLLjw0MWNk' },
        ],
    },
};

const DEFAULT_AUTHOR = AUTHORS['Pastor Kevin Mulati'];

export default function AuthorBio({ authorName }: AuthorBioProps) {
    const author = (authorName && AUTHORS[authorName]) || DEFAULT_AUTHOR;

    return (
        <aside
            className="mt-12 pt-10 border-t border-gray-100"
            aria-label="About the author"
            itemScope
            itemType="https://schema.org/Person"
        >
            <div className="flex flex-col sm:flex-row gap-5 items-start">
                {/* Avatar */}
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-md"
                    style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #003366 100%)' }}
                >
                    <User size={28} className="text-white" />
                </div>

                {/* Bio Content */}
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--gold)' }}>
                        Written by
                    </p>
                    <h3
                        className="text-lg font-bold mb-1"
                        style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}
                        itemProp="name"
                    >
                        {author.name}
                    </h3>
                    <p
                        className="text-sm font-medium mb-3"
                        style={{ color: 'var(--gold)' }}
                        itemProp="jobTitle"
                    >
                        {author.title}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4" itemProp="description">
                        {author.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-2">
                        {author.links.map(link => (
                            <a
                                key={link.label}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors hover:text-white"
                                style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'var(--navy)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                itemProp="sameAs"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="/about"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                            style={{ background: 'var(--gold)', color: 'var(--navy)' }}
                            itemProp="url"
                        >
                            Full Profile →
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
}
