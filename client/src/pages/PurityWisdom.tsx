import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    ExternalLink,
    Shield,
    Sparkles,
    BookOpen,
    Headphones,
    Users,
    Heart,
    Flame,
    Quote,
    MessageCircle,
    Send
} from 'lucide-react';
import BookShowcaseCard from '../components/BookShowcaseCard';
import { PROGRAMS } from '../utils/constants';
import { CATALOG_BOOKS, SOCIAL_LINKS, whatsappLink } from '../utils/siteContent';

// ── Purity program ───────────────────────────────────────
const PURITY_PROGRAM = PROGRAMS.find((p) => p.slug === 'school-of-purity');
const PROGRAM = {
    title: 'School of Purity – Purity Basics',
    desc: 'A foundational program that addresses the root of purity — the state of your heart. Learn how formation determines function and discover how to live as a dominant son of God in a dark world.',
};

// ── Two main books on Purity ─────────────────────────────
const BOOKS = [
    CATALOG_BOOKS.pureMan,
    { ...CATALOG_BOOKS.passion, title: 'Cultured in Love – Passion' },
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

export default function PurityWisdom() {
    return (
        <>
            <Helmet>
                <title>Is Purity Possible? | Hekimika – Wise Nation</title>
                <meta
                    name="description"
                    content="Is it really possible to live purely as a young person? Yes — and Hekimika has the programs, books, and community to equip you to live as a dominant son of God."
                />
            </Helmet>

            {/* ── Hero ─────────────────────────────────────────── */}
            <section
                className="relative min-h-[75vh] flex items-center justify-center overflow-hidden"
                style={{
                    background: 'radial-gradient(ellipse at 50% 20%, #002855 0%, #001F3F 55%, #001020 100%)',
                }}
            >
                {/* Decorative circles */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    style={{ width: '820px', height: '820px', border: '1px solid rgba(212,175,55,0.06)' }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    style={{ width: '540px', height: '540px', border: '1px solid rgba(212,175,55,0.12)' }}
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
                        <Shield size={14} className="text-gold" />
                        <span>For Young People • Walking in Dominion</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        {...fadeUp}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="font-bold text-white leading-[1.15] mb-6"
                        style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.1rem, 5.2vw, 3.8rem)' }}
                    >
                        Purity Is Not Outdated.{' '}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #FFE27D 0%, #D4AF37 50%, #AA8010 100%)',
                            }}
                        >
                            It Is Powerful.
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        {...fadeUp}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-white/75 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto font-light"
                    >
                        For the young person who refuses to conform and is willing to stand out in a generation
                        where purity feels rare. <strong className="text-white font-semibold">You are not alone.</strong>
                    </motion.p>

                    {/* Actions */}
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-wrap gap-4 justify-center mb-12"
                    >
                        <a
                            href="#school-of-purity"
                            className="btn-primary px-8 py-3.5 text-sm font-bold flex items-center gap-2 shadow-lg"
                        >
                            <Shield size={16} /> Explore School of Purity
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
                        {[
                            { label: 'The Heart Truth', anchor: '#truth', icon: Heart },
                            { label: 'School of Purity', anchor: '#school-of-purity', icon: Shield },
                            { label: 'Two Books', anchor: '#books', icon: BookOpen },
                            { label: 'Remnant Community', anchor: '#community', icon: Users },
                        ].map((nav) => {
                            const Icon = nav.icon;
                            return (
                                <a
                                    key={nav.label}
                                    href={nav.anchor}
                                    className="p-3 rounded-xl transition-all duration-300 text-left hover:bg-white/5 border border-transparent hover:border-gold/30"
                                >
                                    <div className="flex items-center gap-2 text-gold text-xs font-semibold mb-1">
                                        <Icon size={14} />
                                        <span>{nav.label}</span>
                                    </div>
                                    <p className="text-white/50 text-[11px] leading-snug">
                                        View details & resources
                                    </p>
                                </a>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ── Opening Letter (A Word for the Remnant) ───────── */}
            <section id="truth" className="section-pad bg-gradient-to-b from-white to-gray-50/60 scroll-mt-20">
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
                                🛡️
                            </span>
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
                                A Word for the Seeking Heart
                            </span>
                        </div>

                        <h2
                            className="text-2xl md:text-3xl font-bold text-navy mb-6"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Hi,
                        </h2>

                        <div className="space-y-5 text-gray-700 leading-relaxed text-base md:text-lg">
                            <p>
                                That is an excellent question. It shows you are in the right direction as a young
                                person and are willing to stand out in a generation where people feel purity is
                                outdated.
                            </p>
                            <p>
                                It is easy to be discouraged and feel like you are the only remnant in a dark world, but
                                be encouraged that <strong className="text-navy font-semibold">you are not alone.</strong> In life
                                the way you are formed determines how you live and function. A pure lifestyle is only
                                possible depending on the state of your heart.
                            </p>
                            <p>
                                In this platform we have a lot of resources to help you become formed so that you can
                                live as a dominant son of God in a dark world.
                            </p>
                        </div>

                        {/* The Core Truth Card */}
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
                                <Sparkles size={22} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-bold uppercase tracking-wider text-gold mb-1">
                                    The Foundation of Purity
                                </p>
                                <p className="text-sm md:text-base text-navy font-medium italic">
                                    "In life, the way you are formed determines how you live and function. Purity is
                                    not a constant battle of guilt — it is the natural expression of a well-formed heart that enjoys true beauty."
                                </p>
                            </div>
                        </div>

                        {/* 3 Pillars */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <span className="text-lg mb-2 block">🌱</span>
                                <h4 className="font-bold text-navy text-sm mb-1">Formed from Within</h4>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                    Purity begins with internal heart formation, not superficial behavior modification.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <span className="text-lg mb-2 block">🤝</span>
                                <h4 className="font-bold text-navy text-sm mb-1">You Are Not Alone</h4>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                    There is an active remnant of thousands of young believers walking this same path.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <span className="text-lg mb-2 block">👑</span>
                                <h4 className="font-bold text-navy text-sm mb-1">Dominant Sons of God</h4>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                    Purity gives you spiritual authority, unshakeable confidence, and clear destiny.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Program Spotlight: School of Purity ───────────── */}
            <section id="school-of-purity" className="section-pad scroll-mt-20" style={{ background: 'var(--navy)' }}>
                <div className="container-xl max-w-5xl">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4"
                            style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--gold)' }}
                        >
                            <Shield size={13} />
                            <span>Flagship Mentorship</span>
                        </div>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                            style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--gold)' }}
                        >
                            The School of Purity (Purity Basics)
                        </h2>
                        <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg">
                            Check out the School of Purity Program where we handle Purity Basics. A dedicated program
                            that goes to the root — because lasting purity is an inside-out journey.
                        </p>
                    </motion.div>

                    {/* Masterclass Showcase Card */}
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="rounded-3xl border border-white/15 overflow-hidden shadow-2xl relative"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                        }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 md:p-12">
                            {/* Left: Poster */}
                            <div className="lg:col-span-5 flex flex-col items-center">
                                <div className="relative aspect-square w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                                    {PURITY_PROGRAM?.image ? (
                                        <img
                                            src={PURITY_PROGRAM.image}
                                            alt={`${PROGRAM.title} poster`}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div
                                            className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
                                            style={{ background: 'radial-gradient(circle, #002855 0%, #001226 100%)' }}
                                        >
                                            <Shield size={48} className="text-gold mb-4" />
                                            <h3 className="text-xl font-bold text-white mb-2">School of Purity</h3>
                                            <p className="text-xs text-gold">Purity Basics</p>
                                        </div>
                                    )}

                                    <div className="absolute top-3 left-3">
                                        <span
                                            className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg"
                                            style={{ background: 'var(--gold)', color: 'var(--navy)' }}
                                        >
                                            Intake Open
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Program Information & Modules */}
                            <div className="lg:col-span-7 flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-2 block">
                                    Comprehensive 8-Lesson Bootcamp
                                </span>

                                <h3
                                    className="text-2xl sm:text-3xl font-bold text-white mb-4"
                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                >
                                    {PROGRAM.title}
                                </h3>

                                <p className="text-white/70 text-base leading-relaxed mb-6">
                                    {PROGRAM.desc}
                                </p>

                                {/* Module highlights */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                    {[
                                        { title: 'The State of the Heart', desc: 'Why willpower fails and formation succeeds' },
                                        { title: 'Overcoming Sexual Fire', desc: 'Understanding desires and victory over burning' },
                                        { title: 'Loving the Pureness', desc: 'Delighting in godliness and spiritual beauty' },
                                        { title: 'Dominant Sons of God', desc: 'Living with kingdom authority in culture' },
                                    ].map((mod) => (
                                        <div
                                            key={mod.title}
                                            className="p-3 rounded-xl border border-white/10 bg-white/5"
                                        >
                                            <p className="text-xs font-bold text-gold mb-0.5">{mod.title}</p>
                                            <p className="text-[11px] text-white/50">{mod.desc}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-4 items-center">
                                    <Link
                                        to="/programs/school-of-purity"
                                        className="btn-primary px-7 py-3.5 text-sm font-bold flex items-center gap-2 shadow-lg"
                                    >
                                        View Full Program Syllabus <ArrowRight size={15} />
                                    </Link>
                                    <a
                                        href={whatsappLink(
                                            'Hello Hekimika, I am interested in joining the School of Purity (Purity Basics) program.'
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3.5 rounded-lg text-white font-bold text-sm border border-white/20 hover:bg-white/10 transition-all flex items-center gap-2"
                                    >
                                        <WhatsAppIcon /> Inquire on WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Two Main Books on Purity ──────────────────────── */}
            <section id="books" className="section-pad bg-gray-50 scroll-mt-20">
                <div className="container-xl max-w-5xl">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4 bg-navy/5 text-navy"
                        >
                            <BookOpen size={13} className="text-gold" />
                            <span>Two Main Books on Purity</span>
                        </div>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Read Your Way to Clarity & Victory
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                            We have two main books on Purity to help you lay an unshakeable foundation for your
                            heart and mind. Tap either book to purchase on Selar or WhatsApp.
                        </p>
                    </motion.div>

                    {/* Side-by-side Showcase */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {BOOKS.map((b, i) => (
                            <BookShowcaseCard key={b.key} book={b} index={i} />
                        ))}
                    </div>

                    {/* How to Read Them Note */}
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.6 }}
                        className="rounded-2xl p-6 md:p-8 bg-white border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                style={{ background: 'rgba(212,175,55,0.12)' }}
                            >
                                <Flame size={24} style={{ color: 'var(--gold)' }} />
                            </div>
                            <div>
                                <h4 className="font-bold text-navy text-base md:text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    How to Read These Two Books
                                </h4>
                                <p className="text-gray-500 text-sm">
                                    Start with <strong>Passion</strong> to understand the God-given gift of desire and how to steward it,
                                    then read <strong>The Pure Man</strong> for masculine strength, kingdom standards, and undefiled integrity.
                                </p>
                            </div>
                        </div>

                        <Link
                            to="/resources"
                            className="btn-outline px-6 py-3 text-sm shrink-0 whitespace-nowrap"
                            style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}
                        >
                            Explore All Books
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── Podcast & Social Channels ─────────────────────── */}
            <section className="section-pad" style={{ background: 'var(--navy)' }}>
                <div className="container-xl">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4"
                            style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--gold)' }}
                        >
                            <Headphones size={13} />
                            <span>Stay in the Conversation</span>
                        </div>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                            style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--gold)' }}
                        >
                            Daily Wisdom Across All Platforms
                        </h2>
                        <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg">
                            You can visit our social media (Spotify, Instagram, Facebook, YouTube, and TikTok) for
                            more engagement, teachings, and encouraging video content.
                        </p>
                    </motion.div>

                    {/* Spotify Featured Banner */}
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="max-w-4xl mx-auto mb-10 rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, rgba(30,215,96,0.12) 0%, rgba(0,31,63,0.4) 100%)',
                            borderColor: 'rgba(30,215,96,0.3)',
                        }}
                    >
                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                            <div
                                className="w-18 h-18 rounded-2xl flex items-center justify-center shrink-0 shadow-xl"
                                style={{ background: '#1DB954', color: '#000' }}
                            >
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                </svg>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1DB954] block mb-1">
                                    Spotify Podcast
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Listen to Purity & Wholeness Teachings on Spotify
                                </h3>
                                <p className="text-white/70 text-sm leading-relaxed max-w-xl">
                                    Episodes focused on breaking sexual strongholds, managing desires, and understanding
                                    true godly masculinity and femininity in our modern culture.
                                </p>
                            </div>

                            <a
                                href="https://open.spotify.com/show/3bSNy9W1so6Z9IjHyFb1IP?si=fcb149a88a274a17"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3.5 rounded-full font-bold text-sm text-black inline-flex items-center gap-2 hover:scale-105 transition-all shadow-lg shrink-0"
                                style={{ background: '#1DB954' }}
                            >
                                Open Channel <ExternalLink size={15} />
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

            {/* ── Community & Pastoral Care (Closing CTA) ──────── */}
            <section id="community" className="section-pad bg-white scroll-mt-20">
                <div className="container-xl max-w-5xl">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4 bg-navy/5 text-navy"
                        >
                            <Users size={13} className="text-gold" />
                            <span>The Remnant Circle</span>
                        </div>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            You Are Not the Last One Standing
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                            Connect with a community of young people who are choosing the same path. You will find
                            encouragement, accountability, and real wisdom for your journey.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {/* WhatsApp Community */}
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="p-7 rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-sm text-white"
                                style={{ background: '#25D366' }}
                            >
                                <WhatsAppIcon />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                WhatsApp Community
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                                An active group of young people interacting daily, praying together, and holding the standard of purity.
                            </p>
                            <a
                                href="https://chat.whatsapp.com/Gp9LwRFOHxe95VELronPvt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 shadow-sm"
                                style={{ background: '#25D366' }}
                            >
                                Join WhatsApp Group
                            </a>
                        </motion.div>

                        {/* Telegram Channel */}
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="p-7 rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-sm text-white"
                                style={{ background: '#0088cc' }}
                            >
                                <Send size={22} />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Telegram Channel
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                                Receive bite-sized wisdom nuggets, voice notes from Pastor Kevin, and timely audio teachings.
                            </p>
                            <a
                                href="https://t.me/+YLkY8tmLLjw0MWNk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 shadow-sm"
                                style={{ background: '#0088cc' }}
                            >
                                Join Telegram <ExternalLink size={14} />
                            </a>
                        </motion.div>

                        {/* Safe 1-on-1 Pastoral Conversation */}
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="p-7 rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-sm text-navy"
                                style={{ background: 'rgba(212,175,55,0.2)' }}
                            >
                                <MessageCircle size={22} />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Safe Pastoral Ear
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                                Struggling in silence with guilt or questions? Reach out directly. A safe, non-judgmental space to heal.
                            </p>
                            <a
                                href={whatsappLink(
                                    'Hello Hekimika, I am a young person and I have some confidential questions regarding purity.'
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-navy border-2 border-navy hover:bg-navy hover:text-white flex items-center justify-center gap-2 transition-all"
                            >
                                Chat Privately <ArrowRight size={14} />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
