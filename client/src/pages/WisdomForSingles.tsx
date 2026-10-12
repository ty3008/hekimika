import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    BellRing,
    ExternalLink,
    Sparkles,
    Users,
    BookOpen,
    Heart,
    ShieldCheck,
    CheckCircle2,
    Compass,
    Headphones,
    MessageCircle,
    Bookmark,
    Quote
} from 'lucide-react';
import BookShowcaseCard from '../components/BookShowcaseCard';
import { PROGRAMS as ALL_PROGRAMS } from '../utils/constants';
import {
    CATALOG_BOOKS,
    SOCIAL_LINKS,
    WHATSAPP_COMMUNITY_URL,
    whatsappLink,
} from '../utils/siteContent';

// ── Four major programs with manuals/books ────────────────────────────────
const PROGRAM_TILES = [
    {
        slug: 'mistakes-singles-can-avoid',
        title: 'Mistakes that Singles Can Avoid',
        badge: 'New Program & Manual',
        highlight: 'Pitfall Prevention & Wholeness',
        manualNote: 'Includes Official Workbook & Reflection Manual',
        isNew: true,
    },
    {
        slug: 'preparing-for-love',
        title: 'Single and Built – Preparing for Love',
        badge: 'Foundational Bootcamp',
        highlight: 'Identity, Contentment & Intimacy',
        manualNote: '8 Lessons + Guided Personal Manual',
    },
    {
        slug: 'choosing-well',
        title: 'Single and Built – Choosing Well',
        badge: 'Covenant Discernment',
        highlight: 'Partner Selection & Avoiding Heartache',
        manualNote: '7 Lessons + Choice Matrix Manual',
    },
    {
        slug: 'keepers',
        title: 'Keepers of Love',
        badge: 'New Program & Manual',
        highlight: 'Long-Term Sustaining & Marriage Prep',
        manualNote: 'Comprehensive Diligence & Covenant Manual',
        isNew: true,
    },
].map((tile) => {
    const program = ALL_PROGRAMS.find((p) => p.slug === tile.slug);
    return {
        ...tile,
        image: program?.image ?? '',
        desc: program?.description ?? '',
    };
});

// ── Nine books for singles, categorized into intuitive tabs ────────────────
const ALL_BOOKS = [
    CATALOG_BOOKS.mistakes,
    CATALOG_BOOKS.preparing,
    CATALOG_BOOKS.choosing,
    CATALOG_BOOKS.keepers,
    CATALOG_BOOKS.solidForm,
    CATALOG_BOOKS.solidCore,
    CATALOG_BOOKS.endedRelationships,
    CATALOG_BOOKS.passion,
    CATALOG_BOOKS.pureMan,
];

const CATEGORIES = [
    { id: 'all', label: 'All 9 Books' },
    { id: 'single-and-built', label: 'Single & Built Series (4)' },
    { id: 'cultured-in-love', label: 'Cultured in Love Series (4)' },
    { id: 'purity', label: 'Purity & Character' },
];

const SPOTLIGHT_PILLARS = [
    {
        icon: Compass,
        title: '4 Core Programs',
        desc: 'Interactive cohorts with study manuals built to take you from preparation to wise choices.',
        anchor: '#programs',
    },
    {
        icon: BookOpen,
        title: '9 Curated Books',
        desc: 'In-depth literature authored by Pastor Kevin Mulati addressing heart, character & covenant.',
        anchor: '#books',
    },
    {
        icon: Headphones,
        title: 'Weekly Podcast',
        desc: 'Real, vulnerable, and faith-fueled conversations streaming weekly on Spotify.',
        anchor: '#podcast',
    },
    {
        icon: Users,
        title: 'Global Community',
        desc: 'Monthly online meetings & a 24/7 WhatsApp brotherhood & sisterhood of like-minded singles.',
        anchor: '#community',
    },
];

const fadeUp = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
};

const WhatsAppIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export default function WisdomForSingles() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredBooks = ALL_BOOKS.filter((book) => {
        if (selectedCategory === 'all') return true;
        if (selectedCategory === 'single-and-built') return book.series === 'Single and Built';
        if (selectedCategory === 'cultured-in-love') return book.series === 'Cultured in Love';
        if (selectedCategory === 'purity') return book.key === 'pureMan' || book.key === 'passion';
        return true;
    });

    return (
        <>
            <Helmet>
                <title>Wisdom for Singles | Hekimika – Wise Nation</title>
                <meta
                    name="description"
                    content="Are you single and want wisdom on love, relationships and dating? We got you. Discover 4 major programs with manuals, 9 curated books, and a global community."
                />
            </Helmet>

            {/* ── Hero ─────────────────────────────────────────── */}
            <section
                className="relative min-h-[75vh] flex items-center justify-center overflow-hidden"
                style={{
                    background: 'radial-gradient(ellipse at 50% 20%, #002855 0%, #001F3F 55%, #001020 100%)',
                }}
            >
                {/* Decorative concentric geometry */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    style={{
                        width: '820px',
                        height: '820px',
                        border: '1px solid rgba(212,175,55,0.06)',
                    }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    style={{
                        width: '560px',
                        height: '560px',
                        border: '1px solid rgba(212,175,55,0.12)',
                    }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    style={{
                        width: '320px',
                        height: '320px',
                        background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
                    }}
                />

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-36 pb-20">
                    {/* Overline Badge */}
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-6 shadow-sm"
                        style={{
                            background: 'rgba(212,175,55,0.12)',
                            color: 'var(--gold)',
                            border: '1px solid rgba(212,175,55,0.3)',
                        }}
                    >
                        <Sparkles size={14} className="text-gold" />
                        <span>For Singles • Love, Dating & Wholeness</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        {...fadeUp}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="font-bold text-white leading-[1.15] mb-6"
                        style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.1rem, 5.2vw, 3.8rem)' }}
                    >
                        You Are Not Behind.{' '}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #FFE27D 0%, #D4AF37 50%, #AA8010 100%)',
                            }}
                        >
                            You Are Being Built.
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        {...fadeUp}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-white/75 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto font-light"
                    >
                        A clear, godly sanctuary for every single person seeking genuine wisdom on love, relationships,
                        wholeness, and dating. <strong className="text-white font-semibold">We got you.</strong>
                    </motion.p>

                    {/* Main Action CTAs */}
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-wrap gap-4 justify-center mb-12"
                    >
                        <a
                            href={WHATSAPP_COMMUNITY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary px-8 py-3.5 text-sm font-bold flex items-center gap-2 shadow-lg"
                        >
                            <WhatsAppIcon />
                            Join Wisdom Moments Singles
                        </a>
                        <Link
                            to="/contact"
                            className="px-7 py-3.5 text-sm font-bold rounded-lg border flex items-center gap-2 transition-all hover:bg-white/10"
                            style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff', background: 'rgba(255,255,255,0.05)' }}
                        >
                            Talk to Us <ArrowRight size={15} />
                        </Link>
                    </motion.div>

                    {/* Quick Anchor Jumps */}
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10"
                    >
                        {SPOTLIGHT_PILLARS.map((p) => {
                            const Icon = p.icon;
                            return (
                                <a
                                    key={p.title}
                                    href={p.anchor}
                                    className="group p-3 rounded-xl transition-all duration-300 text-left hover:bg-white/5 border border-transparent hover:border-gold/30"
                                >
                                    <div className="flex items-center gap-2 text-gold text-xs font-semibold mb-1">
                                        <Icon size={14} />
                                        <span>{p.title}</span>
                                    </div>
                                    <p className="text-white/50 text-[11px] leading-snug line-clamp-2">
                                        {p.desc}
                                    </p>
                                </a>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ── Opening Letter (A Word for Every Single Heart) ── */}
            <section className="section-pad bg-gradient-to-b from-white to-gray-50/60">
                <div className="container-xl max-w-4xl">
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.7 }}
                        className="relative rounded-3xl p-8 md:p-12 bg-white shadow-xl border border-gray-100 overflow-hidden"
                    >
                        {/* Top decorative gold line */}
                        <div
                            className="absolute top-0 left-0 right-0 h-2"
                            style={{ background: 'linear-gradient(90deg, var(--navy) 0%, var(--gold) 50%, var(--navy) 100%)' }}
                        />

                        {/* Large watermark quote mark */}
                        <Quote
                            size={120}
                            className="absolute -bottom-8 -right-8 pointer-events-none text-gold/5"
                        />

                        <div className="flex items-center gap-3 mb-6">
                            <span
                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                                style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--navy)' }}
                            >
                                ✨
                            </span>
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
                                A Word for Every Single
                            </span>
                        </div>

                        <h2
                            className="text-2xl md:text-3xl font-bold text-navy mb-6"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Hello,
                        </h2>

                        <div className="space-y-5 text-gray-700 leading-relaxed text-base md:text-lg">
                            <p>
                                Being single can be a challenge in a world that hypes dating. The pressure from social
                                media and friends can even make it more challenging.
                            </p>
                            <p>
                                It is our desire that you become well equipped and excel both as a single person and in
                                your next phase of life which is dating.
                            </p>
                            <p>
                                We have plenty of resources that will equip you and make you solid as a single person
                                from programs to podcasts to books to online monthly meetings.{' '}
                                <strong className="text-navy font-semibold">We have so much for you.</strong>
                            </p>
                        </div>

                        {/* Pastoral Highlight Card */}
                        <div
                            className="mt-8 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4"
                            style={{
                                background: 'linear-gradient(135deg, rgba(0,31,63,0.03) 0%, rgba(212,175,55,0.08) 100%)',
                                border: '1px solid rgba(212,175,55,0.25)',
                            }}
                        >
                            <div
                                className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center shadow-sm"
                                style={{ background: 'var(--gold)', color: 'var(--navy)' }}
                            >
                                <Heart size={22} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-bold uppercase tracking-wider text-gold mb-1">
                                    Our Core Belief
                                </p>
                                <p className="text-sm md:text-base text-navy font-medium italic">
                                    "Your single season is not an empty waiting room. It is a sacred workshop where God
                                    builds your core, clarifies your values, and shapes your wholeness before you ever make a covenant."
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
                            <span>Written with love by <strong>Pastor Kevin Mulati & The Hekimika Team</strong></span>
                            <span className="text-gold font-semibold uppercase tracking-wider">Hekimika – Wise Nation</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Programs for Singles ─────────────────────────── */}
            <section id="programs" className="section-pad scroll-mt-20" style={{ background: 'var(--navy)' }}>
                <div className="container-xl">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-14">
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4"
                            style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--gold)' }}
                        >
                            <Sparkles size={13} />
                            <span>Structured Tracks</span>
                        </div>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                            style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--gold)' }}
                        >
                            Four Major Programs with Manuals & Books
                        </h2>
                        <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg">
                            There are four major programs with manuals/books for singles to help you get started.
                            Tap any program to view details or register.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {PROGRAM_TILES.map((p, i) => (
                            <motion.div
                                key={p.slug}
                                {...fadeUp}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/10 hover:border-gold hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-gold"
                                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)' }}
                            >
                                {/* Poster Image */}
                                <div className="relative aspect-square overflow-hidden bg-navy-light">
                                    {p.image ? (
                                        <img
                                            src={p.image}
                                            alt={`${p.title} poster`}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div
                                            className="w-full h-full flex flex-col items-center justify-center text-center p-6"
                                            style={{ background: 'radial-gradient(circle, #002855 0%, #001226 100%)' }}
                                        >
                                            <div
                                                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                                                style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)' }}
                                            >
                                                <Sparkles size={28} style={{ color: 'var(--gold)' }} />
                                            </div>
                                            <p
                                                className="font-bold text-lg leading-snug text-white mb-2"
                                                style={{ fontFamily: 'Poppins, sans-serif' }}
                                            >
                                                {p.title}
                                            </p>
                                            <span className="text-[11px] uppercase tracking-widest text-gold/80">
                                                New Cohort Coming Soon
                                            </span>
                                        </div>
                                    )}

                                    {/* Badges on poster */}
                                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                                        <span
                                            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg"
                                            style={{
                                                background: p.isNew ? 'var(--gold)' : 'rgba(0,31,63,0.85)',
                                                color: p.isNew ? 'var(--navy)' : '#fff',
                                                border: p.isNew ? 'none' : '1px solid rgba(255,255,255,0.2)',
                                            }}
                                        >
                                            {p.badge}
                                        </span>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="flex flex-col flex-1 p-6">
                                    <div className="flex items-center gap-1.5 text-gold text-xs font-medium mb-2">
                                        <ShieldCheck size={14} />
                                        <span>{p.highlight}</span>
                                    </div>

                                    <h3
                                        className="text-white font-bold text-lg mb-2 leading-snug group-hover:text-gold transition-colors"
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                    >
                                        {p.title}
                                    </h3>

                                    <p className="text-white/60 text-xs leading-relaxed mb-4 line-clamp-3 flex-1">
                                        {p.desc}
                                    </p>

                                    {/* Manual inclusion notice */}
                                    <div
                                        className="p-2.5 rounded-lg text-[11px] text-white/80 mb-5 flex items-center gap-2"
                                        style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}
                                    >
                                        <Bookmark size={13} className="text-gold shrink-0" />
                                        <span className="line-clamp-1">{p.manualNote}</span>
                                    </div>

                                    {/* Action Links */}
                                    <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                                        <Link
                                            to={`/programs/${p.slug}`}
                                            className="text-sm font-bold inline-flex items-center gap-1.5 transition-all text-gold hover:text-white"
                                            aria-label={`Learn more about ${p.title}`}
                                        >
                                            View Program <ArrowRight size={14} />
                                        </Link>

                                        <a
                                            href={whatsappLink(`Hello Hekimika, I am single and interested in the "${p.title}" program and manual.`)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[11px] text-white/50 hover:text-white inline-flex items-center gap-1 transition-colors"
                                            title="Ask on WhatsApp"
                                        >
                                            Inquire <WhatsAppIcon />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* ── Keep Me Updated Notification Box ── */}
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-2xl relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, rgba(212,175,55,0.14) 0%, rgba(212,175,55,0.04) 100%)',
                            border: '1.5px solid rgba(212,175,55,0.4)',
                        }}
                    >
                        <div
                            className="w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center shadow-lg"
                            style={{ background: 'var(--gold)', color: 'var(--navy)' }}
                        >
                            <BellRing size={28} />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold block mb-1">
                                Cohort Notifications
                            </span>
                            <h3
                                className="text-xl md:text-2xl font-bold text-white mb-2"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                Reach out to us so we can keep you updated
                            </h3>
                            <p className="text-white/70 text-sm leading-relaxed max-w-xl">
                                Stay informed on upcoming dates, admissions, and syllabus schedules for any of the
                                four Single and Built programs. We will notify you directly on WhatsApp.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 justify-center md:justify-end shrink-0">
                            <a
                                href={whatsappLink(
                                    'Hello Hekimika, I am single. Please keep me updated when any of the Single and Built programs are running.'
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary px-6 py-3 text-sm font-bold flex items-center gap-2 shadow-lg"
                            >
                                <WhatsAppIcon /> Keep Me Updated
                            </a>
                            <Link
                                to="/perfected-in-wisdom"
                                className="px-5 py-3 text-sm font-bold rounded-lg border text-white transition-all hover:bg-white/10"
                                style={{ borderColor: 'rgba(255,255,255,0.3)' }}
                            >
                                All Programs
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Books for Singles ────────────────────────────── */}
            <section id="books" className="section-pad bg-gray-50 scroll-mt-20">
                <div className="container-xl">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4 bg-navy/5 text-navy"
                        >
                            <BookOpen size={13} className="text-gold" />
                            <span>Curated Library</span>
                        </div>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Books to Equip & Build You
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                            There are several books for you also, authored by Pastor Kevin Mulati. Tap any book
                            to secure your copy instantly on Selar or order via WhatsApp.
                        </p>

                        {/* Interactive Category Tabs */}
                        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                                        selectedCategory === cat.id
                                            ? 'bg-navy text-white shadow-md'
                                            : 'bg-white text-gray-600 hover:text-navy hover:bg-gray-100 border border-gray-200'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Book Cards Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedCategory}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.35 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-14"
                        >
                            {filteredBooks.map((b, i) => (
                                <BookShowcaseCard key={b.key} book={b} index={i} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Reading Guide / Roadmap Callout */}
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto rounded-2xl p-6 md:p-8 bg-white border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                style={{ background: 'rgba(212,175,55,0.12)' }}
                            >
                                <Sparkles size={24} style={{ color: 'var(--gold)' }} />
                            </div>
                            <div>
                                <h4 className="font-bold text-navy text-base md:text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Need a Personal Reading Recommendation?
                                </h4>
                                <p className="text-gray-500 text-sm">
                                    Not sure which book to start with? Our team can guide you based on your exact current season.
                                </p>
                            </div>
                        </div>

                        <a
                            href={whatsappLink('Hello Hekimika, I am single and wondering which book I should start reading first.')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline px-6 py-3 text-sm shrink-0 whitespace-nowrap"
                            style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}
                        >
                            Ask for Advice
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ── Podcast & Social Channels ─────────────────────── */}
            <section id="podcast" className="section-pad scroll-mt-20" style={{ background: 'var(--navy)' }}>
                <div className="container-xl">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-14">
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4"
                            style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--gold)' }}
                        >
                            <Headphones size={13} />
                            <span>Audio & Social Media</span>
                        </div>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                            style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--gold)' }}
                        >
                            Daily Wisdom on Every Platform
                        </h2>
                        <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg">
                            You can visit our social media (Spotify, Instagram, Facebook, YouTube, and TikTok) for
                            more engagement, teachings, and life-shaping conversations.
                        </p>
                    </motion.div>

                    {/* Spotify Featured Show Card */}
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="max-w-4xl mx-auto mb-12 rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, rgba(30,215,96,0.12) 0%, rgba(0,31,63,0.4) 100%)',
                            borderColor: 'rgba(30,215,96,0.3)',
                        }}
                    >
                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                            <div
                                className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 shadow-xl"
                                style={{ background: '#1DB954', color: '#000' }}
                            >
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                </svg>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1DB954] block mb-1">
                                    Official Podcast Channel
                                </span>
                                <h3
                                    className="text-2xl md:text-3xl font-bold text-white mb-2"
                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                >
                                    The Hekimika Channel on Spotify
                                </h3>
                                <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl">
                                    Listen to Pastor Kevin Mulati break down real, honest, and scriptural wisdom on
                                    singlehood, heartbreak, dating with clarity, and building genuine covenant.
                                </p>
                            </div>

                            <a
                                href="https://open.spotify.com/show/3bSNy9W1so6Z9IjHyFb1IP?si=fcb149a88a274a17"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3.5 rounded-full font-bold text-sm text-black inline-flex items-center gap-2 hover:scale-105 transition-all shadow-lg shrink-0"
                                style={{ background: '#1DB954' }}
                            >
                                Listen on Spotify <ExternalLink size={15} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Social Media Grid */}
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto"
                    >
                        {SOCIAL_LINKS.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-5 rounded-2xl text-center border border-white/10 hover:border-gold hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-2 group"
                                style={{ background: 'rgba(255,255,255,0.03)' }}
                            >
                                <span
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold transition-transform group-hover:scale-110 shadow-md"
                                    style={{ background: s.color }}
                                >
                                    {s.label.charAt(0)}
                                </span>
                                <span className="text-white font-semibold text-sm group-hover:text-gold transition-colors">
                                    {s.label}
                                </span>
                                <span className="text-white/40 text-[11px] inline-flex items-center gap-1 group-hover:text-white/70">
                                    Follow <ExternalLink size={10} />
                                </span>
                            </a>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Community & Pastoral Guidance (Closing CTA) ─── */}
            <section id="community" className="section-pad bg-white scroll-mt-20">
                <div className="container-xl max-w-5xl">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4 bg-navy/5 text-navy"
                        >
                            <Users size={13} className="text-gold" />
                            <span>Connect & Grow</span>
                        </div>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            You Don’t Have to Walk Alone
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                            Additionally you can reach out to us on WhatsApp in case you have any needs or burning
                            questions, or join Our Wisdom Moments Singles and interact with other singles.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* Track 1: Wisdom Moments Singles */}
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="p-8 rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
                                style={{ background: 'rgba(0,31,63,0.08)', color: 'var(--navy)' }}
                            >
                                <Users size={28} />
                            </div>

                            <span className="text-xs font-bold uppercase tracking-widest text-gold mb-2 block">
                                Group Community
                            </span>

                            <h3
                                className="text-2xl font-bold text-navy mb-3"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                Wisdom Moments Singles
                            </h3>

                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 flex-1">
                                An active, encouraging brotherhood and sisterhood of singles. Interact with peers,
                                attend online monthly meetings, discuss life and relationships, and grow together in God’s blueprint.
                            </p>

                            <ul className="space-y-2 mb-8 text-xs md:text-sm text-gray-500">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                                    <span>Monthly online gatherings with Pastor Kevin</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                                    <span>Peer encouragement & accountability</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                                    <span>Safe, mature space free of dating pressure</span>
                                </li>
                            </ul>

                            <a
                                href={WHATSAPP_COMMUNITY_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 shadow-md"
                                style={{ background: '#25D366' }}
                            >
                                <WhatsAppIcon /> Join Wisdom Moments Singles
                            </a>
                        </motion.div>

                        {/* Track 2: 1-on-1 Burning Questions & Counseling */}
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="p-8 rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
                                style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--navy)' }}
                            >
                                <MessageCircle size={28} />
                            </div>

                            <span className="text-xs font-bold uppercase tracking-widest text-gold mb-2 block">
                                Private Pastoral Care
                            </span>

                            <h3
                                className="text-2xl font-bold text-navy mb-3"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                Burning Questions & Needs?
                            </h3>

                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 flex-1">
                                Have a specific challenge, a delicate relationship question, or need personal prayer?
                                Reach out directly to our pastoral team for confidential, personalized counsel.
                            </p>

                            <ul className="space-y-2 mb-8 text-xs md:text-sm text-gray-500">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                                    <span>Direct 1-on-1 pastoral responsiveness</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                                    <span>Tailored book and program recommendations</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                                    <span>Safe, non-judgmental spiritual guidance</span>
                                </li>
                            </ul>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href={whatsappLink(
                                        'Hello Hekimika, I am single and I have some burning questions / need guidance regarding love and relationships.'
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-3.5 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 shadow-md"
                                    style={{ background: '#25D366' }}
                                >
                                    <WhatsAppIcon /> Chat on WhatsApp
                                </a>
                                <Link
                                    to="/contact"
                                    className="py-3.5 px-5 rounded-xl font-bold text-sm text-navy border-2 border-navy hover:bg-navy hover:text-white transition-all flex items-center justify-center gap-2"
                                >
                                    Contact Form <ArrowRight size={15} />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
