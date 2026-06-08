import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
    Headphones, Target, Heart, ArrowRight, PlayCircle,
    Users, BookOpen, Zap, Shield, Star, MessageCircle, Mic2
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { Link } from 'react-router-dom';
import Lightbox from '../components/Lightbox';

// Gallery images
import WM1 from '../assets/WM1.webp';
import WM2 from '../assets/WM2.webp';
import WM3 from '../assets/WM3.webp';
import WM4 from '../assets/WM4.webp';
import WM5 from '../assets/WM5.webp';
import WM6 from '../assets/WM6.webp';

const GALLERY_IMAGES = [
    { src: WM1, alt: 'Wisdom Moments gathering' },
    { src: WM2, alt: 'Wisdom Moments teaching session' },
    { src: WM3, alt: 'Community at Wisdom Moments' },
    { src: WM4, alt: 'Wisdom Moments worship' },
    { src: WM5, alt: 'Wisdom Moments prayer' },
    { src: WM6, alt: 'Wisdom Moments fellowship' },
];

const FORUMS = [
    { title: 'Singles Forum', desc: 'Guidance and clarity for the season of singleness.', slug: 'singles', icon: Heart },
    { title: 'Couples Forum', desc: 'Building strong, God-centered foundations for marriage.', slug: 'couples', icon: Users },
    { title: 'Leaders Forum', desc: 'Impartation for leadership in every sphere of life.', slug: 'leaders', icon: Star },
    { title: 'Called to Serve', desc: 'Equipping those called to serve with ministry wisdom.', slug: 'called-to-serve', icon: Shield },
    { title: 'Solid Man', desc: 'Raising strong men as supreme models of love and family.', slug: 'solid-man', icon: Zap },
    { title: 'Blogs', desc: 'Read insightful articles and stories of wisdom.', slug: 'blogs', icon: BookOpen },
    { title: 'Q&A', desc: "Find answers to life's most pressing questions through divine wisdom.", slug: 'qa', icon: MessageCircle },
];

const GOALS = [
    {
        icon: Target,
        title: 'Access to Wisdom',
        desc: 'Providing every person a platform to access the Wisdom of God — regardless of their season or background.',
    },
    {
        icon: Users,
        title: 'Community & Mentorship',
        desc: 'Releasing mentors worldwide through nurturing relationships. We call them the Generation of the Wise.',
    },
    {
        icon: Heart,
        title: 'Love & Wholeness',
        desc: 'Walking with couples and singles through the waters of love, relationships, and God-centered family life.',
    },
];

const TESTIMONIAL = {
    quote: "Wisdom Moments completely transformed how I approach relationships and purpose. Pastor Kevin's teachings gave me clarity I had been searching for years.",
    name: 'Mercy N.',
    role: 'Couples Forum Member',
};

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.07 } }),
};

export default function WisdomMoments() {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    return (
        <>
            <Helmet>
                <title>Wisdom Moments | Hekimika Media</title>
                <meta name="description" content="Audio teachings, forums, and devotionals by Pastor Kevin & Lilian Mulati — a platform for the impartation of God's Wisdom." />
            </Helmet>

            {/* ─── 1. HERO ─── */}
            <section className="relative pt-36 pb-24 px-4 md:px-8 lg:px-16 overflow-hidden" style={{ background: 'var(--navy)' }}>
                {/* decorative circles */}
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5" style={{ background: 'var(--gold)', transform: 'translate(30%, -30%)' }} />
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5" style={{ background: 'var(--gold)', transform: 'translate(-30%, 30%)' }} />

                <div className="container-xl text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(212,175,55,0.15)' }}>
                            <Mic2 size={30} style={{ color: 'var(--gold)' }} />
                        </div>
                        <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>A Platform for Impartation</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif', lineHeight: 1.15 }}>
                            Wisdom Moments
                        </h1>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
                            Organized gatherings, forums, teachings, blogs, and devotionals — all designed to release the Wisdom of God into everyday life.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center mt-10">
                            <a href="#forums" className="btn-primary px-8 py-3 inline-flex items-center gap-2">
                                Explore Our Forums <ArrowRight size={16} />
                            </a>
                            <a href="#gallery" className="btn-outline px-8 py-3 inline-flex items-center gap-2 text-white border-white/30 hover:border-white">
                                View Gallery
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── 2. WHAT IS WISDOM MOMENTS (Intent) ─── */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
                <div className="container-xl">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>What We Are</p>
                            <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: 'var(--navy)', fontFamily: 'Poppins, sans-serif' }}>
                                The Heart Behind Wisdom Moments
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                Wisdom Moments is the platform for impartation of the Wisdom of God through organized meetings, forums, teachings, blogs, and devotionals. We believe every person — regardless of their season — deserves access to life-transforming wisdom.
                            </p>
                        </motion.div>
                    </div>

                    {/* 3 Goal Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {GOALS.map((goal, i) => (
                            <motion.div
                                key={goal.title}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="flex flex-col items-start p-8 rounded-2xl border border-gray-100 hover:border-gold hover:shadow-lg transition-all duration-300"
                                style={{ borderColor: 'var(--gray-100)' }}
                            >
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(212,175,55,0.1)' }}>
                                    <goal.icon size={22} style={{ color: 'var(--gold)' }} />
                                </div>
                                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--navy)', fontFamily: 'Poppins, sans-serif' }}>{goal.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{goal.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 3. FORUMS GRID ─── */}
            <section id="forums" className="py-20 px-4 md:px-8 lg:px-16" style={{ background: '#f8f8f6' }}>
                <div className="container-xl">
                    <SectionTitle
                        overline="Interactive Communities"
                        title="Our Forums"
                        subtitle="Dedicated spaces where we walk closely with individuals in every season of life — singles, couples, leaders, and servants."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
                        {FORUMS.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <motion.div
                                    key={f.title}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                >
                                    <Link
                                        to={f.slug === 'blogs' ? '/blog' : `/forums/${f.slug}`}
                                        className="group flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 h-full border border-transparent hover:border-gold/30"
                                    >
                                        <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center transition-colors duration-300 group-hover:bg-gold/10" style={{ background: 'rgba(212,175,55,0.08)' }}>
                                            <Icon size={20} style={{ color: 'var(--gold)' }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <h4 className="font-bold text-base group-hover:text-gold transition-colors" style={{ color: 'var(--navy)', fontFamily: 'Poppins, sans-serif' }}>
                                                    {f.title}
                                                </h4>
                                                <ArrowRight size={16} className="text-gray-300 group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0" />
                                            </div>
                                            <p className="text-gray-500 text-sm mt-1 leading-snug">{f.desc}</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── 4. PHOTO GALLERY ─── */}
            <section id="gallery" className="py-20 px-4 md:px-8 lg:px-16 bg-white">
                <div className="container-xl">
                    <SectionTitle
                        overline="Gallery"
                        title="Moments in Pictures"
                        subtitle="A glimpse into the powerful gatherings and life-changing encounters at Wisdom Moments."
                    />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-10">
                        {GALLERY_IMAGES.map((img, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="group cursor-pointer overflow-hidden rounded-2xl relative shadow-sm hover:shadow-xl transition-all duration-300 aspect-square"
                                onClick={() => setLightboxIndex(i)}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <p className="text-white text-xs font-semibold tracking-wider uppercase">View Fullscreen</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <Lightbox
                    images={GALLERY_IMAGES}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}

            {/* ─── 5. TESTIMONIAL ─── */}
            <section className="py-20 px-4 md:px-8 lg:px-16" style={{ background: 'var(--navy)' }}>
                <div className="container-xl max-w-3xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: 'rgba(212,175,55,0.15)' }}>
                            <Star size={24} style={{ color: 'var(--gold)' }} />
                        </div>
                        <blockquote className="text-white text-xl md:text-2xl font-medium leading-relaxed italic mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            "{TESTIMONIAL.quote}"
                        </blockquote>
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-10 h-0.5 rounded-full" style={{ background: 'var(--gold)' }} />
                            <div>
                                <p className="font-bold text-white text-sm">{TESTIMONIAL.name}</p>
                                <p className="text-white/50 text-xs">{TESTIMONIAL.role}</p>
                            </div>
                            <div className="w-10 h-0.5 rounded-full" style={{ background: 'var(--gold)' }} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── 6. MEDIA CTA ─── */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
                <div className="container-xl">
                    <div className="rounded-3xl p-10 md:p-16 text-center" style={{ background: 'linear-gradient(135deg, #f8f6f0 0%, #fdf9f0 100%)', border: '1px solid rgba(212,175,55,0.2)' }}>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>Stay Connected</p>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--navy)', fontFamily: 'Poppins, sans-serif' }}>
                                Access Our Media
                            </h2>
                            <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                                Listen to audio teachings and follow our regular devotionals — updated weekly to keep you anchored in wisdom.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <a href="https://t.me/+YLkY8tmLLjw0MWNk" target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-4 inline-flex items-center gap-2">
                                    <Headphones size={18} /> Audio Teachings
                                </a>
                                <Link to="/video-teachings" className="btn-primary px-8 py-4 inline-flex items-center gap-2">
                                    <PlayCircle size={18} /> Video Teachings
                                </Link>
                                <a href="/resources" className="btn-outline px-8 py-4 inline-flex items-center gap-2" style={{ color: 'var(--navy)', borderColor: 'var(--navy)' }}>
                                    Explore Resources
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
