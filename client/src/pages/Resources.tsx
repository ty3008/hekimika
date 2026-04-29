import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, PlayCircle, Users } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { useApi } from '../hooks/useApi';
import { Link } from 'react-router-dom';

// Book Assets
import ThePureManImg from '../assets/The pure man.jpg';
import WorkItOutImg from '../assets/work it out.jpg';
import ChoosingWellImg from '../assets/book- choosing well.jpeg';
import DealingWithEndedImg from '../assets/book- dealing with ended relationships.jpeg';
import PreparingForLoveImg from '../assets/preparing for love.png';
import KeepersImg from '../assets/Keepers.png';
import CoupledAndBuiltImg from '../assets/Coupled and Built.png';
import BuiltToLeadImg from '../assets/Built to Lead.png';

// Cultured In Love Assets
import SolidCoreImg from '../assets/establishing a solid core.jpg';
import SolidFormImg from '../assets/book- creating a solid form.jpeg';
import PassionImg from '../assets/book- passion.jpeg';
import PrayingSolidManImg from '../assets/book- praying for a solid man.jpeg';

import Phos9Img from '../assets/the phos edition 9.png';
import IdentityImg from '../assets/Identity.png';
import Phos2Img from '../assets/the phos edition 2.jpg';
import Phos5Img from '../assets/the phos edition 5.jpg';

// Assets mapping based on dist/assets structure
const ASSET_PATH = '/assets/';

const BOOKS = [
    {
        title: 'The Pure Man',
        author: 'Pastor Kevin Mulati',
        image: ThePureManImg,
        price: 'KSh 1,500',
        selarUrl: 'https://selar.co/pure-man',
        desc: 'A comprehensive guide for men on holiness, identity, and strength.'
    },
    {
        title: 'Work it Out',
        author: 'Pastor Kevin Mulati',
        image: WorkItOutImg,
        price: 'KSh 800',
        selarUrl: 'https://selar.co/work-it-out',
        desc: 'Practical wisdom for navigating the daily realities of love.'
    },
    {
        title: 'Choosing Well',
        author: 'Pastor Kevin Mulati',
        image: ChoosingWellImg,
        price: 'KSh 1,500',
        selarUrl: 'https://selar.co/choosing-well',
        desc: 'Discerning the right partner for a God-centered covenant.'
    },
    {
        title: 'Dealing with Ended Relationships',
        author: 'Pastor Kevin Mulati',
        image: DealingWithEndedImg,
        price: 'KSh 500',
        selarUrl: 'https://selar.co/healing-heartbreak',
        desc: 'Finding healing and wholeness after the pain of a breakup.'
    },
    {
        title: 'Preparing for Love',
        author: 'Pastor Kevin Mulati',
        image: PreparingForLoveImg,
        price: 'KSh 1,500',
        selarUrl: 'https://selar.co/preparing-love',
        desc: 'Tools and insights to get ready for a lasting covenant.'
    },
    {
        title: 'Keepers of Love',
        author: 'Pastor Kevin Mulati',
        image: KeepersImg,
        price: 'KSh 1,500',
        selarUrl: 'https://selar.co/keepers',
        desc: 'Understanding what it takes to sustain lifelong love.'
    },
    {
        title: 'Coupled and Built',
        author: 'Pastor Kevin Mulati',
        image: CoupledAndBuiltImg,
        price: 'KSh 1,500',
        selarUrl: 'https://selar.co/coupled-built',
        desc: 'Foundation and architecture for a successful godly marriage.'
    },
    {
        title: 'Built to Lead',
        author: 'Pastor Kevin Mulati',
        image: BuiltToLeadImg,
        price: 'KSh 1,500',
        selarUrl: 'https://selar.co/built-to-lead',
        desc: 'Leadership principles for the generation of the wise.'
    },
];

const CULTURED_IN_LOVE_BOOKS = [
    {
        title: 'Establishing a Solid Core',
        author: 'Pastor Kevin Mulati',
        image: SolidCoreImg,
        price: 'KSh 2,000',
        selarUrl: 'https://selar.co/solid-core',
        desc: 'Building the non-negotiables of relationships and marriage.'
    },
    {
        title: 'Creating a Solid Form',
        author: 'Pastor Kevin Mulati',
        image: SolidFormImg,
        price: 'KSh 2,000',
        selarUrl: 'https://selar.co/solid-form',
        desc: 'The foundational principles of the Cultured in Love series.'
    },
    {
        title: 'Passion',
        author: 'Pastor Kevin Mulati',
        image: PassionImg,
        price: 'KSh 2,000',
        selarUrl: 'https://selar.co/passion',
        desc: 'Navigating passion, love, and intimacy the biblical way.'
    },
    {
        title: 'Conflict Resolution',
        author: 'Pastor Kevin Mulati',
        image: WorkItOutImg,
        price: 'KSh 2,000',
        selarUrl: 'https://selar.co/conflict-resolution',
        desc: 'Resolving disputes gracefully in your marriage or relationship.'
    },
    {
        title: 'Praying for a Solid Man',
        author: 'Pastor Kevin Mulati',
        image: PrayingSolidManImg,
        price: 'KSh 2,000',
        selarUrl: 'https://selar.co/praying-solid-man',
        desc: 'A prayer guide for those seeking a God-fearing partner.'
    },
];

const STATIC_DEVOTIONALS = [
    { id: '1', title: 'Identity', desc: 'Understanding who you are in Christ.', image: IdentityImg },
    { id: '2', title: 'The Phos Edition 2', desc: 'Light for your path.', image: Phos2Img },
    { id: '3', title: 'The Phos Edition 5', desc: 'Wisdom to build.', image: Phos5Img },
    { id: '4', title: 'The Phos Edition 9', desc: 'Strength for the journey.', image: Phos9Img },
];

export default function Resources() {
    const { data: freeResources, loading } = useApi<any[]>('/free-resources');

    const devotionalsApi = freeResources?.filter(r => r.type === 'Devotional') || [];

    // Combine static and API for full list as requested
    const devotionals = devotionalsApi.length > 0 ? devotionalsApi : STATIC_DEVOTIONALS;

    const sectionFade = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <>
            <Helmet>
                <title>Resources & Store | Hekimika</title>
                <meta name="description" content="Explore Hekimika books, magazines, and devotionals by Pastor Kevin & Lilian Mulati." />
            </Helmet>

            <section className="pt-36 pb-20 px-4 md:px-8 lg:px-16" style={{ background: 'var(--navy)' }}>
                <div className="container-xl text-center">
                    <SectionTitle
                        overline="Wisdom Library"
                        title="Resources to Feed Your Spirit"
                        subtitle="From deep-dive books to bite-sized devotionals, find the wisdom you need for every season."
                        light
                    />
                </div>
            </section>

            {/* Section 1: Books */}
            <section className="section-pad bg-white">
                <div className="container-xl">
                    <SectionTitle
                        overline="Official Publications"
                        title="Books"
                        subtitle="Authored by Pastor Kevin Mulati, these books offer practical blueprints for godly living."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {BOOKS.map((book, i) => (
                            <motion.div key={i} {...sectionFade} transition={{ delay: i * 0.1 }} className="group">
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-lg border border-gray-100 relative bg-gray-50 flex items-center justify-center p-4">
                                    <img src={book.image} alt={book.title} className="w-full h-full object-contain overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                                        <p className="text-white text-sm font-medium leading-relaxed line-clamp-4">{book.desc}</p>
                                    </div>
                                    <div className="absolute top-3 right-3 bg-gold text-navy text-[10px] font-bold px-2 py-1 rounded">
                                        BOOK
                                    </div>
                                </div>
                                <h3 className="font-bold text-navy text-lg mb-1 leading-tight group-hover:text-gold transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>{book.title}</h3>
                                <p className="text-gray-400 text-xs mb-3">{book.author}</p>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 gap-2">
                                    <span className="font-bold text-navy" style={{ color: 'var(--navy)' }}>{book.price}</span>
                                    <div className="flex flex-col gap-2 items-end">
                                        <a href={book.selarUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-gold hover:underline">
                                            Buy Softcopy <ExternalLink size={12} />
                                        </a>
                                        <a href={(book as any).amazonUrl || "https://www.amazon.com/dp/ASIN123"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] font-bold text-gold hover:underline">
                                            Buy Hardcopy on Amazon <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 2: Cultured in Love */}
            <section className="section-pad bg-gray-50">
                <div className="container-xl">
                    <SectionTitle
                        overline="Series Collections"
                        title="Cultured in Love"
                        subtitle="Deep dive into the wisdom of love and relationships. These specialized volumes are part of our flagship series."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {CULTURED_IN_LOVE_BOOKS.map((book, i) => (
                            <motion.div key={i} {...sectionFade} transition={{ delay: i * 0.1 }} className="flex flex-col">
                                <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-2xl border-4 border-white group relative bg-white flex items-center justify-center p-4">
                                    <img src={book.image} alt={book.title} className="w-full h-full object-contain overflow-hidden transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent flex flex-col justify-end p-6 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white/80 text-xs italic mb-1 line-clamp-2">{book.desc}</p>
                                        <a href={book.selarUrl} target="_blank" rel="noopener noreferrer" className="bg-gold text-navy text-center py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors">
                                            <ExternalLink size={14} /> Buy Softcopy
                                        </a>
                                        <a href={(book as any).amazonUrl || "https://www.amazon.com/dp/ASIN123"} target="_blank" rel="noopener noreferrer" className="bg-gold text-navy text-center py-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors">
                                            <ExternalLink size={14} /> Buy Hardcopy on Amazon
                                        </a>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="font-bold text-navy text-xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{book.title}</h3>
                                    <p className="text-gold font-bold">{book.price}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: Devotionals */}
            <section className="section-pad bg-white">
                <div className="container-xl">
                    <SectionTitle
                        overline="Daily Bread"
                        title="Devotionals"
                        subtitle="Spiritual nourishment for your daily walk. These resources are designed for quick yet deep impartation."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {devotionals.map((devo, i) => (
                            <motion.div key={devo._id} {...sectionFade} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-gray-100 border border-gray-100">
                                    <img src={devo.image || (ASSET_PATH + 'identity.jpg')} alt={devo.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                </div>
                                <h3 className="font-bold text-navy text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{devo.title}</h3>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-3">{devo.shortDescription || devo.desc}</p>
                                <Link to={`/read/${devo._id || devo.id}`} className="inline-flex items-center gap-2 text-navy font-bold text-sm hover:text-gold transition-colors">
                                    Read Now <ArrowRight size={16} />
                                </Link>
                            </motion.div>
                        ))}
                        {loading && <p className="text-center text-gray-400 py-10">Loading devotionals...</p>}
                        {!loading && devotionals.length === 0 && (
                            <div className="col-span-full text-center py-10 bg-gray-50 rounded-2xl">
                                <p className="text-gray-400">Our latest devotionals will be available here soon.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Section 4: Audio Library / Bible Study Guides */}
            <section className="section-pad bg-gray-50">
                <div className="container-xl">
                    <SectionTitle
                        overline="Periodicals & Teachings"
                        title="Audio Library / Bible Study Guides"
                        subtitle="Full-color digital magazines and audio study guides featuring articles, interviews, and testimonies from across the Wise Nation."
                    />
                    <div id="teachings" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* YouTube Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2rem] p-10 shadow-2xl border border-gray-50 flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 rounded-3xl bg-red-50 flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                <PlayCircle size={48} className="text-[#FF0000]" />
                            </div>
                            <h3 className="text-3xl font-bold text-navy mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>YouTube Channel</h3>
                            <p className="text-gray-500 mb-10 max-w-sm">Watch hundreds of hours of powerful video teachings, live seminars, and ministry highlights.</p>
                            <a 
                                href="https://www.youtube.com/@Hekimika001" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-full bg-[#FF0000] text-white py-5 rounded-2xl font-bold text-lg hover:bg-navy transition-colors flex items-center justify-center gap-3 shadow-lg"
                            >
                                <PlayCircle size={24} /> Watch on YouTube
                            </a>
                        </motion.div>

                        {/* Telegram Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-navy rounded-[2rem] p-10 shadow-2xl flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 rounded-3xl bg-white/10 flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                                <Users size={48} className="text-[#0088cc]" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Telegram Channel</h3>
                            <p className="text-white/60 mb-10 max-w-sm">Receive fresh devotionals, audio teachings, and direct ministry updates straight to your phone.</p>
                            <a 
                                href="https://t.me/+YLkY8tmLLjw0MWNk" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-full bg-[#0088cc] text-white py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-navy transition-all flex items-center justify-center gap-3 shadow-lg"
                            >
                                <Users size={24} /> Join Telegram Channel
                            </a>
                        </motion.div>
                    </div>

                    {/* Optional: Latest Highlight */}
                    <div className="mt-20 p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden relative">
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="bg-gold/10 text-gold text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block">Deep Dive</span>
                                <h4 className="text-4xl font-bold text-navy mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>The Generation of the Wise</h4>
                                <p className="text-gray-500 leading-relaxed mb-8">Dive into our most impactful series on building a life of significance. Our video library is cataloged by topic to help you find exactly what you need for your current season.</p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 text-sm font-bold text-navy">
                                        <div className="w-2 h-2 rounded-full bg-gold" /> 500+ Videos
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-bold text-navy">
                                        <div className="w-2 h-2 rounded-full bg-gold" /> Weekly Livestreams
                                    </div>
                                </div>
                            </div>
                            <div className="aspect-video bg-navy rounded-[1.5rem] overflow-hidden shadow-2xl relative cursor-pointer group" onClick={() => window.open('https://www.youtube.com/@Hekimika001', '_blank')}>
                                <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-all" />
                                <div className="absolute inset-0 flex items-center justify-center text-white">
                                    <PlayCircle size={64} className="opacity-80 group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                                    <p className="text-white text-xs font-bold uppercase tracking-widest mb-1">Latest Series</p>
                                    <p className="text-white/80 text-sm">Join us every Sunday for fresh wisdom sessions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Tagline */}
            <div className="py-12 text-center bg-white">
                <p className="text-gold font-bold tracking-[0.2em] text-sm">SIGNIFICANCE | RELEVANCE | DOMINION</p>
            </div>
        </>
    );
}

