import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Users, Heart, Star, PlayCircle } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import SectionTitle from '../components/SectionTitle';
import ProgramCard from '../components/ProgramCard';
import { PROGRAMS } from '../utils/constants';
import { useApi } from '../hooks/useApi';
import Lightbox from '../components/Lightbox';
import VideoModal from '../components/VideoModal';
import { WebSiteSchema, OrganizationSchema, BreadcrumbSchema } from '../components/SchemaMarkup';

// Featured Books Assets
import PassionImg from '../assets/book- passion.webp';
import ChoosingWellImg from '../assets/book- choosing well.webp';
import SolidFormImg from '../assets/book- creating a solid form.webp';
import DealingWithEndedImg from '../assets/book- dealing with ended relationships.webp';
import TestimonialCarousel from '../components/TestimonialCarousel';
import HeroBgImg from '../assets/The Mulatis.webp';
const HERO_BG = HeroBgImg;

const ARMS = [
    {
        icon: Star,
        title: 'Perfected in Wisdom',
        description: 'This is the transformative mentorship and building arm of Hekimika that focuses on imparting Wisdom in specific areas.',
        to: '/perfected-in-wisdom',
        color: '#D4AF37',
    },
    {
        icon: Heart,
        title: 'Wisdom Moments',
        description: 'This is the platform for impartation of the Wisdom of God through organized meetings, forums, teachings, blogs, devotionals, etc.',
        to: '/wisdom-moments',
        color: '#E8CC6A',
    },
    {
        icon: Users,
        title: 'Young and Wise',
        description: 'A youth-focused arm dedicated to mentoring teenagers through magazines, interactive sessions, mentorship, and YouTube content.',
        to: '/young-and-wise',
        color: '#D4AF37',
    },
];

const FEATURED_BOOKS = [
    {
        title: 'Passion',
        image: PassionImg,
        desc: 'Passion is a beautiful thing which God has given every person.',
        link: 'https://selar.com/7hb2n47455'
    },
    {
        title: 'Choosing Well',
        image: ChoosingWellImg,
        desc: 'Building healthy relationships through wise, godly choices.',
        link: 'https://selar.com/7770f17ty0'
    },
    {
        title: 'Creating a Solid Form',
        image: SolidFormImg,
        desc: 'Your internal reality influences your experiences in love and life.',
        link: 'https://selar.com/66d7414624'
    },
    {
        title: 'Dealing with Ended Relationships',
        image: DealingWithEndedImg,
        desc: 'A practical guide to healing and growth after a relationship ends.',
        link: 'https://selar.com/477717r206'
    }
];

const CAROUSEL_IMAGES = [
    '/assets/home-carousel/carousel 1.webp',
    '/assets/home-carousel/carousel 2.webp',
    '/assets/home-carousel/carousel 3.webp',
    '/assets/home-carousel/carousel 4.webp',
    '/assets/home-carousel/carousel 5.webp',
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
    { value: '1000+', label: 'Lives Transformed' },
    { value: '11+', label: 'Programs' }
];

const getDriveThumbnail = (url: string) => {
    if (!url) return '';
    if (url.includes('/file/d/')) {
        const parts = url.split('/file/d/');
        if (parts[1]) {
            const fileId = parts[1].split('/')[0];
            return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
        }
    }
    if (url.includes('?id=') || url.includes('&id=')) {
        const match = url.match(/[?&]id=([^&]+)/);
        if (match && match[1]) {
            return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
        }
    }
    return url;
};


export default function Home() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    const VIDEO_ID = 'TLqisyaTUvU';

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

    // Program Highlights
    const { data: highlights } = useApi<{ id: number; title: string; photoUrl: string; youtubeUrl: string }[]>('/highlights', [], { pollInterval: 30000 });
    const { data: latestBlogs } = useApi<any[]>('/blog', [], { pollInterval: 30000 });
    const featuredBlogs = latestBlogs?.slice(0, 3) || [];
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const lightboxItems = highlights?.map(h => ({
        src: getDriveThumbnail(h.photoUrl) || h.photoUrl,
        alt: h.title,
        youtubeUrl: h.youtubeUrl
    })) || [];

    return (
        <>
            <Helmet>
                <title>Hekimika – Wise Nation | Biblical Wisdom on Relationships, Masculinity & Leadership</title>
                <meta name="description" content="Hekimika (Wise Nation) is a global ministry equipping singles, couples, and leaders with biblical wisdom on relationships, godly masculinity, Christian leadership, purity, and purpose. Programs, books, and teachings by Pastor Kevin & Lilian Mulati." />
                <link rel="canonical" href="https://hekimika.org/" />
            </Helmet>
            <WebSiteSchema />
            <OrganizationSchema />
            <BreadcrumbSchema items={[{ name: 'Home', url: '/' }]} />

            {/* ── Hero ── */}
            <section
                ref={heroRef}
                className="relative h-screen min-h-[640px] max-h-[900px] flex items-center justify-center overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* ── Background image layer with Ken Burns ── */}
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
                            alt={`Hekimika ministry moment ${currentImage + 1} of ${CAROUSEL_IMAGES.length}`}
                            className="absolute inset-0 w-full h-full object-cover"
                            initial={{ opacity: 0, scale: 1.08 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.8, ease: 'easeOut' }}
                        />
                    </AnimatePresence>

                    {/* ── Cinematic multi-stop gradient overlay ── */}
                    <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                            background: `
                                linear-gradient(
                                    to bottom,
                                    rgba(0,20,50,0.72) 0%,
                                    rgba(0,20,50,0.38) 35%,
                                    rgba(0,20,50,0.30) 55%,
                                    rgba(0,20,50,0.65) 100%
                                )
                            `
                        }}
                    />

                    {/* ── Radial vignette — darkens edges, bright centre ── */}
                    <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,10,30,0.55) 100%)'
                        }}
                    />
                </motion.div>

                {/* ── Hero Content ── */}
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pointer-events-none select-none">

                    {/* Overline badge */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-xs font-bold uppercase tracking-[0.3em] mb-5 inline-flex items-center gap-2"
                        style={{ color: 'var(--gold)' }}
                    >
                        <span className="w-6 h-px" style={{ background: 'var(--gold)' }} />
                        Hekimika · Wise Nation
                        <span className="w-6 h-px" style={{ background: 'var(--gold)' }} />
                    </motion.p>

                    {/* ── Headline with typewriter ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h1
                            className="font-bold text-white leading-tight mb-6"
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: 'clamp(2rem, 6vw, 4rem)',
                                textShadow: '0 2px 24px rgba(0,10,30,0.55), 0 1px 4px rgba(0,0,0,0.4)',
                            }}
                        >
                            {/* Static first line */}
                            <span className="block">Raising the generation</span>

                            {/* Gold typed middle line */}
                            <span
                                className="block"
                                style={{ color: 'var(--gold)', textShadow: '0 0 40px rgba(212,175,55,0.35)' }}
                            >
                                <TypeAnimation
                                    sequence={[
                                        600,
                                        'of the Wise',
                                        1200,
                                    ]}
                                    wrapper="span"
                                    speed={55}
                                    cursor={false}
                                    repeat={0}
                                />
                            </span>

                            {/* Typed last line with blinking cursor */}
                            <TypeAnimation
                                sequence={[
                                    1800,               // wait for gold line to finish
                                    'all over the World.',
                                    3000,               // pause with cursor
                                ]}
                                wrapper="span"
                                speed={60}
                                className="block"
                                style={{ display: 'block' }}
                                cursor={true}
                                repeat={0}
                            />
                        </h1>
                    </motion.div>

                    {/* Swahili subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 3.2 }}
                        className="text-sm font-semibold tracking-widest italic mb-3"
                        style={{ color: 'var(--gold)', textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
                    >
                        Hekimika is a Swahili word meaning 'Be Wise'.
                    </motion.p>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 3.5 }}
                        className="text-base md:text-lg text-white/75 mb-10 max-w-xl mx-auto leading-relaxed"
                        style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
                    >
                        A platform for wisdom for life, wholesome growth, and a life of dominion.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 3.8 }}
                        className="flex flex-wrap gap-4 justify-center pointer-events-auto"
                    >
                        <Link to="/about" className="btn-primary px-8 py-4 text-sm font-bold flex items-center gap-2">
                            <ArrowRight size={17} /> About Us
                        </Link>
                        <Link
                            to="/blog"
                            className="btn-outline px-8 py-4 text-sm font-bold flex items-center gap-2"
                            style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff', background: 'rgba(255,255,255,0.07)' }}
                        >
                            Read our Blog <ArrowRight size={17} />
                        </Link>
                    </motion.div>
                </div>

                {/* ── Carousel dot indicators ── */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                    {CAROUSEL_IMAGES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentImage(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className="relative overflow-hidden rounded-full transition-all duration-300 pointer-events-auto"
                            style={{
                                width: i === currentImage ? 28 : 8,
                                height: 8,
                                background: i === currentImage ? 'var(--gold)' : 'rgba(255,255,255,0.35)',
                            }}
                        >
                            {i === currentImage && !isHovered && (
                                <motion.span
                                    className="absolute inset-0 rounded-full origin-left"
                                    style={{ background: 'rgba(255,255,255,0.4)' }}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 5, ease: 'linear' }}
                                    key={currentImage}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* ── Scroll indicator ── */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20"
                >
                    <div className="w-px h-8 bg-white/30" />
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">Scroll</p>
                </motion.div>
            </section>

            {/* ── Watch Our Story ── */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{ background: 'var(--navy)' }}
                className="py-16 sm:py-20 md:py-24 px-4"
            >
                <div className="container-xl">
                    {/* Section heading */}
                    <div className="text-center mb-10 md:mb-14">
                        <p
                            className="text-xs font-semibold uppercase tracking-[0.35em] mb-3 opacity-60"
                            style={{ color: 'var(--gold)' }}
                        >
                            Our Vision
                        </p>
                        <h2
                            className="text-3xl sm:text-4xl md:text-5xl font-bold"
                            style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--gold)' }}
                        >
                            Watch Our Story
                        </h2>
                        <div
                            className="mx-auto mt-4 h-px w-16 opacity-40"
                            style={{ background: 'var(--gold)' }}
                        />
                    </div>

                    {/* Cinematic video container */}
                    <motion.div
                        className="group relative mx-auto max-w-5xl w-full aspect-video rounded-3xl overflow-hidden cursor-pointer"
                        style={{
                            border: '1px solid rgba(212,175,55,0.35)',
                            boxShadow: '0 0 60px rgba(212,175,55,0.18), 0 20px 60px rgba(0,0,0,0.5)',
                        }}
                        whileHover={{
                            boxShadow: '0 0 100px rgba(212,175,55,0.4), 0 0 40px rgba(212,175,55,0.2), 0 25px 70px rgba(0,0,0,0.6)',
                            borderColor: 'rgba(212,175,55,0.8)',
                            scale: 1.005,
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsVideoModalOpen(true)}
                        role="button"
                        tabIndex={0}
                        aria-label="Watch Our Story — click to play video"
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsVideoModalOpen(true)}
                    >
                        {/* Static thumbnail fallback (shown if iframe autoplay is blocked by browser) */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{
                                backgroundImage: `url(https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg)`,
                            }}
                        />

                        {/* Muted autoplay iframe overlay */}
                        <iframe
                            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${VIDEO_ID}&playsinline=1&rel=0&modestbranding=1&disablekb=1`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                            title="Hekimika introductory video (muted preview)"
                        />

                        {/* Dark cinematic overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/70 group-hover:via-black/30" />

                        {/* Gold triangular Play button */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <motion.div
                                animate={{ scale: [1, 1.06, 1] }}
                                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                                className="relative flex items-center justify-center"
                            >
                                {/* Outer glow ring */}
                                <div
                                    className="absolute rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                                    style={{
                                        width: '120px',
                                        height: '120px',
                                        background: 'radial-gradient(circle, rgba(212,175,55,0.6) 0%, transparent 70%)',
                                    }}
                                />
                                {/* Button container */}
                                <div
                                    className="relative flex items-center justify-center rounded-full transition-all duration-300"
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        background: 'rgba(212,175,55,0.15)',
                                        backdropFilter: 'blur(8px)',
                                        border: '2px solid rgba(212,175,55,0.8)',
                                        boxShadow: '0 0 30px rgba(212,175,55,0.5)',
                                    }}
                                >
                                    {/* Triangular play SVG icon */}
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="ml-1"
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            fill: 'var(--gold)',
                                            filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.8))',
                                        }}
                                        aria-hidden="true"
                                    >
                                        <polygon points="5,3 19,12 5,21" />
                                    </svg>
                                </div>
                            </motion.div>
                        </div>

                    </motion.div>
                </div>
            </motion.section>

            {/* Video Modal */}
            <VideoModal
                isOpen={isVideoModalOpen}
                onClose={() => setIsVideoModalOpen(false)}
                videoId={VIDEO_ID}
                title="Watch Our Story"
            />

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

            {/* ── Program Highlights ── */}
            {highlights && highlights.length > 0 && (
                <section className="section-pad" style={{ background: 'var(--navy)' }}>
                    <div className="container-xl">
                        <SectionTitle
                            overline="Moments of Impact"
                            title="Program Highlights"
                            subtitle="Watch powerful highlights from our transformative programs — real moments of wisdom, healing, and community."
                            light
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-10">
                            {highlights.map((h, i) => (
                                <motion.div
                                    key={h.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="group cursor-pointer"
                                    onClick={() => setLightboxIndex(i)}
                                >
                                    <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-navy/60">
                                        <img
                                            src={getDriveThumbnail(h.photoUrl) || h.photoUrl}
                                            alt={h.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.opacity = '0';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform border border-white/30">
                                                <PlayCircle size={36} className="text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-white text-sm md:text-base font-semibold mt-5 px-4 text-center group-hover:text-gold transition-colors leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        {h.title}
                                    </h3>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Lightbox for Program Highlights */}
            {lightboxIndex !== null && (
                <Lightbox
                    images={lightboxItems}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}


            {/* ── Find Your Path ── */}
            <section className="section-pad bg-white">
                <div className="container-xl">
                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-14"
                    >
                        <p
                            className="text-xs font-bold uppercase tracking-[0.35em] mb-3 opacity-60"
                            style={{ color: 'var(--navy)' }}
                        >
                            Find Your Path
                        </p>
                        <h2
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-5"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Where Are You Right Now?
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
                            Whatever season you are in, Hekimika was built for you.
                            Click your situation and let us walk with you.
                        </p>
                        <div className="mx-auto mt-5 h-px w-16 bg-gold opacity-50" />
                    </motion.div>

                    {/* 2×2 Card Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                        {/* Card 1 — Singles */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.0 }}
                            className="group relative rounded-3xl overflow-hidden cursor-pointer"
                            style={{ minHeight: '340px' }}
                        >
                            {/* Background: carousel image 2 */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: "url('/assets/home-carousel/carousel 2.webp')" }}
                            />
                            {/* Multi-stop cinematic overlay */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: 'linear-gradient(to bottom, rgba(0,20,50,0.45) 0%, rgba(0,20,50,0.6) 50%, rgba(0,20,50,0.88) 100%)',
                                }}
                            />
                            {/* Gold top accent line */}
                            <div
                                className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                                style={{ background: 'var(--gold)' }}
                            />
                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-end p-8">
                                {/* Tag */}
                                <span
                                    className="self-start mb-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                                    style={{ background: 'rgba(212,175,55,0.2)', color: 'var(--gold)', border: '1px solid rgba(212,175,55,0.4)' }}
                                >
                                    For Singles
                                </span>
                                {/* Headline */}
                                <h3
                                    className="text-white font-bold text-xl md:text-2xl leading-snug mb-3 group-hover:text-gold transition-colors duration-300"
                                    style={{ fontFamily: 'Poppins, sans-serif', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
                                >
                                    I'm single and want wisdom on love, relationships & dating
                                </h3>
                                {/* Sub-copy */}
                                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                                    You are not behind. You are being built.
                                </p>
                                {/* CTA */}
                                <Link
                                    to="/wisdom-for-singles"
                                    className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-navy transition-all duration-300 group-hover:shadow-lg"
                                    style={{ background: 'var(--gold)' }}
                                >
                                    We Got You <ArrowRight size={15} />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Card 2 — Purity */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="group relative rounded-3xl overflow-hidden cursor-pointer"
                            style={{ minHeight: '340px' }}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: "url('/assets/home-carousel/carousel 3.webp')" }}
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: 'linear-gradient(to bottom, rgba(0,20,50,0.45) 0%, rgba(0,20,50,0.6) 50%, rgba(0,20,50,0.88) 100%)',
                                }}
                            />
                            <div
                                className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                                style={{ background: 'var(--gold)' }}
                            />
                            <div className="relative z-10 h-full flex flex-col justify-end p-8">
                                <span
                                    className="self-start mb-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                                    style={{ background: 'rgba(212,175,55,0.2)', color: 'var(--gold)', border: '1px solid rgba(212,175,55,0.4)' }}
                                >
                                    For Young People
                                </span>
                                <h3
                                    className="text-white font-bold text-xl md:text-2xl leading-snug mb-3 group-hover:text-gold transition-colors duration-300"
                                    style={{ fontFamily: 'Poppins, sans-serif', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
                                >
                                    Is it really possible to live purely as a young person?
                                </h3>
                                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                                    Purity is not outdated. It is powerful.
                                </p>
                                <Link
                                    to="/purity-wisdom"
                                    className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-navy transition-all duration-300 group-hover:shadow-lg"
                                    style={{ background: 'var(--gold)' }}
                                >
                                    Wisdom for This <ArrowRight size={15} />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Card 3 — Coaching */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="group relative rounded-3xl overflow-hidden cursor-pointer"
                            style={{ minHeight: '340px' }}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: "url('/assets/home-carousel/carousel 4.webp')" }}
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: 'linear-gradient(to bottom, rgba(0,20,50,0.45) 0%, rgba(0,20,50,0.6) 50%, rgba(0,20,50,0.88) 100%)',
                                }}
                            />
                            <div
                                className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                                style={{ background: 'var(--gold)' }}
                            />
                            <div className="relative z-10 h-full flex flex-col justify-end p-8">
                                <span
                                    className="self-start mb-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                                    style={{ background: 'rgba(212,175,55,0.2)', color: 'var(--gold)', border: '1px solid rgba(212,175,55,0.4)' }}
                                >
                                    Personal Coaching
                                </span>
                                <h3
                                    className="text-white font-bold text-xl md:text-2xl leading-snug mb-3 group-hover:text-gold transition-colors duration-300"
                                    style={{ fontFamily: 'Poppins, sans-serif', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
                                >
                                    I have many questions — I think I need personal coaching
                                </h3>
                                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                                    You don't have to figure this out alone.
                                </p>
                                <Link
                                    to="/contact?reason=coaching"
                                    className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-navy transition-all duration-300 group-hover:shadow-lg"
                                    style={{ background: 'var(--gold)' }}
                                >
                                    Get In Touch <ArrowRight size={15} />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Card 4 — Couples */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="group relative rounded-3xl overflow-hidden cursor-pointer"
                            style={{ minHeight: '340px' }}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: "url('/assets/home-carousel/carousel 5.webp')" }}
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: 'linear-gradient(to bottom, rgba(0,20,50,0.45) 0%, rgba(0,20,50,0.6) 50%, rgba(0,20,50,0.88) 100%)',
                                }}
                            />
                            <div
                                className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                                style={{ background: 'var(--gold)' }}
                            />
                            <div className="relative z-10 h-full flex flex-col justify-end p-8">
                                <span
                                    className="self-start mb-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                                    style={{ background: 'rgba(212,175,55,0.2)', color: 'var(--gold)', border: '1px solid rgba(212,175,55,0.4)' }}
                                >
                                    For Couples
                                </span>
                                <h3
                                    className="text-white font-bold text-xl md:text-2xl leading-snug mb-3 group-hover:text-gold transition-colors duration-300"
                                    style={{ fontFamily: 'Poppins, sans-serif', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
                                >
                                    We want our relationship to truly go the distance
                                </h3>
                                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                                    A great relationship is built, not found.
                                </p>
                                <Link
                                    to="/contact?reason=couples"
                                    className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-navy transition-all duration-300 group-hover:shadow-lg"
                                    style={{ background: 'var(--gold)' }}
                                >
                                    Let's Talk <ArrowRight size={15} />
                                </Link>
                            </div>
                        </motion.div>
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
                                        loading="lazy"
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

            {/* ── Blogs Highlight ── */}
            <section className="section-pad" style={{ background: 'var(--navy)' }}>
                <div className="container-xl">
                    <SectionTitle
                        overline="Live Wisdom"
                        title="Wisdom from our Blogs"
                        subtitle="Insights, stories, and teachings from the Wise Nation — written wisdom on love, grace, prayer, marriage, and more."
                        light
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-10">
                        {featuredBlogs.length > 0
                            ? featuredBlogs.map((blog: any, i: number) => (
                                <motion.div
                                    key={blog.slug}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="rounded-3xl overflow-hidden shadow-sm border border-white/10 hover:border-gold/50 transition-all group flex flex-col"
                                    style={{ background: 'rgba(255,255,255,0.04)' }}
                                >
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={blog.cover_image || '/assets/home-carousel/carousel 1.webp'}
                                            alt={blog.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-3 left-3 bg-gold text-navy text-[10px] font-bold px-2.5 py-1 rounded shadow-lg">
                                            {blog.category}
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-1">
                                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-gold transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            {blog.title}
                                        </h3>
                                        <p className="text-white/60 mb-6 leading-relaxed line-clamp-3 flex-1">{blog.excerpt}</p>
                                        <Link
                                            to={`/blog/${blog.slug}`}
                                            className="text-gold font-bold hover:text-white transition-colors flex items-center gap-2 text-sm mt-auto"
                                        >
                                            Read More <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))
                            : /* Skeleton while loading / cold start */
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="rounded-3xl overflow-hidden border border-white/10 flex flex-col animate-pulse"
                                    style={{ background: 'rgba(255,255,255,0.04)' }}>
                                    <div className="aspect-video bg-white/10" />
                                    <div className="p-8 flex flex-col gap-3">
                                        <div className="h-4 bg-white/10 rounded w-3/4" />
                                        <div className="h-4 bg-white/10 rounded w-full" />
                                        <div className="h-4 bg-white/10 rounded w-2/3" />
                                        <div className="h-3 bg-white/10 rounded w-1/4 mt-4" />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="mt-12 text-center">
                        <Link to="/blog" className="inline-flex items-center gap-3 text-white font-bold hover:text-gold transition-all group">
                            Explore All Blogs <div className="w-10 h-px bg-gold group-hover:w-16 transition-all" /> <ArrowRight size={20} />
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
                                className="p-8 rounded-2xl border border-white/10 hover:border-gold transition-colors group"
                                style={{ background: 'rgba(255,255,255,0.04)' }}
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
                            className="relative group"
                        >
                            <div className="relative aspect-[4/5] md:aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-2xl border border-gray-100">
                                <img
                                    src={HERO_BG}
                                    alt="Pastor Kevin and Lilian Mulati"
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-navy/10 group-hover:opacity-0 transition-opacity pointer-events-none" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-5 shadow-xl z-20">
                                <p className="text-2xl font-bold" style={{ color: 'var(--navy)', fontFamily: 'Poppins, sans-serif' }}>10 years+</p>
                                <p className="text-gray-500 text-sm">impact</p>
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
