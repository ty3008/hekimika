import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, BellRing, ExternalLink, Sparkles, Users } from 'lucide-react';
import BookShowcaseCard from '../components/BookShowcaseCard';
import { PROGRAMS as ALL_PROGRAMS } from '../utils/constants';
import {
    CATALOG_BOOKS,
    SOCIAL_LINKS,
    WHATSAPP_COMMUNITY_URL,
    whatsappLink,
} from '../utils/siteContent';

// ── Four major programs (each links to its own program page) ──────────────
const PROGRAM_TILES = [
    { slug: 'mistakes-singles-can-avoid', title: 'Mistakes that Singles Can Avoid', isNew: true },
    { slug: 'preparing-for-love', title: 'Single and Built – Preparing for Love' },
    { slug: 'choosing-well', title: 'Single and Built – Choosing Well' },
    { slug: 'keepers', title: 'Keepers of Love', isNew: true },
].map((tile) => {
    const program = ALL_PROGRAMS.find((p) => p.slug === tile.slug);
    return { ...tile, image: program?.image ?? '', desc: program?.description ?? '' };
});

// ── Books (all nine, in the order they were briefed) ──────────────────────
const BOOKS = [
    CATALOG_BOOKS.solidForm,
    CATALOG_BOOKS.solidCore,
    CATALOG_BOOKS.endedRelationships,
    CATALOG_BOOKS.mistakes,
    CATALOG_BOOKS.preparing,
    CATALOG_BOOKS.choosing,
    CATALOG_BOOKS.keepers,
    CATALOG_BOOKS.passion,
    CATALOG_BOOKS.pureMan,
];

const fadeUp = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const WhatsAppIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
);

export default function WisdomForSingles() {
    return (
        <>
            <Helmet>
                <title>Wisdom for Singles | Hekimika – Wise Nation</title>
                <meta name="description" content="Are you single and want wisdom on love, relationships and dating? Hekimika has programs, books, and community specifically built to equip you." />
            </Helmet>

            {/* ── Hero ─────────────────────────────────────────── */}
            <section
                className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #001226 0%, #001F3F 45%, #002855 100%)',
                }}
            >
                {/* Decorative gold ring */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    style={{
                        width: '700px', height: '700px',
                        border: '1px solid rgba(212,175,55,0.08)',
                    }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    style={{
                        width: '500px', height: '500px',
                        border: '1px solid rgba(212,175,55,0.12)',
                    }}
                />

                {/* Soft gold glow */}
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                        width: '600px', height: '300px',
                        background: 'radial-gradient(ellipse at center bottom, rgba(212,175,55,0.12) 0%, transparent 70%)',
                    }}
                />

                <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pt-36 pb-24">
                    {/* Overline */}
                    <motion.p
                        {...fadeUp} transition={{ duration: 0.6 }}
                        className="text-xs font-bold uppercase tracking-[0.3em] mb-5 flex items-center justify-center gap-2"
                        style={{ color: 'var(--gold)' }}
                    >
                        <span className="w-8 h-px" style={{ background: 'var(--gold)' }} />
                        For Singles
                        <span className="w-8 h-px" style={{ background: 'var(--gold)' }} />
                    </motion.p>

                    {/* Headline */}
                    <motion.h1
                        {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}
                        className="font-bold text-white leading-tight mb-6"
                        style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                    >
                        You Are Not Behind.{' '}
                        <span style={{ color: 'var(--gold)' }}>You Are Being Built.</span>
                    </motion.h1>

                    {/* Sub */}
                    <motion.p
                        {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
                    >
                        A word for every single person finding their footing in love, dating, and life.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        {...fadeUp} transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <a
                            href={WHATSAPP_COMMUNITY_URL}
                            target="_blank" rel="noopener noreferrer"
                            className="btn-primary px-7 py-3.5 text-sm font-bold flex items-center gap-2"
                        >
                            <WhatsAppIcon />
                            Join Our Community
                        </a>
                        <Link
                            to="/contact"
                            className="px-7 py-3.5 text-sm font-bold rounded-lg border flex items-center gap-2 transition-colors"
                            style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff', background: 'rgba(255,255,255,0.06)' }}
                        >
                            Talk to Us <ArrowRight size={15} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── Opening Letter ───────────────────────────────── */}
            <section className="section-pad bg-white">
                <div className="container-xl max-w-3xl">
                    <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="prose prose-lg mx-auto">
                        <p className="text-2xl font-bold text-navy mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Hello,
                        </p>
                        <div className="space-y-5 text-gray-600 leading-relaxed text-base md:text-lg">
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
                                <strong className="text-navy">We have so much for you.</strong>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Programs for Singles ─────────────────────────── */}
            <section id="programs" className="section-pad scroll-mt-24" style={{ background: 'var(--navy)' }}>
                <div className="container-xl">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3 opacity-60" style={{ color: 'var(--gold)' }}>
                            Perfected in Wisdom
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--gold)' }}>
                            Programs Built for You
                        </h2>
                        <p className="text-white/60 max-w-xl mx-auto">
                            There are four major programs with manuals/books for singles to help you get started.
                            Tap any program to learn more.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {PROGRAM_TILES.map((p, i) => (
                            <motion.div
                                key={p.slug}
                                {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/10 hover:border-[color:var(--gold)] hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-[color:var(--gold)]"
                                style={{ background: 'rgba(255,255,255,0.04)' }}
                            >
                                {/* Poster */}
                                <div className="relative aspect-square overflow-hidden">
                                    {p.image ? (
                                        <img
                                            src={p.image}
                                            alt={`${p.title} poster`}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div
                                            className="w-full h-full flex flex-col items-center justify-center text-center p-8"
                                            style={{ background: 'linear-gradient(135deg, #001226 0%, #002855 100%)' }}
                                        >
                                            <Sparkles size={30} style={{ color: 'var(--gold)' }} className="mb-5 opacity-80" />
                                            <span className="w-10 h-px mb-4" style={{ background: 'var(--gold)' }} />
                                            <p className="font-bold text-xl leading-snug" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--gold)' }}>
                                                {p.title}
                                            </p>
                                        </div>
                                    )}
                                    {p.isNew && (
                                        <span
                                            className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg"
                                            style={{ background: 'var(--gold)', color: 'var(--navy)' }}
                                        >
                                            New
                                        </span>
                                    )}
                                </div>

                                {/* Body */}
                                <div className="flex flex-col flex-1 p-6">
                                    <h3 className="text-white font-bold text-lg mb-2 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        {p.title}
                                    </h3>
                                    <p className="text-white/55 text-sm leading-relaxed mb-5 line-clamp-3">{p.desc}</p>
                                    <Link
                                        to={`/programs/${p.slug}`}
                                        className="mt-auto inline-flex items-center gap-2 text-sm font-bold transition-all group-hover:gap-3 after:absolute after:inset-0 after:content-['']"
                                        style={{ color: 'var(--gold)' }}
                                        aria-label={`Learn more about ${p.title}`}
                                    >
                                        Learn More <ArrowRight size={15} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Keep-me-updated notice */}
                    <motion.div
                        {...fadeUp} transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-5 md:gap-8 text-center md:text-left"
                        style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.3)' }}
                    >
                        <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center" style={{ background: 'rgba(212,175,55,0.18)' }}>
                            <BellRing size={22} style={{ color: 'var(--gold)' }} />
                        </div>
                        <p className="text-white/80 leading-relaxed flex-1">
                            <strong className="text-white">Reach out to us</strong> so we can keep you updated when any of the programs are running.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <a
                                href={whatsappLink('Hello Hekimika, I am single. Please keep me updated when any of the Single and Built programs are running.')}
                                target="_blank" rel="noopener noreferrer"
                                className="btn-primary px-5 py-2.5 text-sm"
                            >
                                <WhatsAppIcon /> Notify Me
                            </a>
                            <Link to="/perfected-in-wisdom" className="btn-outline px-5 py-2.5 text-sm">
                                All Programs
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Books for Singles ────────────────────────────── */}
            <section id="books" className="section-pad bg-gray-50 scroll-mt-24">
                <div className="container-xl">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3 opacity-60" style={{ color: 'var(--navy)' }}>
                            Books for You
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Books to Build You
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            There are several books for you too, authored by Pastor Kevin Mulati. Tap a book to
                            get your copy on Selar and start reading today.
                        </p>
                        <div className="mx-auto mt-5 h-px w-16 bg-gold opacity-50" />
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                        {BOOKS.map((b, i) => (
                            <BookShowcaseCard key={b.key} book={b} index={i} />
                        ))}
                    </div>

                    <div className="text-center">
                        <Link to="/resources" className="inline-flex items-center gap-3 text-navy font-bold hover:text-gold transition-all group">
                            Explore All Resources <div className="w-10 h-px bg-gold group-hover:w-16 transition-all" /> <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Social Media ─────────────────────────────────── */}
            <section className="section-pad" style={{ background: 'var(--navy)' }}>
                <div className="container-xl text-center">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-10">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3 opacity-60" style={{ color: 'var(--gold)' }}>
                            Stay Connected
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--gold)' }}>
                            Follow Us for Daily Wisdom
                        </h2>
                        <p className="text-white/60 max-w-lg mx-auto">
                            Visit our social media (Spotify, Instagram, Facebook, YouTube, and TikTok) for more
                            engagement and content.
                        </p>
                    </motion.div>

                    <motion.div
                        {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        {SOCIAL_LINKS.map((s) => (
                            <a
                                key={s.label}
                                href={s.href} target="_blank" rel="noopener noreferrer"
                                className="px-7 py-3 rounded-full text-white text-sm font-bold flex items-center gap-2 border border-white/15 hover:opacity-90 transition-all hover:scale-105"
                                style={{ background: s.color }}
                            >
                                {s.label} <ExternalLink size={13} />
                            </a>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Community + Contact CTA ──────────────────────── */}
            <section className="section-pad bg-white">
                <div className="container-xl max-w-3xl text-center">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                            style={{ background: 'rgba(0,31,63,0.07)' }}
                        >
                            <Users size={32} style={{ color: 'var(--navy)' }} />
                        </div>
                        <h2 className="text-3xl font-bold text-navy mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            You Don't Have to Walk Alone
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto">
                            Additionally, you can reach out to us on WhatsApp in case you have any needs or burning
                            questions, or join{' '}
                            <strong className="text-navy">Our Wisdom Moments Singles</strong> and interact
                            with other singles.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                href={whatsappLink('Hello Hekimika, I am single and would love more wisdom on love and relationships.')}
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-white font-bold text-sm hover:opacity-90 transition-opacity"
                                style={{ background: '#25D366' }}
                            >
                                <WhatsAppIcon />
                                Reach Out on WhatsApp
                            </a>
                            <a
                                href={WHATSAPP_COMMUNITY_URL}
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold text-sm border-2 hover:bg-navy hover:text-white transition-colors"
                                style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}
                            >
                                <Users size={17} />
                                Join Wisdom Moments Singles
                            </a>
                            <Link
                                to="/contact"
                                className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold"
                            >
                                Contact Us <ArrowRight size={15} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
