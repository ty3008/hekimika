import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, BookOpen, Users, Heart, Star, PlayCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import ProgramCard from '../components/ProgramCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { PROGRAMS } from '../utils/constants';

// Featured Books Assets
import PassionImg from '../assets/book- passion.jpeg';
import ChoosingWellImg from '../assets/book- choosing well.jpeg';
import SolidFormImg from '../assets/book- creating a solid form.jpeg';
import DealingWithEndedImg from '../assets/book- dealing with ended relationships.jpeg';
import PrayingSolidManImg from '../assets/book- praying for a solid man.jpeg';

const FEATURED_BOOKS = [
    {
        title: 'Passion',
        image: PassionImg,
        desc: 'Navigating passion, love, and intimacy the biblical way.',
        link: 'https://selar.co/passion'
    },
    {
        title: 'Choosing Well',
        image: ChoosingWellImg,
        desc: 'Discerning the right partner for a God-centered covenant.',
        link: 'https://selar.co/choosing-well'
    },
    {
        title: 'Creating a Solid Form',
        image: SolidFormImg,
        desc: 'The foundational principles of the Cultured in Love series.',
        link: 'https://selar.co/solid-form'
    },
    {
        title: 'Pray for a Solid Man',
        image: PrayingSolidManImg,
        desc: 'A prayer guide for those seeking a God-fearing partner.',
        link: 'https://selar.co/praying-solid-man'
    }
];

const CAROUSEL_IMAGES = [
    '/assets/home-carousel/carousel 1.jpg',
    '/assets/home-carousel/carousel 2.jpg',
    '/assets/home-carousel/carousel 3.jpg',
    '/assets/home-carousel/carousel 4.jpeg',
    '/assets/home-carousel/carousel 5.jpeg',
];

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

const TEACHING_CHANNELS = [
    {
        title: 'YouTube Channel',
        desc: 'Watch powerful video teachings and live sessions by Pastor Kevin Mulati.',
        icon: PlayCircle,
        link: 'https://www.youtube.com/@Hekimika001',
        action: 'Watch Now',
        color: '#FF0000'
    },
    {
        title: 'Telegram Channel',
        desc: 'Join our digital sanctuary for daily teachings, devotionals, and community updates.',
        icon: Users,
        link: 'https://t.me/+YLkY8tmLLjw0MWNk',
        action: 'Join Channel',
        color: '#0088cc'
    }
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

import HeroBgImg from '../assets/Pst Kevin and Lilian.jpg';
const HERO_BG = HeroBgImg;

export default function Home() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isHovered]);

    const handleDragEnd = (_e: any, { offset }: any) => {
        const swipe = offset.x;
        if (swipe < -80) {
            setCurrentImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
        } else if (swipe > 80) {
            setCurrentImage((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
        }
    };

    const featured = PROGRAMS.filter((p) => p.is_open_for_intake !== false).slice(0, 4);

    return (
        <>
            <Helmet>
                <title>Hekimika – Wise Nation | Raising the Generation of the Wise</title>
                <meta name="description" content="Join Hekimika – a global ministry equipping singles, couples, and leaders with wisdom, healing, and purpose. Programs by Pastor Kevin & Lilian Mulati." />
            </Helmet>

            {/* ── Hero ── */}
            <section 
                ref={heroRef} 
                className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div 
                    className="absolute inset-0" 
                    style={{ y }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                >
                    <AnimatePresence initial={false}>
                        <motion.img
                            key={currentImage}
                            src={CAROUSEL_IMAGES[currentImage]}
                            alt="Hero Carousel"
                            className="absolute w-full h-full object-cover"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,31,63,0.7) 0%, rgba(0,31,63,0.85) 100%)' }} />
                </motion.div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pointer-events-none">
                    <motion.h1
                        {...fadeUp}
                        animate={fadeUp.animate}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        Raising the Generation<br />
                        <span style={{ color: 'var(--gold)' }}>of the Wise</span><br />
                        all over the World.
                    </motion.h1>
                    <motion.p
                        {...fadeUp}
                        animate={fadeUp.animate}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-sm font-semibold tracking-widest mb-4"
                        style={{ color: 'var(--gold)' }}
                    >
                        Hekimika is a Swahili word meaning ‘Be Wise’.
                    </motion.p>
                    <motion.p
                        {...fadeUp}
                        animate={fadeUp.animate}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
                    >
                        A platform for wisdom for life, wholesome growth, and a life of dominion.
                    </motion.p>
                    <motion.div
                        {...fadeUp}
                        animate={fadeUp.animate}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap gap-4 justify-center pointer-events-auto"
                    >
                        <Link to="/about" className="btn-primary px-8 py-4 text-base flex items-center gap-2">
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
                        title="Here is Sound Wisdom for You"
                        subtitle="Our curriculum is designed to bring real, lasting change — grounded in Scripture and delivered with excellence."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {featured.map((p, i) => (
                            <ProgramCard key={p.slug} {...p} isOpenForIntake={true} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Featured Books ── */}
            <section className="section-pad bg-white">
                <div className="container-xl">
                    <SectionTitle
                        overline="Featured Books"
                        title="Wisdom for Your Library"
                        subtitle="Powerful resources to build wisdom, purity, and strong relationships — authored by Pastor Kevin Mulati."
                    />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {FEATURED_BOOKS.map((book, i) => (
                            <motion.div 
                                key={book.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="card group flex flex-col"
                            >
                                <div className="relative aspect-square overflow-hidden rounded-xl bg-white flex items-center justify-center p-0">
                                    <img 
                                        src={book.image} 
                                        alt={book.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-navy/5 group-hover:opacity-0 transition-opacity" />
                                    <div className="absolute top-4 right-4 bg-gold text-navy text-[10px] font-bold px-2.5 py-1 rounded shadow-lg z-10">
                                        BOOK
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1 p-6">
                                    <h3 className="text-lg font-bold text-navy mb-2 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                                        {book.desc}
                                    </p>
                                    <div className="mt-auto">
                                        <a 
                                            href={book.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2"
                                        >
                                            Get Softcopy <ArrowRight size={14} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <Link to="/resources" className="inline-flex items-center gap-3 text-navy font-bold hover:text-gold transition-all group">
                            Explore All Books <div className="w-10 h-px bg-gold group-hover:w-16 transition-all" /> <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Teachings Highlight ── */}
            <section className="section-pad bg-gray-50">
                <div className="container-xl">
                    <SectionTitle
                        overline="Live Wisdom"
                        title="Teachings"
                        subtitle="Receive sound wisdom daily through audio and video teachings from the Wise Nation."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {TEACHING_CHANNELS.map((ch, i) => (
                            <motion.div
                                key={ch.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
                            >
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-6" style={{ background: `${ch.color}10` }}>
                                    <ch.icon size={32} style={{ color: ch.color }} />
                                </div>
                                <h3 className="text-2xl font-bold text-navy mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>{ch.title}</h3>
                                <p className="text-gray-500 mb-8 leading-relaxed">{ch.desc}</p>
                                <a 
                                    href={ch.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                                >
                                    {ch.action} <ArrowRight size={18} />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Link to="/resources#teachings" className="text-navy font-bold hover:text-gold transition-colors flex items-center justify-center gap-2">
                            Explore All Teachings <ArrowRight size={16} />
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

            {/* Bottom Tagline */}
            <div className="py-16 text-center bg-gray-50">
                <p className="text-gold font-bold tracking-[0.4em] text-xs opacity-50">SIGNIFICANCE | RELEVANCE | DOMINION</p>
            </div>
        </>
    );
}
