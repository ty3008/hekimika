import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Headphones, Target, Heart, ArrowRight, PlayCircle } from 'lucide-react';
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
    { src: WM1, alt: 'Wisdom Moments 1' },
    { src: WM2, alt: 'Wisdom Moments 2' },
    { src: WM3, alt: 'Wisdom Moments 3' },
    { src: WM4, alt: 'Wisdom Moments 4' },
    { src: WM5, alt: 'Wisdom Moments 5' },
    { src: WM6, alt: 'Wisdom Moments 6' },
];

const FORUMS = [
    { title: 'Blogs', desc: 'Read insightful articles and stories of wisdom.', slug: 'blogs' },
    { title: 'Singles Forum', desc: 'Guidance and clarity for the season of singleness.', slug: 'singles' },
    { title: 'Couples Forum', desc: 'Building strong, God-centered foundations for marriage.', slug: 'couples' },
    { title: 'Leaders Forum', desc: 'Impartation for leadership in every sphere of life.', slug: 'leaders' },
    { title: 'Called to Serve', desc: 'Equipping those called to serve with ministry wisdom.', slug: 'called-to-serve' },
    { title: 'Solid Man', desc: 'Raising strong men as supreme models of love and family.', slug: 'solid-man' },
    { title: 'Q&A', desc: 'Find answers to life\'s most pressing questions through divine wisdom.', slug: 'qa' },
];

const GOALS = [
    'To provide people with a platform where they can access Wisdom.',
    'Raise strong men and women who will be carriers of supreme models of love, marriage, and family (SOLID MAN).',
    'To open people up to the Teacher within through impartation.',
    'To walk with couples through the unknown waters of love and relationships.',
    'To release mentors all over the world; a journey of nurturing and mentoring. We call them the GENERATION OF THE WISE.',
];

export default function WisdomMoments() {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    return (
        <>
            <Helmet>
                <title>Wisdom Moments | Hekimika Media</title>
                <meta name="description" content="Audio teachings, forums, and devotionals by Pastor Kevin & Lilian Mulati." />
            </Helmet>

            <section className="pt-36 pb-20 px-4 md:px-8 lg:px-16" style={{ background: 'var(--navy)' }}>
                <div className="container-xl text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(212,175,55,0.15)' }}>
                            <Heart size={32} style={{ color: 'var(--gold)' }} />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Wisdom Moments
                        </h1>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
                            This is the platform for impartation of the Wisdom of God through organized meetings, forums, teachings, blogs, devotionals, etc.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Photo Gallery */}
            <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
                <div className="container-xl">
                    <SectionTitle
                        overline="Gallery"
                        title="Moments in Pictures"
                        subtitle="A glimpse into the powerful gatherings and life-changing encounters at Wisdom Moments."
                    />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-8">
                        {GALLERY_IMAGES.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.07 }}
                                className="group cursor-pointer overflow-hidden rounded-xl relative"
                                style={{ aspectRatio: i === 0 || i === 3 ? '4/3' : '3/4' }}
                                onClick={() => setLightboxIndex(i)}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors" />
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

            {/* Ultimate Goals */}
            <section className="section-pad bg-gray-50">
                <div className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>Our Intent</p>


                        <p className="text-gray-500 leading-relaxed mb-6 text-lg">
                            Through various forums and meetings, we provide a consistent stream of impartation, ensuring that the Wisdom of God is accessible to everyone, regardless of their season in life.
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--navy)', fontFamily: 'Poppins, sans-serif' }}>Ultimate Goals</h3>
                        <div className="space-y-4">
                            {GOALS.map((goal, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <Target size={20} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
                                    <p className="text-gray-600 leading-relaxed text-sm">{goal}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Ministry Forums */}
            <section className="section-pad bg-white">
                <div className="container-xl">
                    <SectionTitle
                        overline="Interactive Communities"
                        title="Our Forums"
                        subtitle="Dedicated spaces where we walk closely with individuals in different seasons of life."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
                        {FORUMS.map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link
                                    to={f.slug === 'blogs' ? '/blog' : `/forums/${f.slug}`}
                                    className="block bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border-l-4 border-gray-100 hover:border-gold group cursor-pointer h-full"
                                    style={{ borderLeftColor: 'var(--navy)' }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-lg mb-1 group-hover:text-gold transition-colors" style={{ color: 'var(--navy)', fontFamily: 'Poppins, sans-serif' }}>
                                                {f.title}
                                            </h4>
                                            <p className="text-gray-500 text-sm">{f.desc}</p>
                                        </div>
                                        <ArrowRight size={18} className="text-gray-300 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-4 bg-navy text-center">
                <div className="container-xl">
                    <SectionTitle
                        title="Access Our Media"
                        subtitle="Listen to audio teachings and follow our regular devotionals updated weekly."
                        light
                        centered
                    />
                    <div className="flex flex-wrap gap-4 justify-center mt-8">
                        <a href="https://t.me/+YLkY8tmLLjw0MWNk" target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-4 inline-flex items-center gap-2">
                            <Headphones size={18} /> Audio Teachings
                        </a>
                        <Link to="/video-teachings" className="btn-primary px-8 py-4 inline-flex items-center gap-2">
                            <PlayCircle size={18} /> Video Teachings
                        </Link>
                        <a href="/resources" className="btn-outline px-8 py-4 inline-flex items-center gap-2">
                            Explore Resources
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
