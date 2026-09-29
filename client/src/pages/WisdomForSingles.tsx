import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, ExternalLink } from 'lucide-react';

// ── Program cards ────────────────────────────────────────
const PROGRAMS = [
    {
        title: 'Mistakes That Singles Can Avoid',
        desc: 'Practical wisdom to help you navigate common pitfalls in singlehood and build a strong foundation for your future.',
    },
    {
        title: 'Single and Built – Preparing for Love',
        desc: 'A transformative program that equips you to be whole, healthy, and ready — before you ever enter a relationship.',
    },
    {
        title: 'Single and Built – Choosing Well',
        desc: 'Learn how to discern, evaluate, and make wise choices in dating so you attract and select the right person.',
    },
    {
        title: 'Keepers of Love',
        desc: 'Build the character and values that make you someone worth keeping — and help you recognise who is worth keeping too.',
    },
];

// ── Books ────────────────────────────────────────────────
const BOOKS = [
    {
        title: 'Cultured in Love – Creating a Solid Form',
        desc: 'Your internal reality determines how you experience love. Build the right inner framework.',
        link: 'https://selar.com/66d7414624',
    },
    {
        title: 'Cultured in Love – Establishing a Solid Core',
        desc: 'Develop the character, values, and convictions that make for a life well-lived.',
        link: 'https://selar.com/7770f17ty0',
    },
    {
        title: 'Cultured in Love – Dealing with Ended Relationships',
        desc: 'Practical and spiritual guidance for healing well and moving forward with clarity.',
        link: 'https://selar.com/477717r206',
    },
    {
        title: 'Passion',
        desc: 'Passion is a beautiful thing God has given every person. Learn how to steward it wisely.',
        link: 'https://selar.com/7hb2n47455',
    },
    {
        title: 'The Pure Man',
        desc: 'A bold call to godly masculinity and purity in a generation that has lost its standard.',
        link: 'https://selar.com/puremanbk',
    },
];

// ── Social channels ──────────────────────────────────────
const SOCIALS = [
    { label: 'Instagram', href: 'https://www.instagram.com/hekimika2?igsh=aWx5YnY1N2x1aW5z', color: '#E1306C' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61552354056302', color: '#1877F2' },
    { label: 'YouTube', href: 'https://www.youtube.com/@Hekimika001', color: '#FF0000' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@hekimika5?_r=1&_t=ZS-95YHLB2yd3U', color: '#010101' },
];

const fadeUp = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

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
                            href="https://chat.whatsapp.com/Gp9LwRFOHxe95VELronPvt"
                            target="_blank" rel="noopener noreferrer"
                            className="btn-primary px-7 py-3.5 text-sm font-bold flex items-center gap-2"
                        >
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
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
                                your next phase of life — which is dating.
                            </p>
                            <p>
                                We have plenty of resources that will equip you and make you solid as a single person:
                                from programs to podcasts to books to online monthly meetings.{' '}
                                <strong className="text-navy">We have so much for you.</strong>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Programs for Singles ─────────────────────────── */}
            <section className="section-pad" style={{ background: 'var(--navy)' }}>
                <div className="container-xl">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3 opacity-60" style={{ color: 'var(--gold)' }}>
                            Perfected in Wisdom
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--gold)' }}>
                            Programs Built for You
                        </h2>
                        <p className="text-white/60 max-w-xl mx-auto">
                            Four major programs specifically designed for singles — each with a manual and transformative curriculum.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                        {PROGRAMS.map((p, i) => (
                            <motion.div
                                key={p.title}
                                {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="rounded-2xl p-7 border border-white/10 hover:border-gold/40 transition-all"
                                style={{ background: 'rgba(255,255,255,0.04)' }}
                            >
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(212,175,55,0.15)' }}>
                                    <BookOpen size={20} style={{ color: 'var(--gold)' }} />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    {p.title}
                                </h3>
                                <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            to="/perfected-in-wisdom"
                            className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-sm font-bold"
                        >
                            View All Programs <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Books for Singles ────────────────────────────── */}
            <section className="section-pad bg-gray-50">
                <div className="container-xl">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3 opacity-60" style={{ color: 'var(--navy)' }}>
                            Featured Books
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Books to Build You
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            Powerful resources authored by Pastor Kevin Mulati — get your soft copy and start reading today.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {BOOKS.map((b, i) => (
                            <motion.div
                                key={b.title}
                                {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg transition-all group flex flex-col"
                            >
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(0,31,63,0.06)' }}>
                                    <BookOpen size={20} style={{ color: 'var(--navy)' }} />
                                </div>
                                <h3 className="text-navy font-bold text-base mb-2 leading-snug flex-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
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
                            Stay Connected
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--gold)' }}>
                            Follow Us for Daily Wisdom
                        </h2>
                        <p className="text-white/60 max-w-lg mx-auto">
                            Join thousands of young people receiving wisdom daily through our social media platforms.
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
                            Reach out to us on WhatsApp with any questions or join our{' '}
                            <strong className="text-navy">Wisdom Moments Singles</strong> community and interact
                            with other singles on the same journey.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                href="https://wa.me/254702338163?text=Hello%20Hekimika,%20I%20am%20single%20and%20would%20love%20more%20wisdom%20on%20love%20and%20relationships."
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-white font-bold text-sm hover:opacity-90 transition-opacity"
                                style={{ background: '#25D366' }}
                            >
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                Reach Out on WhatsApp
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
