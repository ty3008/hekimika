import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight, BookOpen } from 'lucide-react';
import api from '../utils/api';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string;
    author: string;
    category: string;
    read_time: number;
    published_at: string;
}
interface Category {
    id: number;
    name: string;
    slug: string;
}

const FALLBACK_IMG = '/assets/home-carousel/carousel 1.webp';

export default function Blog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/blog/categories/all').then(r => setCategories(r.data)).catch(() => {});
    }, []);

    useEffect(() => {
        setLoading(true);
        const params = activeCategory !== 'all' ? `?category=${encodeURIComponent(activeCategory)}` : '';
        api.get(`/blog${params}`)
            .then(r => setPosts(r.data))
            .catch(() => setPosts([]))
            .finally(() => setLoading(false));
    }, [activeCategory]);

    const featured = posts[0] ?? null;
    const rest = posts.slice(1);

    return (
        <>
            <Helmet>
                <title>Blog | Hekimika – Wisdom in Writing</title>
                <meta name="description" content="Insights, stories, and teachings from the Wise Nation — written wisdom on love, grace, prayer, marriage, and more." />
            </Helmet>

            {/* ── Hero Header ─────────────────────────────────────────── */}
            <section className="pt-36 pb-16 px-4 md:px-8 lg:px-16 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #003366 100%)' }}>
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
                    style={{ background: 'var(--gold)', transform: 'translate(30%,-30%)' }} />
                <div className="container-xl text-center relative z-10">
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>
                        Wisdom in Writing
                    </motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Our Blog
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white/70 max-w-xl mx-auto text-lg">
                        Dive deeper into godly wisdom through articles written by our leadership and community.
                    </motion.p>
                    <div className="w-16 h-1 mx-auto mt-8 rounded-full" style={{ background: 'var(--gold)' }} />
                </div>
            </section>

            {/* ── Category Filter Tabs ─────────────────────────────────── */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
                <div className="container-xl px-4 md:px-8 lg:px-16">
                    <div className="flex gap-1 py-3 overflow-x-auto scrollbar-hide">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                                activeCategory === 'all'
                                    ? 'text-white'
                                    : 'text-gray-500 hover:text-navy bg-gray-100 hover:bg-gray-200'
                            }`}
                            style={activeCategory === 'all' ? { background: 'var(--navy)' } : {}}>
                            All Posts
                        </button>
                        {categories.map(cat => (
                            <button key={cat.id}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                                    activeCategory === cat.name
                                        ? 'text-white'
                                        : 'text-gray-500 hover:text-navy bg-gray-100 hover:bg-gray-200'
                                }`}
                                style={activeCategory === cat.name ? { background: 'var(--navy)' } : {}}>
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Content Area ─────────────────────────────────────────── */}
            <section className="section-pad bg-gray-50 min-h-screen">
                <div className="container-xl">
                    {loading ? (
                        <div className="flex justify-center py-24">
                            <div className="w-10 h-10 border-4 border-gray-200 border-t-gold rounded-full animate-spin" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-24">
                            <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
                            <h3 className="text-xl font-bold text-navy mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                No posts in this category yet
                            </h3>
                            <p className="text-gray-400 text-sm">Check back soon — wisdom is on the way!</p>
                            {activeCategory !== 'all' && (
                                <button onClick={() => setActiveCategory('all')}
                                    className="mt-6 px-5 py-2.5 text-sm font-semibold rounded-lg border-2 transition-all hover:text-white"
                                    style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}
                                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--navy)')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                                    View All Posts
                                </button>
                            )}
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

                                {/* ── Featured Post ── */}
                                {featured && (
                                    <Link to={`/blog/${featured.slug}`} className="group block mb-12">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                                            <div className="relative aspect-square lg:aspect-auto lg:h-full overflow-hidden flex items-center justify-center bg-gray-50">
                                                <img
                                                    src={featured.cover_image || FALLBACK_IMG}
                                                    alt={featured.title}
                                                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-navy/30 to-transparent" />
                                                <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full shadow"
                                                    style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                                                    {featured.category}
                                                </span>
                                            </div>
                                            <div className="p-8 lg:p-10 flex flex-col justify-center">
                                                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>
                                                    Featured Post
                                                </p>
                                                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight group-hover:text-gold transition-colors"
                                                    style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>
                                                    {featured.title}
                                                </h2>
                                                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                                    {featured.excerpt}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
                                                    <span className="flex items-center gap-1"><User size={13} /> {featured.author}</span>
                                                    <span className="flex items-center gap-1"><Calendar size={13} /> {new Date(featured.published_at).toLocaleDateString('en-KE', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                                    <span className="flex items-center gap-1"><Clock size={13} /> {featured.read_time} min read</span>
                                                </div>
                                                <span className="inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all"
                                                    style={{ color: 'var(--navy)' }}>
                                                    Read Article <ArrowRight size={16} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                )}

                                {/* ── Rest of Posts Grid ── */}
                                {rest.length > 0 && (
                                    <>
                                        {featured && (
                                            <h2 className="text-lg font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>
                                                More Posts
                                            </h2>
                                        )}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {rest.map((post, i) => (
                                                <motion.article key={post.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.07 }}
                                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col group">
                                                    <Link to={`/blog/${post.slug}`} className="block aspect-square sm:h-48 overflow-hidden relative flex items-center justify-center bg-gray-50">
                                                        <img
                                                            src={post.cover_image || FALLBACK_IMG}
                                                            alt={post.title}
                                                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                                            loading="lazy"
                                                        />
                                                        <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full shadow"
                                                            style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                                                            {post.category}
                                                        </span>
                                                    </Link>
                                                    <div className="p-5 flex flex-col flex-grow">
                                                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                                                            <span className="flex items-center gap-1"><Calendar size={12} />{new Date(post.published_at).toLocaleDateString()}</span>
                                                            <span className="flex items-center gap-1"><Clock size={12} />{post.read_time} min</span>
                                                        </div>
                                                        <Link to={`/blog/${post.slug}`}>
                                                            <h3 className="text-base font-bold mb-2 line-clamp-2 group-hover:text-gold transition-colors"
                                                                style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>
                                                                {post.title}
                                                            </h3>
                                                        </Link>
                                                        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                                                            {post.excerpt}
                                                        </p>
                                                        <div className="mt-auto flex items-center justify-between">
                                                            <span className="text-xs text-gray-400 flex items-center gap-1"><User size={11} />{post.author}</span>
                                                            <Link to={`/blog/${post.slug}`}
                                                                className="text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
                                                                style={{ color: 'var(--navy)' }}>
                                                                Read <ArrowRight size={12} />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </motion.article>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </section>
        </>
    );
}
