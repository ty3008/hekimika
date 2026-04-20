import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, ArrowRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { useApi } from '../hooks/useApi';
import { Link } from 'react-router-dom';

// Book Assets
import ThePureManImg from '../assets/The pure man.jpg';
import WorkItOutImg from '../assets/work it out.jpg';
import ChoosingWellImg from '../assets/choosing well.jpg';
import DealingWithEndedImg from '../assets/dealing with ended relationships.jpg';
import PreparingForLoveImg from '../assets/preparing for love.png';
import KeepersImg from '../assets/Keepers.png';
import CoupledAndBuiltImg from '../assets/Coupled and Built.png';
import BuiltToLeadImg from '../assets/Built to Lead.png';

// Cultured In Love Assets
import SolidCoreImg from '../assets/establishing a solid core.jpg';
import SolidFormImg from '../assets/creating a solid form.jpg';
import PassionImg from '../assets/passion.jpg';

// Free Resources Assets
import IdentityImg from '../assets/Identity.png';
import Phos2Img from '../assets/the phos edition 2.jpg';
import Phos5Img from '../assets/the phos edition 5.jpg';
import Phos9Img from '../assets/the phos edition 9.png';
import Wisdom1Img from '../assets/wisdom edition 1 the undefiled.jpg';
import Wisdom2Img from '../assets/wisdom edition 2 - dear man dear woman.jpg';

// Assets mapping based on dist/assets structure
const ASSET_PATH = '/assets/';

const BOOKS = [
    {
        title: 'The Pure Man',
        author: 'Pastor Kevin Mulati',
        image: ThePureManImg,
        price: 'KES 1,500',
        selarUrl: 'https://selar.co/pure-man',
        desc: 'A comprehensive guide for men on holiness, identity, and strength.'
    },
    {
        title: 'Work it Out',
        author: 'Pastor Kevin Mulati',
        image: WorkItOutImg,
        price: 'KES 800',
        selarUrl: 'https://selar.co/work-it-out',
        desc: 'Practical wisdom for navigating the daily realities of love.'
    },
    {
        title: 'Choosing Well',
        author: 'Pastor Kevin Mulati',
        image: ChoosingWellImg,
        price: 'KES 1,500',
        selarUrl: 'https://selar.co/choosing-well',
        desc: 'Discerning the right partner for a God-centered covenant.'
    },
    {
        title: 'Dealing with Ended Relationships',
        author: 'Pastor Kevin Mulati',
        image: DealingWithEndedImg,
        price: 'KES 500',
        selarUrl: 'https://selar.co/healing-heartbreak',
        desc: 'Finding healing and wholeness after the pain of a breakup.'
    },
    {
        title: 'Preparing for Love',
        author: 'Pastor Kevin Mulati',
        image: PreparingForLoveImg,
        price: 'KES 1,500',
        selarUrl: 'https://selar.co/preparing-love',
        desc: 'Tools and insights to get ready for a lasting covenant.'
    },
    {
        title: 'Keepers of Love',
        author: 'Pastor Kevin Mulati',
        image: KeepersImg,
        price: 'KES 1,500',
        selarUrl: 'https://selar.co/keepers',
        desc: 'Understanding what it takes to sustain lifelong love.'
    },
    {
        title: 'Coupled and Built',
        author: 'Pastor Kevin Mulati',
        image: CoupledAndBuiltImg,
        price: 'KES 1,500',
        selarUrl: 'https://selar.co/coupled-built',
        desc: 'Foundation and architecture for a successful godly marriage.'
    },
    {
        title: 'Built to Lead',
        author: 'Pastor Kevin Mulati',
        image: BuiltToLeadImg,
        price: 'KES 1,500',
        selarUrl: 'https://selar.co/built-to-lead',
        desc: 'Leadership principles for the generation of the wise.'
    },
];

const CULTURED_IN_LOVE_BOOKS = [
    {
        title: 'Establishing a Solid Core',
        author: 'Pastor Kevin Mulati',
        image: SolidCoreImg,
        price: 'KES 2,000',
        selarUrl: 'https://selar.co/solid-core',
        desc: 'Building the non-negotiables of relationships and marriage.'
    },
    {
        title: 'Creating a Solid Form',
        author: 'Pastor Kevin Mulati',
        image: SolidFormImg,
        price: 'KES 2,000',
        selarUrl: 'https://selar.co/solid-form',
        desc: 'The foundational principles of the Cultured in Love series.'
    },
    {
        title: 'Passion',
        author: 'Pastor Kevin Mulati',
        image: PassionImg,
        price: 'KES 2,000',
        selarUrl: 'https://selar.co/passion',
        desc: 'Navigating passion, love, and intimacy the biblical way.'
    },
    {
        title: 'Conflict Resolution',
        author: 'Pastor Kevin Mulati',
        image: WorkItOutImg,
        price: 'KES 2,000',
        selarUrl: 'https://selar.co/conflict-resolution',
        desc: 'Resolving disputes gracefully in your marriage or relationship.'
    },
    {
        title: 'Praying for a Solid Man',
        author: 'Pastor Kevin Mulati',
        image: PreparingForLoveImg,
        price: 'KES 2,000',
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

const STATIC_MAGAZINES = [
    { id: 'm1', title: 'Wisdom Edition 1: The Undefiled', desc: 'Living a life of purity and power.', image: Wisdom1Img },
    { id: 'm2', title: 'Wisdom Edition 2: Dear Man, Dear Woman', desc: 'Heart-to-heart wisdom for relationships.', image: Wisdom2Img },
];

export default function Resources() {
    const { data: freeResources, loading } = useApi<any[]>('/free-resources');

    const devotionalsApi = freeResources?.filter(r => r.type === 'Devotional') || [];
    const magazinesApi = freeResources?.filter(r => r.type === 'Magazine') || [];

    // Combine static and API for full list as requested
    const devotionals = devotionalsApi.length > 0 ? devotionalsApi : STATIC_DEVOTIONALS;
    const magazines = magazinesApi.length > 0 ? magazinesApi : STATIC_MAGAZINES;

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {BOOKS.map((book, i) => (
                            <motion.div key={i} {...sectionFade} transition={{ delay: i * 0.1 }} className="group">
                                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-lg border border-gray-100 relative">
                                    <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                                        <p className="text-white text-sm line-clamp-4">{book.desc}</p>
                                    </div>
                                    <div className="absolute top-3 right-3 bg-gold text-navy text-[10px] font-bold px-2 py-1 rounded">
                                        BOOK
                                    </div>
                                </div>
                                <h3 className="font-bold text-navy text-lg mb-1 leading-tight group-hover:text-gold transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>{book.title}</h3>
                                <p className="text-gray-400 text-xs mb-3">{book.author}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="font-bold text-navy" style={{ color: 'var(--navy)' }}>{book.price}</span>
                                    <a href={book.selarUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-gold hover:underline">
                                        Buy Softcopy <ExternalLink size={12} />
                                    </a>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        {CULTURED_IN_LOVE_BOOKS.map((book, i) => (
                            <motion.div key={i} {...sectionFade} transition={{ delay: i * 0.1 }} className="flex flex-col">
                                <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 shadow-2xl border-4 border-white group relative">
                                    <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent flex flex-col justify-end p-6">
                                        <p className="text-white/80 text-xs italic mb-2 line-clamp-2">{book.desc}</p>
                                        <a href={book.selarUrl} target="_blank" rel="noopener noreferrer" className="bg-gold text-navy text-center py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors">
                                            <ExternalLink size={14} /> Buy Softcopy
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

            {/* Section 4: Magazines */}
            <section className="section-pad bg-gray-50">
                <div className="container-xl">
                    <SectionTitle
                        overline="Periodicals"
                        title="Magazines"
                        subtitle="Full-color digital magazines featuring articles, interviews, and testimonies from across the Wise Nation."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {magazines.map((mag, i) => (
                            <motion.div key={mag._id} {...sectionFade} transition={{ delay: i * 0.1 }} className="bg-navy rounded-3xl overflow-hidden flex flex-col md:flex-row h-full">
                                <div className="md:w-1/3 bg-gray-200">
                                    <img src={mag.image || (ASSET_PATH + 'wisdom edition 1 the undefiled.jpg')} alt={mag.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="md:w-2/3 p-8 flex flex-col justify-center">
                                    <p className="text-gold text-[10px] font-bold uppercase tracking-widest mb-2">Magazine Issue</p>
                                    <h3 className="text-white text-2xl font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>{mag.title}</h3>
                                    <p className="text-white/60 text-sm mb-6 leading-relaxed">{mag.shortDescription || mag.desc}</p>
                                    <Link to={`/read/${mag._id || mag.id}`} className="btn-primary inline-flex items-center justify-center gap-2 py-3 px-6 text-sm">
                                        Open Magazine <BookOpen size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                        {loading && <p className="text-center text-gray-400 py-10">Loading magazines...</p>}
                        {!loading && magazines.length === 0 && (
                            <div className="col-span-full text-center py-12 border-2 border-dashed border-gray-200 rounded-3xl">
                                <p className="text-gray-400 italic">No magazine issues found in the archive yet.</p>
                            </div>
                        )}
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

