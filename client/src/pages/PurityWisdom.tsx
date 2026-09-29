import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, ExternalLink, Shield } from 'lucide-react';

// ── Purity program ───────────────────────────────────────
const PROGRAM = {
    title: 'School of Purity – Purity Basics',
    desc: 'A foundational program that addresses the root of purity — the state of your heart. Learn how formation determines function and discover how to live as a dominant son of God in a dark world.',
};

// ── Books on Purity ──────────────────────────────────────
const BOOKS = [
    {
        title: 'The Pure Man',
        desc: 'A bold, direct call to godly masculinity and purity in a generation where the standard has been lost. Written for young men who want to stand out.',
        link: 'https://selar.com/puremanbk',
    },
    {
        title: 'Cultured in Love – Passion',
        desc: 'Passion is a beautiful gift from God. This book helps you understand, steward, and channel your passion wisely for life and relationships.',
        link: 'https://selar.com/7hb2n47455',
    },
];

// ── Social channels ──────────────────────────────────────
const SOCIALS = [
    { label: 'Spotify', href: 'https://open.spotify.com/show/hekimika', color: '#1DB954' },
    { label: 'Instagram', href: 'https://www.instagram.com/hekimika2?igsh=aWx5YnY1N2x1aW5z', color: '#E1306C' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61552354056302', color: '#1877F2' },
    { label: 'YouTube', href: 'https://www.youtube.com/@Hekimika001', color: '#FF0000' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@hekimika5?_r=1&_t=ZS-95YHLB2yd3U', color: '#010101' },
];

const fadeUp = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function PurityWisdom() {
    return (
        <>
            <Helmet>
                <title>Is Purity Possible? | Hekimika – Wise Nation</title>
                <meta name="description" content="Is it really possible to live purely as a young person? Yes — and Hekimika has the programs, books, and community to show you how." />
            </Helmet>

            {/* ── Hero ─────────────────────────────────────────── */}
            <section
                className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #001226 0%, #001F3F 45%, #002855 100%)',
                }}
            >
                {/* Decorative rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    style={{ width: '700px', height: '700px', border: '1px solid rgba(212,175,55,0.07)' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    style={{ width: '480px', height: '480px', border: '1px solid rgba(212,175,55,0.12)' }} />

                {/* Gold glow at top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                        width: '500px', height: '250px',
                        background: 'radial-gradient(ellipse at center top, rgba(212,175,55,0.1) 0%, transparent 70%)',
                    }} />

                <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pt-36 pb-24">
                    {/* Overline */}
                    <motion.p
                        {...fadeUp} transition={{ duration: 0.6 }}
                        className="text-xs font-bold uppercase tracking-[0.3em] mb-5 flex items-center justify-center gap-2"
                        style={{ color: 'var(--gold)' }}
                    >
                        <span className="w-8 h-px" style={{ background: 'var(--gold)' }} />
                        For Young People
                        <span className="w-8 h-px" style={{ background: 'var(--gold)' }} />
                    </motion.p>

                    {/* Headline */}
                    <motion.h1
                        {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}
                        className="font-bold text-white leading-tight mb-6"
                        style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                    >
                        Purity Is Not Outdated.{' '}
                        <span style={{ color: 'var(--gold)' }}>It Is Powerful.</span>
                    </motion.h1>

                    {/* Sub */}
                    <motion.p
                        {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
                    >
                        For the young person who wants to stand out in a generation where purity feels rare.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        {...fadeUp} transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <Link to="/perfected-in-wisdom" className="btn-primary px-7 py-3.5 text-sm font-bold flex items-center gap-2">
                            See Our Programs <ArrowRight size={15} />
                        </Link>
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
                    <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
                        <p className="text-2xl font-bold text-navy mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Hi,</p>
                        <div className="space-y-5 text-gray-600 leading-relaxed text-base md:text-lg">
                            <p>
                                That is an excellent question. It shows you are moving in the right direction as a young
                                person — and that you are willing to stand out in a generation where many feel purity is
                                outdated.
                            </p>
                            <p>
                                It is easy to be discouraged and feel like you are the only remnant in a dark world. But
                                be encouraged — <strong className="text-navy">you are not alone.</strong>
                            </p>
                            <p>
                                In life, the way you are formed determines how you live and function. A pure lifestyle is
                                only possible depending on the state of your heart. This platform has a wealth of
                                resources to help you become formed so that you can live as a dominant son of God in a
                                dark world.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Program Spotlight ────────────────────────────── */}
            <section className="section-pad" style={{ background: 'var(--navy)' }}>
                <div className="container-xl max-w-3xl">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3 opacity-60" style={{ color: 'var(--gold)' }}>
                            Perfected in Wisdom
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--gold)' }}>
                            The School of Purity
                        </h2>
                        <p className="text-white/60 max-w-lg mx-auto">
                            A dedicated program that goes to the root — because lasting purity is an inside-out journey.
                        </p>
                    </motion.div>

                    <motion.div
                        {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
                        className="rounded-2xl p-8 border border-white/10 hover:border-gold/40 transition-all mb-8"
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                    >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(212,175,55,0.15)' }}>
                            <Shield size={24} style={{ color: 'var(--gold)' }} />
                        </div>
                        <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {PROGRAM.title}
                        </h3>
                        <p className="text-white/55 leading-relaxed mb-6">{PROGRAM.desc}</p>
                        <Link to="/perfected-in-wisdom" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-bold">
                            Find Out More <ArrowRight size={15} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── Books on Purity ──────────────────────────────── */}
            <section className="section-pad bg-gray-50">
                <div className="container-xl max-w-3xl">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3 opacity-60" style={{ color: 'var(--navy)' }}>
                            Books on Purity
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Read Your Way to Clarity
                        </h2>
                        <p className="text-gray-500 max-w-lg mx-auto">
                            Two books specifically written to address the foundation of a pure life.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                        {BOOKS.map((b, i) => (
                            <motion.div
                                key={b.title}
                                {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col"
                            >
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(0,31,63,0.06)' }}>
                                    <BookOpen size={20} style={{ color: 'var(--navy)' }} />
                                </div>
                                <h3 className="text-navy font-bold text-base mb-2 flex-1 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    {b.title}
                                </h3>
                                <p className="text-gray-500 text-sm mb-5 leading-relaxed">{b.desc}</p>
                                <a
                                    href={b.link} target="_blank" rel="noopener noreferrer"
                                    className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2 mt-auto"
                                >
                                    Get Soft Copy <ExternalLink size={13} />
                                </a>
                            </motion.div>
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
                            Stay in the Conversation
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--gold)' }}>
                            Follow Us for Daily Wisdom
                        </h2>
                        <p className="text-white/60 max-w-lg mx-auto">
                            Engage with content that challenges, builds, and encourages — available on all major platforms.
                        </p>
                    </motion.div>
                    <motion.div
                        {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        {SOCIALS.map((s) => (
                            <a
                                key={s.label}
                                href={s.href} target="_blank" rel="noopener noreferrer"
                                className="px-7 py-3 rounded-full text-white text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all hover:scale-105"
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
                        <h2 className="text-3xl font-bold text-navy mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            You Are Not the Last One Standing
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto">
                            Connect with a community of young people who are choosing the same path — on WhatsApp
                            or Telegram. You'll find encouragement, accountability, and real wisdom for your journey.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                href="https://chat.whatsapp.com/Gp9LwRFOHxe95VELronPvt"
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-white font-bold text-sm hover:opacity-90 transition-opacity"
                                style={{ background: '#25D366' }}
                            >
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                Join WhatsApp Community
                            </a>
                            <a
                                href="https://t.me/+YLkY8tmLLjw0MWNk"
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-white font-bold text-sm hover:opacity-90 transition-opacity"
                                style={{ background: '#0088cc' }}
                            >
                                Join Telegram Channel <ExternalLink size={13} />
                            </a>
                            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold">
                                Contact Us <ArrowRight size={15} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
