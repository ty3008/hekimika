import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, BookOpen, Users, Heart, Star, PlayCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import ProgramCard from '../components/ProgramCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { PROGRAMS } from '../utils/constants';

import HeroBgImg from '../assets/Pst Kevin and Lilian.jpg';

const HERO_BG = HeroBgImg;

const ARMS = [
    {
        icon: Star,
        title: 'Perfected in Wisdom',
        description: 'Transformative programs for singles, couples, and leaders — building character, healing, and purpose.',
        to: '/perfected-in-wisdom',
        color: '#D4AF37',
    },
    {
        icon: Heart,
        title: 'Wisdom Moments',
        description: 'Audio teachings, devotionals, and Q&A content to feed your spirit and renew your mind daily.',
        to: '/wisdom-moments',
        color: '#E8CC6A',
    },
    {
        icon: Users,
        title: 'Young & Wise',
        description: 'Raising a wise generation of teens through mentorship, community, and purposeful guidance.',
        to: '/young-and-wise',
        color: '#D4AF37',
    },
];

const STATS = [
    { value: '10,000+', label: 'Lives Transformed' },
    { value: '11+', label: 'Programs' },
    { value: '50+', label: 'Nations Reached' },
    { value: '8', label: 'Years of Impact' },
];

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
};

export default function Home() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

    const featured = PROGRAMS.filter((p) => ['Preparing for Love', 'School of Purity', 'Beginning Right', 'Built to Lead'].includes(p.title)).slice(0, 4);

    return (
        <>
            <Helmet>
                <title>Hekimika – Wise Nation | Raising the Generation of the Wise</title>
                <meta name="description" content="Join Hekimika – a global ministry equipping singles, couples, and leaders with wisdom, healing, and purpose. Programs by Pastor Kevin & Lilian Mulati." />
            </Helmet>

            {/* ── Hero ── */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <motion.div className="absolute inset-0" style={{ y }}>
                    <img src={HERO_BG} alt="Hero" className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,31,63,0.7) 0%, rgba(0,31,63,0.85) 100%)' }} />
                </motion.div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.p
                        {...fadeUp}
                        animate={fadeUp.animate}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-sm font-semibold uppercase tracking-widest mb-4"
                        style={{ color: 'var(--gold)' }}
                    >
                        A Global Outreach Ministry
                    </motion.p>
                    <motion.h1
                        {...fadeUp}
                        animate={fadeUp.animate}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        Raising the Generation<br />
                        <span style={{ color: 'var(--gold)' }}>of the Wise</span><br />
                        all over the World.
                    </motion.h1>
                    <motion.p
                        {...fadeUp}
                        animate={fadeUp.animate}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-sm font-semibold tracking-widest mb-4"
                        style={{ color: 'var(--gold)' }}
                    >
                        Hekimika is a Swahili word meaning ‘Be Wise’.
                    </motion.p>
                    <motion.p
                        {...fadeUp}
                        animate={fadeUp.animate}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
                    >
                        Transformative programs in relationships, purity, healing, and leadership — guided by Pastor Kevin & Lilian Mulati.
                    </motion.p>
                    <motion.div
                        {...fadeUp}
                        animate={fadeUp.animate}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <Link to="/perfected-in-wisdom" className="btn-primary px-8 py-4 text-base flex items-center gap-2">
                            Explore Programs <ArrowRight size={18} />
                        </Link>
                        <Link to="/about" className="btn-outline px-8 py-4 text-base flex items-center gap-2">
                            <PlayCircle size={18} /> Our Story
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <div className="w-px h-10 bg-white/40" />
                    <p className="text-white/50 text-xs uppercase tracking-widest">Scroll</p>
                </motion.div>
            </section>

            {/* ── Stats ── */}
            <section style={{ background: 'var(--navy)' }} className="py-16 px-4 md:px-8 lg:px-16">
                <div className="container-xl grid grid-cols-2 md:grid-cols-4 gap-8">
                    {STATS.map(({ value, label }) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color: 'var(--gold)', fontFamily: 'Poppins, sans-serif' }}>{value}</p>
                            <p className="text-white/60 text-sm">{label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Featured Programs ── */}
            <section className="section-pad bg-gray-50">
                <div className="container-xl">
                    <SectionTitle
                        overline="Perfected in Wisdom"
                        title="Programs That Transform Lives"
                        subtitle="Our curriculum is designed to bring real, lasting change — grounded in Scripture and delivered with excellence."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                        {featured.map((p, i) => (
                            <ProgramCard key={p.slug} {...p} index={i} />
                        ))}
                    </div>
                    <div className="text-center">
                        <Link to="/perfected-in-wisdom" className="btn-primary px-8 py-4 text-base inline-flex items-center gap-2">
                            View All Programs <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Arms of Wise Nation ── */}
            <section className="section-pad" style={{ background: 'var(--navy)' }}>
                <div className="container-xl">
                    <SectionTitle
                        overline="Our Ministry"
                        title="Arms of Wise Nation"
                        subtitle="Three powerful expressions of the Hekimika vision, all working together to raise the generation of the wise."
                        light
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {ARMS.map(({ icon: Icon, title, description, to, color }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                className="p-8 rounded-2xl border border-white/10 hover:border-gold transition-colors group cursor-pointer"
                                style={{ background: 'rgba(255,255,255,0.04)' }}
                                onClick={() => window.location.href = to}
                            >
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: `${color}20` }}>
                                    <Icon size={28} style={{ color }} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
                                <p className="text-white/60 leading-relaxed mb-6">{description}</p>
                                <Link to={to} className="text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all" style={{ color }}>
                                    Explore <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Testimonials ── */}
            <section className="section-pad bg-gray-50">
                <div className="container-xl">
                    <SectionTitle
                        overline="Testimonials"
                        title="Stories of Transformation"
                        subtitle="Real lives changed by the wisdom and grace of God through our programs."
                    />
                    <TestimonialCarousel />
                </div>
            </section>

            {/* ── About Teaser ── */}
            <section className="section-pad">
                <div className="container-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>Our Leadership</p>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>
                                Pastor Kevin & Lilian Mulati
                            </h2>
                            <p className="text-gray-500 leading-relaxed mb-8">
                                Pastor Kevin and Lilian Mulati are visionaries of the Wise Nation which is a global outreach program that aims to impart all with the Wisdom of God to live a life of significance, relevance, and dominion while pursuing purpose. They are passionate about the Wisdom, love and power of God finding expression in men.
                            </p>
                            <Link to="/about" className="btn-primary inline-flex items-center gap-2 px-8 py-3">
                                Meet the Leadership <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <img
                                src={HERO_BG}
                                alt="Pastor Kevin and Lilian Mulati"
                                className="rounded-3xl w-full h-[450px] object-cover shadow-2xl"
                            />
                            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-5 shadow-xl">
                                <p className="text-2xl font-bold" style={{ color: 'var(--navy)', fontFamily: 'Poppins, sans-serif' }}>8+ Years</p>
                                <p className="text-gray-500 text-sm">of Kingdom Impact</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Resources Teaser ── */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
                <div className="container-xl text-center">
                    <SectionTitle
                        overline="Resources"
                        title="Books & Teachings"
                        subtitle="Bite-sized wisdom you can take home — softcopy books and audio teachings available at your fingertips."
                    />
                    <div className="flex flex-wrap gap-6 justify-center">
                        {[
                            { icon: BookOpen, label: 'Softcopy Books', desc: 'Browse our library of ministry books', to: '/resources' },
                            { icon: PlayCircle, label: 'Audio Teachings', desc: 'Listen on YouTube & Facebook', to: '/wisdom-moments' },
                        ].map(({ icon: Icon, label, desc, to }, i) => (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="card p-8 w-64 text-center"
                            >
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(0,31,63,0.06)' }}>
                                    <Icon size={28} style={{ color: 'var(--navy)' }} />
                                </div>
                                <h4 className="font-bold text-navy mb-2" style={{ color: 'var(--navy)', fontFamily: 'Poppins, sans-serif' }}>{label}</h4>
                                <p className="text-gray-400 text-sm mb-4">{desc}</p>
                                <Link to={to} className="text-sm font-semibold flex items-center gap-1 justify-center" style={{ color: 'var(--gold)' }}>
                                    Explore <ArrowRight size={13} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
